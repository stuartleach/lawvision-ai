import {
  type ArraignmentResults,
  type County,
  type CountyWithGeoJSON,
  type GeoJSONData,
  type GeoJSONFeature,
  type Judge,
  type Race,
  type SeverityLevel,
} from "../types/frontendTypes";
import { useData } from "../hooks/useData.tsx";

// Type guard to check if the value has a percent property
function hasPercentProperty(
  value: any,
): value is { percent: number; raw: number } {
  return (
    value && typeof value.percent === "number" && typeof value.raw === "number"
  );
}

export const getValue = (
  judge: Judge,
  metric: keyof ArraignmentResults | "averageBailAmount",
  severity: SeverityLevel = "Any",
  race: Race = "Any",
  percent: boolean = true,
): number => {
  const results = judge.arraignmentResults?.[severity]?.[race];

  if (metric === "totalCases") {
    return results?.totalCases ?? 0;
  } else if (metric === "averageBailAmount") {
    return results?.bailSet?.amount ?? 0;
  } else {
    const data = results?.[metric];
    return percent
      ? hasPercentProperty(data)
        ? data.percent
        : 0
      : hasPercentProperty(data)
        ? data.raw
        : 0;
  }
};

export const numberOfJudgesInCounty = (
  county: County | Judge | null,
  judges: Judge[] | null,
) => {
  if (!county || !judges) return 0;
  if ("county_id" in county) {
    return judges.filter((judge) => judge.primaryCounty === county.county_id)
      .length;
  } else {
    return 0;
  }
};

export const metricVerbs: Record<string, string> = {
  bailSet: "bail was set",
  remanded: "remand was ordered",
  released: "release was ordered",
  averageBailAmount: "set bail",
  totalCases: "total cases",
};

export const metricClasses: Record<string, string> = {
  bailSet: "bailSet-color",
  remanded: "remanded-color",
  released: "released-color",
  averageBailAmount: "averageBailAmount-color",
  totalCases: "totalCases-color",
};

// This is now a custom hook
export const useSetStore = () => {
  const { setSelectedJudge, setSelectedCounty } = useData();

  return (store: "judges" | "counties", target: Judge | County) => {
    if (store === "judges") {
      setSelectedJudge(target as Judge);
    } else {
      setSelectedCounty(target as County);
    }
  };
};

export function combineCountiesWithGeoJSON(
  counties: County[],
  geoJsonData: GeoJSONData,
): CountyWithGeoJSON[] {
  return counties.map((county) => ({
    county,
    geoJsonFeature: geoJsonData.features.find(
      (feature) => feature.properties.name === county.name,
    ) as GeoJSONFeature, // Assert type for better type safety
  }));
}
