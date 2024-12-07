import React, { useEffect } from "react";
import { useData } from "@/hooks/useData.tsx";
import JudgeComparisonChart, { ShadBarChart } from "@/components/BarChart.tsx";
import FeatureImportanceChart from "@/components/FeatureImportanceChart.tsx";

export const JudgeCard: React.FC = () => {
  const {
    selectedJudge,
    selectedCounty,
    setSelectedCounty,
    newYorkState,
    allCounties,
  } = useData();

  useEffect(() => {
    if (selectedJudge?.primaryCounty) {
      const countyObject = allCounties.find(
        (c) => c.name === selectedJudge.primaryCounty,
      );
      if (countyObject) {
        setSelectedCounty(countyObject);
      }
    }
  }, [selectedJudge, allCounties, setSelectedCounty]);

  if (!selectedJudge || !selectedCounty || !newYorkState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="z-10">
      <ShadBarChart
        judge={selectedJudge}
        county={selectedCounty}
        state={newYorkState}
      />
      <JudgeProfile />
    </div>
  );
};

const JudgeProfile: React.FC = () => {
  const { selectedJudge, allCounties, newYorkState } = useData();

  if (!selectedJudge || !newYorkState) return null;

  const judgeCounty = allCounties.find(
    (county) => county.name === selectedJudge.primaryCounty,
  );

  if (!judgeCounty) return null;

  return (
    <div className="tracking-tight text-xs flex flex-col text-center justify-center">
      <JudgeComparisonChart
        judge={selectedJudge}
        county={judgeCounty}
        state={newYorkState}
      />
      <FeatureImportanceChart />
    </div>
  );
};

export default JudgeProfile;
