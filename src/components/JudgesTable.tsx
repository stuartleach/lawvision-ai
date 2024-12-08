import React, { useEffect, useMemo, useState } from "react";
import {
  Judge,
  Race,
  ResultsBySeverity,
  SeverityLevel,
} from "@/types/frontendTypes.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table.tsx";
import { formatMoney, formatNumber, formatPercent } from "@/utils/format";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useData } from "@/hooks/useData.tsx";
import { TableControls } from "@/components/TableControls.tsx";

export type SortField =
  | "name"
  | "primaryCounty"
  | "totalCases"
  | "bailSetPercent"
  | "averageBail"
  | "releasedPercent"
  | "jailPercent";

export type TableControlsProps = {
  race: Race;
  setRace: (_race: Race) => void;
  severity: SeverityLevel;
  setSeverity: (_severity: SeverityLevel) => void;
  minCases: number;
  setMinCases: (_min: number) => void;
  maxCases: number;
  compareToStateAverage: boolean;
  setCompareToStateAverage: (_compare: boolean) => void;
  compareToCountyAverage: boolean;
  setCompareToCountyAverage: (_compare: boolean) => void;
  county: string | undefined;
  setCounty: (_county: string) => void;
};

const JudgesTable: React.FC = () => {
  const {
    allJudges,
    setSelectedJudge,
    judgeNameFilter,
    newYorkState,
    allCounties,
  } = useData();
  const [filteredJudges, setFilteredJudges] = useState<Judge[]>(allJudges);
  const [sortField, setSortField] = useState<SortField>("totalCases");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [race, setRace] = useState<Race>("Any");
  const [severity, setSeverity] = useState<SeverityLevel>("Any");
  const [minCases, setMinCases] = useState<number>(20);
  const [compareToCountyAverage, setCompareToCountyAverage] = useState(false);
  const [compareToStateAverage, setCompareToStateAverage] = useState(false);
  const [maxCases, setMaxCases] = useState<number>(0);
  const [county, setCounty] = useState<string>("Any");

  useEffect(() => {
    const max = Math.max(
      ...allJudges.map((judge) => judge.arraignmentResults.Any.Any.totalCases),
    );
    setMaxCases(max);
    setMinCases(0);
  }, [allJudges]);

  const getFieldValue = (
    arraignmentResults: ResultsBySeverity,
    field: SortField,
  ): number => {
    switch (field) {
      case "totalCases":
        return arraignmentResults[severity][race].totalCases;
      case "bailSetPercent":
        return arraignmentResults[severity][race].bailSet.percent;
      case "averageBail":
        return arraignmentResults[severity][race].bailSet.amount;
      case "releasedPercent":
        return arraignmentResults[severity][race].released.percent;
      case "jailPercent":
        return arraignmentResults[severity][race].remanded.percent;
      default:
        return 0;
    }
  };

  const getStateAverage = useMemo(
    () =>
      (field: SortField): number => {
        if (!newYorkState || !newYorkState.arraignmentResults) return 0;
        return getFieldValue(newYorkState.arraignmentResults, field);
      },
    [newYorkState, race, severity],
  );

  const getCountyAverage = useMemo(
    () =>
      (field: SortField, ju: Judge): number => {
        if (!allCounties) return 0;
        const county = allCounties.find((c) => c.name === ju.primaryCounty);
        if (!county) return 0;
        return getFieldValue(county.arraignmentResults, field);
      },
    [allCounties, race, severity],
  );

  useEffect(() => {
    let sorted = [...allJudges];
    if (judgeNameFilter) {
      sorted = sorted.filter((judge) =>
        judge.name.toLowerCase().includes(judgeNameFilter.toLowerCase()),
      );
    }

    // Filter by minimum total cases
    sorted = sorted.filter((judge) => {
      const totalCases = judge.arraignmentResults[severity][race].totalCases;
      return totalCases >= minCases;
    });

    // Filter by county

    if (county !== "Any") {
      sorted = sorted.filter((judge) => judge.primaryCounty === county);
    }

    sorted.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "primaryCounty":
          comparison = a.primaryCounty.localeCompare(b.primaryCounty);
          break;
        case "totalCases":
        case "bailSetPercent":
        case "averageBail":
        case "releasedPercent":
        case "jailPercent":
          comparison =
            getFieldValue(a.arraignmentResults, sortField) -
            getFieldValue(b.arraignmentResults, sortField);
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    setFilteredJudges(sorted);
  }, [
    allJudges,
    judgeNameFilter,
    sortField,
    sortDirection,
    race,
    severity,
    minCases,
    county,
  ]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="w-4 h-4 inline" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 inline" />
    );
  };

  const renderCellValue = (judge: Judge, field: SortField) => {
    const value = getFieldValue(judge.arraignmentResults, field);
    if (value === null) return "-";

    const stateAverage = getStateAverage(field);
    const countyAverage = getCountyAverage(field, judge);
    const stateDifference = value - stateAverage;
    const countyDifference = value - countyAverage;
    const statePercentDifference = (stateDifference / stateAverage) * 100;
    const countyPercentDifference = (countyDifference / countyAverage) * 100;

    let formattedValue;
    switch (field) {
      case "totalCases":
        formattedValue = formatNumber(value);
        break;
      case "averageBail":
        formattedValue = `$${formatMoney(value)}`;
        break;
      default:
        formattedValue = `${formatPercent(value)}%`;
    }

    if (compareToStateAverage) {
      const differenceColor =
        stateDifference > 0 ? "text-green-400" : "text-red-400";
      return (
        <span>
          {formattedValue}
          <span className={`ml-2 ${differenceColor}`}>
            ({statePercentDifference > 0 ? "+" : ""}
            {formatPercent(statePercentDifference)}%)
          </span>
        </span>
      );
    } else if (compareToCountyAverage) {
      const differenceColor =
        countyDifference > 0 ? "text-green-400" : "text-red-400";
      return (
        <span>
          {formattedValue}
          <span className={`ml-2 ${differenceColor}`}>
            ({countyPercentDifference > 0 ? "+" : ""}
            {formatPercent(countyPercentDifference)}%)
          </span>
        </span>
      );
    }

    return formattedValue;
  };

  return (
    <div className="tracking-tight">
      <TableControls
        race={race}
        setRace={setRace}
        severity={severity}
        setSeverity={setSeverity}
        minCases={minCases}
        setMinCases={setMinCases}
        maxCases={maxCases}
        county={county}
        setCounty={setCounty}
        compareToStateAverage={compareToStateAverage}
        setCompareToStateAverage={setCompareToStateAverage}
        compareToCountyAverage={compareToCountyAverage}
        setCompareToCountyAverage={setCompareToCountyAverage}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Name <SortIcon field="name" />
            </TableHeader>
            <TableHeader
              onClick={() => handleSort("primaryCounty")}
              className="cursor-pointer"
            >
              Primary County <SortIcon field="primaryCounty" />
            </TableHeader>
            <TableHeader
              onClick={() => handleSort("totalCases")}
              className="cursor-pointer"
            >
              Total Cases <SortIcon field="totalCases" />
            </TableHeader>
            <TableHeader
              onClick={() => handleSort("bailSetPercent")}
              className="cursor-pointer"
            >
              % Bail Set <SortIcon field="bailSetPercent" />
            </TableHeader>
            <TableHeader
              onClick={() => handleSort("averageBail")}
              className="cursor-pointer"
            >
              Average Bail $ <SortIcon field="averageBail" />
            </TableHeader>
            <TableHeader
              onClick={() => handleSort("releasedPercent")}
              className="cursor-pointer"
            >
              % Released <SortIcon field="releasedPercent" />
            </TableHeader>
            <TableHeader
              onClick={() => handleSort("jailPercent")}
              className="cursor-pointer"
            >
              % Jail <SortIcon field="jailPercent" />
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredJudges.map((judge: Judge) => (
            <TableRow
              onClick={() => {
                setSelectedJudge(judge);
                // window.scrollTo(0, 0);
                // smoothly scroll to top
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className={"hover:cursor-pointer hover:bg-zinc-800"}
              key={judge.judgeId}
            >
              <TableCell>{judge.name}</TableCell>
              <TableCell>{judge.primaryCounty}</TableCell>
              <TableCell
                className={`text-blue-400 font-mono ${sortField === "totalCases" ? "font-bold bg-zinc-950/50" : ""}`}
              >
                {renderCellValue(judge, "totalCases")}
              </TableCell>
              <TableCell
                className={`text-orange-400 font-mono ${sortField === "bailSetPercent" ? "font-bold bg-zinc-950/50" : ""}`}
              >
                {renderCellValue(judge, "bailSetPercent")}
              </TableCell>

              <TableCell
                className={`text-yellow-400 font-mono ${sortField === "averageBail" ? "font-bold bg-zinc-950/50" : ""}`}
              >
                {renderCellValue(judge, "averageBail")}
              </TableCell>
              <TableCell
                className={`text-green-400 font-mono ${sortField === "releasedPercent" ? "font-bold bg-zinc-950/50" : ""}`}
              >
                {renderCellValue(judge, "releasedPercent")}
              </TableCell>
              <TableCell
                className={`text-red-400 font-mono ${sortField === "jailPercent" ? "font-bold bg-zinc-950/50" : ""}`}
              >
                {renderCellValue(judge, "jailPercent")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { JudgesTable };
