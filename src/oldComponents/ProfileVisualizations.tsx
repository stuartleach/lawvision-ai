import React, { useEffect, useRef, useState } from "react";
import { severityLabels, useData } from "../hooks/useData.tsx";
import {
  ArraignmentResultsByRace,
  County,
  Judge,
} from "../types/frontendTypes";
import { metricVerbs } from "../utils/misc";

interface ProfileVisualizationsProps {
  entity: Judge | County;
}

const ProfileVisualizations: React.FC<ProfileVisualizationsProps> = ({
  entity,
}) => {
  const { graphTargetData, allCounties, newYorkState, selectedJudge } =
    useData();
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 640, height: 400 });

  const judge = selectedJudge;
  const county = allCounties.find((c) => c.name === judge?.primaryCounty);
  const state = newYorkState;

  const { metric, severity, race, val } = graphTargetData;

  const races = [
    "Any",
    "Black",
    "White",
    "Asian/Pacific Islander",
    "American Indian/Alaskan Native",
    "Other",
    "Unknown",
  ];

  const getAllRaceStatsForMetric = (
    stats: ArraignmentResultsByRace,
    metric: string,
    val: string,
  ) => {
    const raceStats: Record<string, number> = {};
    races.forEach((race) => {
      raceStats[race] = stats?.[race]?.[metric]?.[val] || 0;
    });
    return raceStats;
  };

  const judgeStats = getAllRaceStatsForMetric(
    judge?.arraignmentResults?.[severity],
    metric,
    val,
  );
  const countyStats = getAllRaceStatsForMetric(
    county?.arraignmentResults?.[severity],
    metric,
    val,
  );
  const stateStats = getAllRaceStatsForMetric(
    state?.arraignmentResults?.[severity],
    metric,
    val,
  );

  const plot = [
    {
      name: judge?.name,
      stats: judgeStats,
      rawStats: getAllRaceStatsForMetric(
        judge?.arraignmentResults?.[severity],
        metric,
        "raw",
      ),
      totalCases: judge?.arraignmentResults?.[severity]?.Any?.totalCases,
    },
    {
      name: county?.name,
      stats: countyStats,
      rawStats: getAllRaceStatsForMetric(
        county?.arraignmentResults?.[severity],
        metric,
        "raw",
      ),
      totalCases: county?.arraignmentResults?.[severity]?.Any?.totalCases,
    },
    {
      name: "New York State",
      stats: stateStats,
      rawStats: getAllRaceStatsForMetric(
        state?.arraignmentResults?.[severity],
        metric,
        "raw",
      ),
      totalCases: state?.arraignmentResults?.[severity]?.Any?.totalCases,
    },
  ];

  const metricLabels: Record<string, string> = {
    bailSet: "Bail Set",
    remanded: "Remanded",
    released: "Released",
    averageBailAmount: "Average Bail Amount",
    totalCases: "Total Cases",
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const updateDimensions = () => {
      const { width, height } = svgRef.current!.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // D3 visualization code here
    // This part would be quite long, so I'm omitting it for brevity
    // You would use d3.select(svgRef.current) to manipulate the SVG
  }, [dimensions, plot, metric, severity, race, val]);

  return (
    <div className="h-20 mb-32">
      <div className="w-[40rem] h-96">
        {metric === "bailSet" && val === "amount" ? (
          <div className="text-center tracking-tight justify-center text-zinc-400 text-xl mb-8">
            <b className="text-zinc-300">Average bail set</b> in{" "}
            <b className="text-zinc-300">
              {severity === "Any" ? "all" : severityLabels[severity]}
            </b>{" "}
            cases.
          </div>
        ) : (
          <div className="text-center tracking-tight justify-center text-zinc-400 text-xl mb-8">
            Percent of{" "}
            <b className="text-zinc-300">
              {severity === "Any" ? "all" : severityLabels[severity]}
            </b>{" "}
            cases where
            <b className="text-zinc-300">
              {race !== "Any" ? "defendant is " + race + " and " : ""}
            </b>
            <b className="text-zinc-300">{metricVerbs[metric].toLowerCase()}</b>
            .
          </div>
        )}
        <svg ref={svgRef} className="text-zinc-400">
          {/* D3 will populate this SVG */}
        </svg>
      </div>
    </div>
  );
};

export default ProfileVisualizations;
