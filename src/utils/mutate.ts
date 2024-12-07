import type {
  County,
  Judge,
  Race,
  SeverityLevel,
} from "../types/frontendTypes";

export const mutateDataForTreeMap = (rawData: string) => {
  console.log(rawData);
  return "";
};

export type BarGraphConfig = {
  metric: string;
  severity?: SeverityLevel;
  race?: Race;
  val?: string;
};

export type RawData = {
  counties: County[];
  judges: Judge[];
};

export interface BarGraphInput {
  config: BarGraphConfig;
  data: RawData;
}

// Type guard to check if the value has a percent property
function hasPercentProperty(value: any): value is { percent: number } {
  return value && typeof value.percent === "number";
}

export const mutateDataForZoomableBarGraph = ({
  config,
  data,
}: BarGraphInput) => {
  const counties = data.counties;
  const judges = data.judges;

  const res = {
    name: "Counties",
    children: counties.map((county) => ({
      name: county.name,
      children: judges
        .filter((judge) => judge.primaryCounty === county.name)
        .map((judge) => {
          const metricValue =
            judge.arraignmentResults[config.severity || "Any"][
            config.race || "Any"
            ][config.metric];
          return {
            name: judge.name,
            value: hasPercentProperty(metricValue) ? metricValue.percent : 0,
          };
        }),
    })),
  };

  console.log("Generated Data:", JSON.stringify(res, null, 2));
  return res;
};

export const mutateDataForPieChart = (rawData: string): string => {
  console.log(rawData);
  return "";
};
