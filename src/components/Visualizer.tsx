import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { County, Judge, SeverityLevel } from "@/types/frontendTypes";

interface VisualizerProps {
  data: Judge | County;
  type: "judge" | "county";
}

const Visualizer: React.FC<VisualizerProps> = ({ data, type }) => {
  const barChartRef = useRef<SVGSVGElement | null>(null);
  const pieChartRef = useRef<SVGSVGElement | null>(null);
  const lineChartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data) {
      drawBarChart();
      drawPieChart();
      drawLineChart();
    }
  }, [data]);

  const drawBarChart = () => {
    const svg = d3.select(barChartRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const x = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);

    const g = svg.append("g");

    const severityLevels: SeverityLevel[] = [
      "Any",
      "AF",
      "BF",
      "CF",
      "DF",
      "EF",
      "I",
      "V",
      "AM",
      "BM",
      "UM",
    ];
    const bailSetData = severityLevels.map((severity) => ({
      severity,
      bailSetPercent: data.arraignmentResults[severity].Any.bailSet.percent,
    }));

    x.domain(severityLevels);
    y.domain([0, d3.max(bailSetData, (d) => d.bailSetPercent) || 0]);

    g.selectAll(".bar")
      .data(bailSetData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.severity) || 0)
      .attr("y", (d) => y(d.bailSetPercent))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.bailSetPercent))
      .attr("fill", "steelblue");

    g.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, "%"));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text("Severity Level");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Bail Set Percentage");
  };

  const drawPieChart = () => {
    const svg = d3.select(pieChartRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<any>().value((d: any) => d.value);

    const path = d3
      .arc<any>()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3
      .arc<d3.PieArcDatum<any>>()
      .outerRadius(radius)
      .innerRadius(radius - 80);

    const pieData = [
      {
        name: "Bail Set",
        value: data.arraignmentResults.Any.Any.bailSet.percent,
      },
      {
        name: "Remanded",
        value: data.arraignmentResults.Any.Any.remanded.percent,
      },
      {
        name: "Released",
        value: data.arraignmentResults.Any.Any.released.percent,
      },
    ];

    const arc = g
      .selectAll(".arc")
      .data(pie(pieData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.name));

    arc
      .append("text")
      .attr("transform", (d) => `translate(${label.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data.name);
  };

  const drawLineChart = () => {
    const svg = d3.select(lineChartRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const x = d3.scalePoint().range([margin.left, width - margin.right]);

    const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);

    const line = d3
      .line<{ severity: string; avgBail: number }>()
      .x((d) => x(d.severity) || 0)
      .y((d) => y(d.avgBail));

    const severityLevels: SeverityLevel[] = [
      "Any",
      "AF",
      "BF",
      "CF",
      "DF",
      "EF",
      "I",
      "V",
      "AM",
      "BM",
      "UM",
    ];
    const avgBailData = severityLevels.map((severity) => ({
      severity,
      avgBail: data.arraignmentResults[severity].Any.bailSet.amount,
    }));

    x.domain(severityLevels);
    y.domain([0, d3.max(avgBailData, (d) => d.avgBail) || 0]);

    svg
      .append("path")
      .datum(avgBailData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg
      .selectAll(".dot")
      .data(avgBailData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.severity) || 0)
      .attr("cy", (d) => y(d.avgBail))
      .attr("r", 3.5)
      .attr("fill", "steelblue");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text("Severity Level");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Average Bail Amount");
  };

  return (
    <div>
      <h2>{type === "judge" ? "Judge" : "County"} Visualizations</h2>
      <div>
        <h3>Bail Set Percentage by Severity</h3>
        <svg ref={barChartRef} width="400" height="300"></svg>
      </div>
      <div>
        <h3>Arraignment Outcomes</h3>
        <svg ref={pieChartRef} width="300" height="300"></svg>
      </div>
      <div>
        <h3>Average Bail Amount by Severity</h3>
        <svg ref={lineChartRef} width="400" height="300"></svg>
      </div>
    </div>
  );
};

export default Visualizer;
