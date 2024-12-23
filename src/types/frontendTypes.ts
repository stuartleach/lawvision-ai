export interface County {
  county_id: string;
  name: string;
  arraignmentResults: ResultsBySeverity;
}

export interface NewYorkState {
  name: string;
  arraignmentResults: ResultsBySeverity;
}

export interface Judge {
  judgeId: string;
  name: string;
  primaryCounty: string;
  arraignmentResults: ResultsBySeverity;
  featureImportancesBailSet?: FeatureImportances;
  featureImportancesRemand?: FeatureImportances;
}

export interface FeatureImportances {
  judge: string;
  case_count: number;
  race: number;
  gender: number;
  age_at_arrest: number;
  prior_vfo_cnt: number;
  rearrest: number;
  pend_vfo: number;
  prior_nonvfo_cnt: number;
  prior_misd_cnt: number;
  offense_month: number;
  offense_year: number;
  top_charge_weight_at_arraign: number;
  top_charge_at_arraign_violent_felony_ind: number;
  hate_crime_ind: number;
  top_charge_at_arraign: number;
  district: number;
}

export interface BailSet {
  raw: number;
  percent: number;
  amount: number; // average bail amount
}

export interface Remanded {
  raw: number;
  percent: number;
}

export interface Released {
  raw: number;
  percent: number;
}

export interface ArraignmentResults {
  [key: string]: BailSet | Remanded | Released | number;
  bailSet: BailSet;
  remanded: Remanded;
  released: Released;
  totalCases: number;
}

export type Race =
  | "Any"
  | "White"
  | "Black"
  | "American Indian/Alaskan Native"
  | "Asian/Pacific Islander"
  | "Other"
  | "Unknown"
  | string;

export type SeverityLevel =
  | "Any"
  | "AF"
  | "BF"
  | "CF"
  | "DF"
  | "EF"
  | "AM"
  | "BM"
  | "I"
  | "V"
  | "UM"
  | string;

export type ArraignmentResultsByRace = {
  [race in Race as string]: ArraignmentResults;
};

export type ResultsBySeverity = {
  [severity in SeverityLevel as string]: ArraignmentResultsByRace;
};

type Coordinates = number[][][][];

interface MultiPolygon {
  type: "MultiPolygon";
  coordinates: Coordinates;
}

interface FeatureProperties {
  geoid: string;
  name: string;
}

export interface GeoJSONFeature {
  geometry: MultiPolygon;
  type: "Feature";
  properties: FeatureProperties;
}

export type GeoJSONData = {
  type: string;
  features: GeoJSONFeature[];
};

export interface CountyWithGeoJSON {
  county: County;
  geoJsonFeature: GeoJSONFeature;
}

export interface MinMax {
  bailSet: [number, number];
  bailAmount: [number, number];
  remand: [number, number];
  ror: [number, number];
  nmr: [number, number];
  unknown: [number, number];
  release: [number, number];
}

export type FetchFunction = (
  input: RequestInfo,
  init?: RequestInit,
) => Promise<Response>;

export type JudgeQuery = {
  fetch: FetchFunction;
};

export type NewYorkStateQuery = {
  fetch: FetchFunction;
};

export type JudgeDetailsQuery = {
  fetch: FetchFunction;
  judgeId: string;
};

export type JudgeOutcomesQuery = {
  fetch: FetchFunction;
  judgeId: string;
};

export enum SortTarget {
  name = "Name",
  remanded = "Remand Percentage",
  released = "Release Percentage",
  bailSet = "Bail Set Frequency",
  averageBailAmount = "Average Bail",
  totalCases = "Total Cases",
}

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}

export type CountyQuery = {
  fetch: FetchFunction;
};

export type GeoJSONQuery = {
  fetch: FetchFunction;
};
