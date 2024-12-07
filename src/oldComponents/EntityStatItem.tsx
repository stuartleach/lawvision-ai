import React from "react";
// @ts-ignore
import Money from "../shared/Money";
// @ts-ignore
import Percent from "../shared/Percent";
import { formatNumber } from "../utils/format";
import { useData } from "../hooks/useData.tsx";
import {
  ArraignmentResults,
  Race,
  SeverityLevel,
} from "../types/frontendTypes";
import { getValue } from "../utils/misc";

interface EntityStatItemProps {
  metric: keyof ArraignmentResults | "averageBailAmount";
  severity: SeverityLevel;
  value?: number;
}

const EntityStatItem: React.FC<EntityStatItemProps> = ({
  metric,
  severity,
  value,
}) => {
  // @ts-ignore
  const { selectedJudge, severityLabels } = useData();
  // @ts-ignore
  const label = severityLabels[severity] || "All Charges";

  const races: Race[] = [
    "Any",
    "White",
    "Black",
    "American Indian/Alaskan Native",
    "Asian/Pacific Islander",
    "Other",
    "Unknown",
  ];
  const raceLabels: Record<Race, string> = {
    Any: "All",
    White: "White",
    Black: "Black",
    "American Indian/Alaskan Native": "American Indian",
    "Asian/Pacific Islander": "Asian",
    Other: "Other",
    Unknown: "Unknown",
  };

  const metricLabels: Record<
    keyof ArraignmentResults | "averageBailAmount",
    string
  > = {
    bailSet: "Bail Set",
    remanded: "Remanded",
    released: "Released",
    averageBailAmount: "Average Bail Amount",
    totalCases: "Total Cases",
  };

  return (
    <div className="mx-2 grid grid-rows-1 sm:rounded-none sm:first:rounded-bl-2xl last:rounded-br-2xl [&:nth-last-child(2)]:rounded-bl-2xl sm:[&:nth-last-child(2)]:rounded-none bg-zinc-950/50 w-full justify-center px-6 py-6 sm:px-6 lg:px-8">
      <div className="border-b border-dotted border-zinc-700 h-full w-full text-center text-white/50">
        <p className="text-sm font-medium leading-6">{metricLabels[metric]}</p>
        <p className="w-full rounded px-4 py-3">
          <span
            className={`text-4xl font-semibold tracking-tight -mx-4 px-4 ${metric}-color`}
          >
            {metric === "averageBailAmount" ? (
              <span className="averageBail-color">
                <Money value={value || 0} />
              </span>
            ) : metric === "totalCases" ? (
              <span className="totalCases-color">
                {formatNumber(value || 0)}
              </span>
            ) : (
              <span className={`${metric}-color`}>
                <Percent value={value || 0} />
              </span>
            )}
          </span>
        </p>
      </div>

      <div className="text-sm tracking-tight text-zinc-400 px-4">
        <div className="flex-col pt-2">
          <div className="text-right flex flex-col">
            {races.slice(1).map((race) => (
              <div
                key={race}
                className="flex flex-row justify-between w-48 px-2"
              >
                <span className="flex text-sm text-zinc-400 tracking-tighter">
                  {raceLabels[race]}
                </span>
                <div className="flex font-mono text-zinc-300">
                  {metric === "averageBailAmount" ? (
                    <span className={`${metric}-color`}>
                      <Money
                        value={
                          selectedJudge
                            ? getValue(selectedJudge, metric, severity, race)
                            : 0
                        }
                      />
                    </span>
                  ) : metric === "totalCases" ? (
                    <span className="text-blue-500">
                      {formatNumber(
                        selectedJudge
                          ? getValue(selectedJudge, metric, severity, race)
                          : 0,
                      )}
                    </span>
                  ) : (
                    <span className={`${metric}-color`}>
                      <Percent
                        value={
                          selectedJudge
                            ? getValue(selectedJudge, metric, severity, race)
                            : 0
                        }
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityStatItem;
