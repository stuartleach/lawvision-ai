import React from "react";
import { useData } from "@/hooks/useData.tsx";
import { Race, SeverityLevel } from "@/types/frontendTypes.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { formatNumber } from "@/utils/format.ts";
import { TableControlsProps } from "@/components/JudgesTable.tsx";

export const TableControls: React.FC<TableControlsProps> = ({
  race,
  setRace,
  severity,
  setSeverity,
  county,
  setCounty,
  minCases,
  setMinCases,
  maxCases,
  compareToStateAverage,
  setCompareToStateAverage,
  compareToCountyAverage,
  setCompareToCountyAverage,
}) => {
  const { judgeNameFilter, setJudgeNameFilter } = useData();

  const { allCounties } = useData();
  const races: Race[] = [
    "Any",
    "White",
    "Black",
    "American Indian/Alaskan Native",
    "Asian/Pacific Islander",
    "Other",
    "Unknown",
  ];
  const severities: SeverityLevel[] = [
    "Any",
    "AF",
    "BF",
    "CF",
    "DF",
    "EF",
    "AM",
    "BM",
    "I",
    "V",
    "UM",
  ];
  const counties: string[] = ["Any", ...allCounties.map((c) => c.name)]; // Add actual county names

  return (
    <div className="space-y-4 mb-4">
      <div className="flex space-x-4 overflow-scroll">
        <div className="flex-1 min-w-64">
          <SelectGroup>
            <SelectLabel className="pl-1 text-zinc-400">Judge Name</SelectLabel>
          </SelectGroup>
          <input
            type="text"
            value={judgeNameFilter}
            onChange={(e) => setJudgeNameFilter(e.target.value)}
            placeholder="Search judges by name..."
            className="w-full p-2 border rounded bg-zinc-300"
          />
        </div>
        <SelectGroup className="flex-row flex-1 flex space-x-4">
          <div className="flex flex-col">
            <SelectLabel className="pl-1  text-zinc-400">Race</SelectLabel>
            <Select
              value={race}
              onValueChange={(value) => setRace(value as Race)}
            >
              <SelectTrigger className="w-[180px] bg-zinc-300">
                <SelectValue placeholder="Select Race" />
              </SelectTrigger>
              <SelectContent>
                {races.map((r) => (
                  <SelectItem className="bg-zinc-300" key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <SelectLabel className="pl-1 text-zinc-400">Severity</SelectLabel>
            <Select
              value={severity}
              onValueChange={(value) => setSeverity(value as SeverityLevel)}
            >
              <SelectTrigger className="w-[180px] bg-zinc-300">
                <SelectValue placeholder="Select Severity" />
              </SelectTrigger>
              <SelectContent>
                {severities.map((s) => (
                  <SelectItem className="bg-zinc-300" key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <SelectLabel className="pl-1 text-zinc-400">County</SelectLabel>
            <Select value={county} onValueChange={(value) => setCounty(value)}>
              <SelectTrigger className="w-[180px] bg-zinc-300">
                <SelectValue placeholder="Select County" />
              </SelectTrigger>
              <SelectContent>
                {counties.map((c) => (
                  <SelectItem className="bg-zinc-300" key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </SelectGroup>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Minimum Total Cases
        </label>
        <Slider
          min={0}
          max={maxCases}
          step={1}
          value={[minCases]}
          onValueChange={(value) => setMinCases(value[0])}
          className="mt-2 bg-zinc-500 rounded text-zinc-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-500">
            {formatNumber(minCases)}
          </span>
          <span className="text-sm text-gray-500">
            {formatNumber(maxCases)}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="compareToStateAverage"
          checked={compareToStateAverage}
          onChange={(e) => setCompareToStateAverage(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label
          htmlFor="compareToStateAverage"
          className="text-sm text-gray-300"
        >
          Compare to State Average
        </label>
        <input
          type="checkbox"
          id="compareToCountyAverage"
          checked={compareToCountyAverage}
          onChange={(e) => setCompareToCountyAverage(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label
          htmlFor="compareToCountyAverage"
          className="text-sm text-gray-300"
        >
          Compare to County Average
        </label>
      </div>
    </div>
  );
};
