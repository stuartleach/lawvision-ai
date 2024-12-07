import React, { useState } from "react";
import Money from "../components/MoneyDisplay";
import Percent from "../components/PercentDisplay";
import { County, Judge, SeverityLevel } from "../types/frontendTypes";
import { formatNumber } from "../utils/format";

interface ChargesGridProps {
  entity: Judge | County | null;
}

const ChargesGrid: React.FC<ChargesGridProps> = ({ entity }) => {
  // Local state for graph target data
  const [graphTargetData, setGraphTargetData] = useState({
    metric: "",
    severity: "",
    race: "Any",
    val: "",
  });

  const severityLevels = ["Any", "Low", "Medium", "High"]; // Example severity levels
  const severityLabels: Record<string, string> = {
    Any: "Any",
    Low: "Low Severity",
    Medium: "Medium Severity",
    High: "High Severity",
  }; // Example severity labels

  const [selectedSeverity, setSelectedSeverity] =
    useState<SeverityLevel | null>(null);

  const handleRowClick = (severity: SeverityLevel) => {
    setSelectedSeverity((prev) => (prev === severity ? null : severity));
  };

  const handleGraphTargetClick = (
    metric: string,
    severity: SeverityLevel,
    val: string,
  ) => {
    setGraphTargetData({ metric, severity, race: "Any", val });
  };

  // Check if entity is null or undefined
  if (!entity) {
    return <div>No data available</div>;
  }

  // Check if entity has the expected structure
  if (!entity.arraignmentResults || !entity.arraignmentResults.Any) {
    return <div>Invalid data structure</div>;
  }

  return (
    <div className="mt-6 flex justify-center w-full">
      <table className="w-full bg-white p-20 py-20">
        <colgroup>
          <col />
          <col />
          <col className="hidden md:table-cell" />
          <col className="hidden md:table-cell" />
          <col className="hidden md:table-cell" />
          <col className="hidden md:table-cell" />
        </colgroup>
        <thead className="bg-zinc-900 text-sm text-zinc-400 sticky px-5">
          <tr className="text-zinc-400 tracking-tight text-base *:w-[18rem] px-5 *:px-10 *:font-semibold first:text-left *:md:table-cell *:cursor-pointer *:py-4">
            <th scope="col" className="text-left">
              Charge Severity
            </th>
            <th scope="col" className="text-right">
              Total Cases
            </th>
            <th scope="col" className="text-right">
              Average Bail
            </th>
            <th scope="col" className="text-right">
              Bail-Set %
            </th>
            <th scope="col" className="text-right">
              Remand %
            </th>
            <th scope="col" className="text-right">
              Release %
            </th>
          </tr>
        </thead>
        <tbody className="bg-zinc-950 text-sm">
          {severityLevels
            .filter((s) => entity.arraignmentResults[s].Any.totalCases > 0)
            .map((severity, i) => (
              <tr
                key={severity}
                className={`${
                  i % 2 === 0 && severity !== "Any" ? "bg-zinc-900" : ""
                } ${
                  selectedSeverity && severity !== selectedSeverity
                    ? "blur-xs opacity-[25%] filter transition-all"
                    : ""
                } ${
                  severity === selectedSeverity ? "z-[1000000]" : ""
                } cursor-pointer text-zinc-300 bg-zinc-950 text-right *:pr-10 *:py-4 first:rounded-t-20 ${
                  severity === "Any" ? "bg-zinc-900 border-b" : ""
                }`}
                onClick={() => handleRowClick(severity)}
              >
                <td className="text-left pl-8">{severityLabels[severity]}</td>
                <td className="font-mono totalCases-color">
                  {formatNumber(
                    entity.arraignmentResults[severity].Any.totalCases,
                  )}
                </td>
                <td
                  className={`font-mono averageBailAmount-color ${
                    graphTargetData.metric === "bailSet" &&
                    graphTargetData.severity === severity &&
                    graphTargetData.race === "Any" &&
                    graphTargetData.val === "amount"
                      ? "clicked"
                      : ""
                  }`}
                  onClick={() =>
                    handleGraphTargetClick("bailSet", severity, "amount")
                  }
                >
                  <Money
                    value={
                      entity.arraignmentResults[severity].Any.bailSet.amount
                    }
                  />
                </td>
                <td
                  className={`font-mono bailSet-color ${
                    graphTargetData.metric === "bailSet" &&
                    graphTargetData.severity === severity &&
                    graphTargetData.race === "Any" &&
                    graphTargetData.val === "percent"
                      ? "clicked"
                      : ""
                  }`}
                  onClick={() =>
                    handleGraphTargetClick("bailSet", severity, "percent")
                  }
                >
                  <Percent
                    value={
                      entity.arraignmentResults[severity].Any.bailSet.percent
                    }
                  />
                </td>
                <td
                  className={`font-mono remanded-color ${
                    graphTargetData.metric === "remanded" &&
                    graphTargetData.severity === severity &&
                    graphTargetData.race === "Any" &&
                    graphTargetData.val === "percent"
                      ? "clicked"
                      : ""
                  }`}
                  onClick={() =>
                    handleGraphTargetClick("remanded", severity, "percent")
                  }
                >
                  <Percent
                    value={
                      entity.arraignmentResults[severity].Any.remanded.percent
                    }
                  />
                </td>
                <td
                  className={`font-mono released-color ${
                    graphTargetData.metric === "released" &&
                    graphTargetData.severity === severity &&
                    graphTargetData.race === "Any" &&
                    graphTargetData.val === "percent"
                      ? "clicked"
                      : ""
                  }`}
                  onClick={() =>
                    handleGraphTargetClick("released", severity, "percent")
                  }
                >
                  <Percent
                    value={
                      entity.arraignmentResults[severity].Any.released.percent
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChargesGrid;
