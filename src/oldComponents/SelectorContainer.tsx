import React, { useMemo, useState } from "react";
import DropdownSelect from "./DropdownSelect";
import EntityLi from "./EntityLi";
import { useData } from "../hooks/useData";
import { County, Judge, SortOrder, SortTarget } from "../types/frontendTypes";
import { sortListByTargetGivenRaceAndSeverity } from "../utils/sort";

const SelectorContainer: React.FC = () => {
  const {
    allJudges,
    allCounties,
    countyNameFilter,
    deviation,
    filterRace,
    filterSeverity,
    sortTarget,
    setCountyNameFilter,
    setFilterSeverity,
    setFilterRace,
    setSortTarget,
    setDeviation,
    setSelectedJudge,
    setSelectedCounty,
  } = useData();

  // const [currentListTarget, setCurrentListTarget] = useState<
  //   "judges" | "counties"
  // >("judges");

  const currentListTarget = "judges";

  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.desc);

  const items = useMemo(() => {
    const countiesWithJudges = countyNameFilter
      ? allJudges.filter((c) => c.primaryCounty === countyNameFilter)
      : allJudges;
    return {
      judges: {
        name: "Judges",
        targets: countiesWithJudges,
      },
      counties: { name: "Counties", targets: allCounties },
    };
  }, [allJudges, allCounties, countyNameFilter]);

  const entityList = useMemo(
    () =>
      sortListByTargetGivenRaceAndSeverity(
        items[currentListTarget].targets,
        sortTarget ?? SortTarget.averageBailAmount,
        sortOrder,
        filterSeverity,
        filterRace,
        deviation,
      ),
    [
      items,
      currentListTarget,
      sortTarget,
      sortOrder,
      filterSeverity,
      filterRace,
      deviation,
    ],
  );

  const handleNextSort = () => {
    if (sortTarget === null) {
      setSortTarget(SortTarget.averageBailAmount);
      return;
    }
    switch (sortTarget) {
      case SortTarget.averageBailAmount:
        setSortTarget(SortTarget.bailSet);
        break;
      case SortTarget.bailSet:
        setSortTarget(SortTarget.remanded);
        break;
      case SortTarget.remanded:
        setSortTarget(SortTarget.released);
        break;
      default:
        setSortTarget(SortTarget.averageBailAmount);
    }
  };

  const handleNextSortDirection = () => {
    if (!sortTarget) return;
    const newOrder =
      sortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
    setSortOrder(newOrder);
  };

  const raceOptions = [
    "Any",
    "Black",
    "White",
    "Asian/Pacific Islander",
    "American Indian/Alaskan Native",
    "Other",
    "Unknown",
  ];

  const nextDeviation = () => {
    setDeviation(!deviation);
  };

  const clearAllFilters = () => {
    setCountyNameFilter("");
    setFilterSeverity("Any");
    setFilterRace("Any");
  };

  const sortTargetColor = (target: SortTarget) => {
    switch (target) {
      case SortTarget.bailSet:
        return "bailSet";
      case SortTarget.remanded:
        return "remanded";
      case SortTarget.released:
        return "released";
      case SortTarget.averageBailAmount:
        return "averageBailAmount";
      default:
        return "";
    }
  };

  const handleEntitySelect = (entity: Judge | County) => {
    if ("judgeId" in entity) {
      setSelectedJudge(entity);
    } else {
      setSelectedCounty(entity);
    }
  };

  return (
    <div>
      <section className="sticky top-0 z-[1000000]">
        <div className="top-0 z-[1000] bg-zinc-950 px-4 py-4 sm:px-6 lg:px-8 flex justify-between align-bottom w-full">
          <div>
            <h1 className="text-2xl text-left tracking-[-.04em] bg-gradient-to-tr from-blue-500 to-blue-200 bg-clip-text font-bold text-transparent">
              {currentListTarget === "judges" ? "Judges" : "Counties"}
            </h1>

            <section className="flex flex-col gap-1 text-right">
              <button onClick={handleNextSort}>
                <p className="text-zinc-500 text-sm">
                  sorted by
                  <span
                    className={`text-left text-sm tracking-[-.04em] bg-gradient-to-tr from-blue-500 to-blue-300 bg-clip-text font-bold text-transparent ${sortTarget !== null ? sortTargetColor(sortTarget) : "default-color"}-color`}
                  >
                    {sortTarget !== null ? sortTarget + " " : ""}
                  </span>
                </p>
              </button>
              <button onClick={handleNextSortDirection}>
                <p className="text-zinc-500 text-sm">
                  direction
                  <span
                    className={`text-left text-sm tracking-[-.04em] bg-gradient-to-tr from-blue-500 to-blue-300 bg-clip-text font-bold text-transparent ${sortTarget !== null ? sortTargetColor(sortTarget) : "default-color"}-color`}
                  >
                    {sortOrder === SortOrder.desc
                      ? "Lowest to highest"
                      : "Highest to lowest"}
                  </span>
                </p>
              </button>
            </section>
          </div>
          <button onClick={nextDeviation} className="text-white">
            {deviation ? "raw value" : "deviation from mean"}
          </button>
          <div className="filters flex flex-row gap-x-4 *:w-48">
            <DropdownSelect
              label="County"
              options={allCounties.map((c) => c.name)}
              type="county"
            />
            <DropdownSelect
              label="Severity"
              options={raceOptions}
              type="severity"
            />
            <DropdownSelect label="Race" options={raceOptions} type="race" />
          </div>
        </div>
      </section>

      <ul role="list" className="divide-y divide-zinc-800/30">
        {entityList.length > 0 ? (
          entityList.map((entity) => (
            <EntityLi
              key={Math.random()}
              entity={entity}
              targetItems={currentListTarget}
              onSelect={() => handleEntitySelect(entity)}
            />
          ))
        ) : (
          <li className="gap-x-4 py-5 cursor-pointer p-6 flex flex-row justify-start">
            <p className="flex text-zinc-500 font-light tracking-tight">
              No {currentListTarget} found matching selected criteria.
            </p>
            <button
              className="flex text-zinc-300 hover:text-zinc-100 transition"
              onClick={clearAllFilters}
            >
              Clear Filters
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SelectorContainer;
