import React, { useEffect, useState } from "react";
import { useData } from "../hooks/useData.tsx";
import { Judge, SortOrder, SortTarget } from "../types/frontendTypes";
import { sortListByTargetGivenRaceAndSeverity } from "../utils/sort";
import CountyDropdown from "./CountyDropdown";
import EntityLi from "./EntityLi";

const JudgeTable: React.FC = () => {
  const {
    allJudges,
    allCounties,
    sortTarget,
    sortOrder,
    setSortTarget,
    setSortOrder,
    selectedJudge,
    setSelectedJudge,
  } = useData();

  const [filteredJudges, setFilteredJudges] = useState<Judge[]>([]);
  const [countyFilter, setCountyFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    let judges = allJudges.filter(
      (judge) => judge.arraignmentResults.Any.Any.totalCases > 9,
    );
    if (countyFilter) {
      judges = judges.filter((judge) => judge.primaryCounty === countyFilter);
    }
    if (nameFilter) {
      judges = judges.filter((judge) =>
        judge.name.toLowerCase().includes(nameFilter.toLowerCase()),
      );
    }
    const sortedJudges = sortListByTargetGivenRaceAndSeverity(
      judges,
      sortTarget,
      sortOrder,
    );
    setFilteredJudges(sortedJudges);
  }, [allJudges, countyFilter, nameFilter, sortTarget, sortOrder]);
  const handleSortChange = (newSortTarget: SortTarget) => {
    if (sortTarget === newSortTarget) {
      setSortOrder(
        sortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc,
      );
    } else {
      setSortTarget(newSortTarget);
      setSortOrder(SortOrder.desc);
    }
  };

  return (
    <div className="judge-table">
      <CountyDropdown
        counties={allCounties}
        selectedCounty={countyFilter}
        onCountySelect={setCountyFilter}
      />
      <input
        type="text"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        placeholder="Search judges..."
      />
      <ul>
        {filteredJudges.map((judge) => (
          <EntityLi
            key={judge.judgeId}
            entity={judge}
            isSelected={selectedJudge?.judgeId === judge.judgeId}
            onClick={() => setSelectedJudge(judge)}
          />
        ))}
      </ul>
    </div>
  );
};

export default JudgeTable;
