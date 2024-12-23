"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
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
        ([key, value]) => key !== "case_count" && typeof value === "number",
      )
      .map(([key, value]) => ({
        feature: key,
        judge: 0, // Default value or derive from your data
        county: 0, // Default value or derive from your data
        state: 0, // Default value or derive from your data
        [sortKey]: value,
      }));
  };

  const featureImportances: Record<
    DecisionType,
    Array<{ feature: string; judge: number; county: number; state: number }>
  > = {
    bailAmount: transformFeatureImportances(
      selectedJudge?.featureImportancesBailSet,
    ),
    released: [],
    remanded: [],
  };

  const sortData = (key: SortKey) => {
    setSortKey(key);
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
