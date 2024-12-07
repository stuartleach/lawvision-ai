"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArraignmentResults,
  County,
  Judge,
  NewYorkState,
  Race,
  SeverityLevel,
} from "@/types/frontendTypes.ts";
import { formatNumber } from "@/utils/format";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

type ChartDataPoint = {
  entity: "Judge" | "County" | "State";
  White: number;
  Black: number;
  "American Indian/Alaskan Native": number;
  "Asian/Pacific Islander": number;
  Other: number;
  Unknown: number;
};

type Props = {
  judge: Judge;
  county: County;
  state: NewYorkState;
};
("use client");

interface JudgeComparisonChartProps {
  judge: Judge;
  county: County;
  state: NewYorkState;
}

const JudgeComparisonChart: React.FC<JudgeComparisonChartProps> = ({
  judge,
  county,
  state,
}) => {
  const [severity, setSeverity] = useState<SeverityLevel>("Any");
  const [race, setRace] = useState<Race>("Any");

  const metrics = [
    { name: "% Bail Set", key: "bailSet" },
    { name: "% Released", key: "released" },
    { name: "% Jailed", key: "remanded" },
  ];

  function hasPercentProperty(value: any): value is { percent: number } {
    return (
      value &&
      typeof value === "object" &&
      "percent" in value &&
      typeof value.percent === "number"
    );
  }

  const chartData = metrics.map((metric) => {
    const judgeValue = judge.arraignmentResults[severity][race][metric.key];
    const countyValue = county.arraignmentResults[severity][race][metric.key];
    const stateValue = state.arraignmentResults[severity][race][metric.key];

    return {
      metric: metric.name,
      Judge: hasPercentProperty(judgeValue) ? judgeValue.percent : 0,
      County: hasPercentProperty(countyValue) ? countyValue.percent : 0,
      State: hasPercentProperty(stateValue) ? stateValue.percent : 0,
    };
  });

  const formatTick = (value: string) => {
    return value.length > 10 ? `${value.substring(0, 10)}...` : value;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-800 p-2 border border-zinc-700 rounded shadow text-zinc-300">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} style={{ color: entry.color }}>
              {entry.name || "Unnamed"}: {entry.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-zinc-900 text-zinc-300 border-zinc-800">
      <CardHeader className="items-center pb-4">
        <CardTitle>Judge Comparison Chart</CardTitle>
        <CardDescription className="text-zinc-400">
          Comparing {judge.name} to {county.name} County and New York State
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-4">
          <Select
            onValueChange={(value) => setSeverity(value as SeverityLevel)}
            defaultValue={severity}
          >
            <SelectTrigger className="bg-zinc-800 text-zinc-300 border-zinc-700">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {Object.keys(judge.arraignmentResults).map((sev) => (
                <SelectItem className="text-zinc-300" key={sev} value={sev}>
                  {sev}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setRace(value as Race)}
            defaultValue={race}
          >
            <SelectTrigger className="bg-zinc-800 text-zinc-300 border-zinc-700">
              <SelectValue placeholder="Select race" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {Object.keys(judge.arraignmentResults.Any).map((r) => (
                <SelectItem className="text-zinc-300" key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full aspect-square max-h-[400px]">
          <RadarChart
            outerRadius="80%"
            width={400}
            height={400}
            data={chartData}
          >
            <PolarGrid stroke="#4B5563" />
            <PolarAngleAxis
              dataKey="metric"
              tickFormatter={formatTick}
              stroke="#9CA3AF"
            />
            <Radar
              name="Judge"
              dataKey="Judge"
              stroke="#60A5FA"
              fill="#60A5FA"
              fillOpacity={0.2}
            />
            <Radar
              name="County"
              dataKey="County"
              stroke="#34D399"
              fill="#34D399"
              fillOpacity={0.2}
            />
            <Radar
              name="State"
              dataKey="State"
              stroke="#FBBF24"
              fill="#FBBF24"
              fillOpacity={0.2}
            />
            <Legend wrapperStyle={{ color: "#D1D5DB" }} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2 leading-none text-zinc-400">
          Pretrial decisions when the charge is of severity{" "}
          <span className="font-mono bg-zinc-800 p-1 rounded">{severity}</span>{" "}
          and the defendant's race is{" "}
          <span className="font-mono bg-zinc-800 p-1 rounded">
            {race.toLowerCase()}
          </span>
          .
        </div>
      </CardFooter>
    </Card>
  );
};

export default JudgeComparisonChart;

export function ShadBarChart({ judge, county, state }: Props) {
  const [metric, setMetric] = useState<
    "% Bail Set" | "Average Bail $" | "% Released" | "% Jailed"
  >("% Bail Set");
  const [severity, setSeverity] = useState<SeverityLevel>("Any");

  const getMetricValue = (results: ArraignmentResults) => {
    switch (metric) {
      case "% Bail Set":
        return parseFloat(formatNumber(results.bailSet.percent));
      case "Average Bail $":
        return parseFloat(formatNumber(results.bailSet.amount));
      case "% Released":
        return parseFloat(formatNumber(results.released.percent));
      case "% Jailed":
        return parseFloat(formatNumber(results.remanded.percent));
      default:
        return 0;
    }
  };

  const createDataPoint = (
    entity: "Judge" | "County" | "State",
    data: Record<Race, ArraignmentResults>,
  ): ChartDataPoint => ({
    entity,
    White: getMetricValue(data.White),
    Black: getMetricValue(data.Black),
    "American Indian/Alaskan Native": getMetricValue(
      data["American Indian/Alaskan Native"],
    ),
    "Asian/Pacific Islander": getMetricValue(data["Asian/Pacific Islander"]),
    Other: getMetricValue(data.Other),
    Unknown: getMetricValue(data.Unknown),
  });

  const chartData: ChartDataPoint[] = [
    createDataPoint("Judge", judge.arraignmentResults[severity]),
    createDataPoint("County", county.arraignmentResults[severity]),
    createDataPoint("State", state.arraignmentResults[severity]),
  ];

  const races: Race[] = [
    "White",
    "Black",
    "American Indian/Alaskan Native",
    "Asian/Pacific Islander",
    "Other",
    "Unknown",
  ];

  return (
    <Card className="text-zinc-300 border-0">
      <CardHeader>
        <CardTitle>Bail Decisions Comparison</CardTitle>
        <CardDescription>{judge.name} vs County vs State</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-4">
          <Select
            onValueChange={(value) => setMetric(value as never)}
            defaultValue={metric}
          >
            <SelectTrigger className="text-zinc-300">
              <SelectValue
                className="text-zinc-300"
                placeholder="Select metric"
              />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800">
              <SelectItem className="text-zinc-300" value="% Bail Set">
                Bail Set %
              </SelectItem>
              <SelectItem className="text-zinc-300" value="Average Bail $">
                Average Bail $
              </SelectItem>
              <SelectItem className="text-zinc-300" value="% Released">
                Released %
              </SelectItem>
              <SelectItem className="text-zinc-300" value="% Jailed">
                Jailed %
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setSeverity(value as SeverityLevel)}
            defaultValue={severity}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800">
              {Object.keys(judge.arraignmentResults).map((sev) => (
                <SelectItem className="text-zinc-300" key={sev} value={sev}>
                  {sev}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <BarChart
          className="text-red-200"
          width={600}
          height={400}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="entity" />
          <YAxis />
          <Tooltip />
          <Legend />
          {races.map((race, index) => (
            <Bar
              key={race}
              dataKey={race}
              fill={`hsl(${index * 10}, 50%, 50%)`}
              name={race}
            />
          ))}
        </BarChart>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trend: Judge's decisions compared to county and state averages
        </div>
        <div className="leading-none text-muted-foreground">
          Showing {metric} for {severity} cases across racial categories
        </div>
      </CardFooter>
    </Card>
  );
}
