"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/hooks/useData";
import { FeatureImportances } from "@/types/frontendTypes";

type DecisionType = "bailAmount" | "released" | "remanded";
type SortKey = "judge" | "county" | "state";

const FeatureImportanceChart: React.FC = () => {
  const [decisionType, setDecisionType] = useState<DecisionType>("bailAmount");
  const [sortKey, setSortKey] = useState<SortKey>("judge");
  const { selectedJudge } = useData();

  // Function to transform featureImportances data for the chart
  const transformFeatureImportances = (
    featureImportances: FeatureImportances | undefined,
  ) => {
    if (!featureImportances) return [];

    return Object.entries(featureImportances)
      .filter(
        ([key, value]) =>
          key !== "judge" && key !== "case_count" && typeof value === "number",
      )
      .map(([key, value]) => ({ feature: key, [sortKey]: value }));
  };

  // Mock featureImportances data (replace with actual data based on selectedJudge, selectedCounty, newYorkState)
  const featureImportances: Record<DecisionType, any[]> = {
    // Replace 'any' with the actual type of the transformed data
    bailAmount: transformFeatureImportances(
      selectedJudge?.featureImportancesBailSet,
    ),
    released: [], // Replace with actual data
    remanded: [], // Replace with actual data
  };

  const sortData = (key: SortKey) => {
    setSortKey(key);
    // Add your actual sorting logic here based on the selected key
  };

  const CustomTooltip = ({ active, payload }: never) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-800 text-zinc-100 p-2 rounded shadow-lg">
          <p className="label">{`${payload[0].payload.feature} : ${(payload[0].value * 100).toFixed(2)}%`}</p>
          {/* Add more tooltips for other bars if needed */}
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="bg-zinc-900 text-zinc-300 border-zinc-800 flex flex-col justify-center *:justify-center">
      <CardHeader>
        <CardTitle>
          Comparative Feature Importance in Pretrial Decisions
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Relative importance of factors at Judge, County, and State levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={decisionType}
          onValueChange={(value) => setDecisionType(value as DecisionType)}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="bailAmount">Bail Amount</TabsTrigger>
            <TabsTrigger value="released">Released</TabsTrigger>
            <TabsTrigger value="remanded">Remanded</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mb-4 flex justify-center space-x-4">
          <Button
            onClick={() => sortData("judge")}
            variant={sortKey === "judge" ? "default" : "outline"}
          >
            Sort by Judge
          </Button>
          <Button
            onClick={() => sortData("county")}
            variant={sortKey === "county" ? "default" : "outline"}
          >
            Sort by County
          </Button>
          <Button
            onClick={() => sortData("state")}
            variant={sortKey === "state" ? "default" : "outline"}
          >
            Sort by State
          </Button>
        </div>
        <div style={{ width: "100%", height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={featureImportances[decisionType]}
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <XAxis
                type="number"
                domain={[0, "dataMax"]}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              />
              <YAxis dataKey="feature" type="category" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="judge" fill="#60A5FA" name="Judge" />
              <Bar dataKey="county" fill="#34D399" name="County" />
              <Bar dataKey="state" fill="#F472B6" name="State" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureImportanceChart;
