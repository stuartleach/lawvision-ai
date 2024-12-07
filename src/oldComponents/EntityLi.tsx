import React from "react";
import { convertSortTargetToMetric, formatNumber } from "../utils/format";
import { useData } from "../hooks/useData";
import { numberOfJudgesInCounty, useSetStore } from "../utils/misc";
import { County, Judge, SortTarget } from "../types/frontendTypes";

interface EntityListItemProps {
  targetItems: "judges" | "counties";
  entity: Judge | County;
  onSelect?: () => void;
}

const EntityListItem: React.FC<EntityListItemProps> = ({
  targetItems,
  entity,
}) => {
  const {
    allJudges,
    deviation,
    filterRace,
    filterSeverity,
    selectedEntity,
    sortTarget,
  } = useData();

  // Calculate the target value based on the current sort target and deviation
  const calculateTargetValue = (): number => {
    let targetValue = 0;

    if (sortTarget) {
      const severityResults =
        entity.arraignmentResults[filterSeverity][filterRace];
      const anyResults = entity.arraignmentResults[filterSeverity].Any;

      switch (sortTarget) {
        case SortTarget.totalCases:
          targetValue = deviation
            ? severityResults.totalCases - anyResults.totalCases
            : severityResults.totalCases;
          break;
        case SortTarget.averageBailAmount:
          targetValue = deviation
            ? severityResults.bailSet.amount - anyResults.bailSet.amount
            : severityResults.bailSet.amount;
          break;
        case SortTarget.bailSet:
          targetValue = deviation
            ? severityResults.bailSet.percent - anyResults.bailSet.percent
            : severityResults.bailSet.percent;
          break;
        case SortTarget.remanded:
          targetValue = deviation
            ? severityResults.remanded.percent - anyResults.remanded.percent
            : severityResults.remanded.percent;
          break;
        case SortTarget.released:
          targetValue = deviation
            ? severityResults.released.percent - anyResults.released.percent
            : severityResults.released.percent;
          break;
        default:
          targetValue = 0;
      }
    }

    return targetValue;
  };

  const targetValue = calculateTargetValue();
  const setStore = useSetStore();

  return (
    <li
      className="flex justify-between gap-x-4 py-5 cursor-pointer p-6 hover:bg-zinc-600"
      onClick={() => setStore(targetItems, entity)}
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto flex-row justify-between">
          <p className="text-sm font-semibold leading-6 text-zinc-400">
            <span
              className={`inset-x-0 -top-px bottom-0 text-lg ${
                selectedEntity === entity ? "text-white" : ""
              }`}
            >
              {entity.name}
            </span>
          </p>
          {targetItems === "judges" ? (
            <p className="flex text-xs leading-5 text-gray-500">
              <a href="/" className="relative truncate hover:underline">
                {entity?.primaryCounty || ""}
              </a>
            </p>
          ) : (
            <p className="flex text-xs leading-5 text-gray-500">
              <a className="relative truncate hover:underline">
                {numberOfJudgesInCounty(entity, allJudges)} judges
              </a>
            </p>
          )}
        </div>
      </div>
      <div className="flex self-center float-right">
        <p
          className={`text-zinc-300 text-sm font-mono ${convertSortTargetToMetric(
            sortTarget,
          )}-color`}
        >
          {sortTarget === SortTarget.averageBailAmount ? "$" : ""}
          {formatNumber(targetValue)}
          {sortTarget !== SortTarget.averageBailAmount &&
          sortTarget !== SortTarget.totalCases
            ? " %"
            : ""}
        </p>

        <svg
          className="h-5 w-5 flex-none text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </li>
  );
};

export default EntityListItem;
