import {County, GeoJSONData, Judge, NewYorkState} from '../types/frontendTypes.ts';
import {FeatureImportances} from "../types/frontendTypes";

// A generic function to fetch data from a given URL with the specified options
const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        method: 'GET',
        ...options
    });

    if (!response.ok) {
        throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }

    return response.json();
};

// Function to get GeoJSON data
const getGeoJson = async (): Promise<GeoJSONData> => {
    return fetchData<GeoJSONData>('/ny_counties_geojson.json');
};

// Function to get judges data
const getJudges = async (): Promise<Judge[]> => {
    const url = '/judges.json';
    let judges: Judge[] = await fetchData<Judge[]>(url);
    judges = judges.filter(
        (judge) =>
            judge.name !== 'Judge/JHO/Hearing Examiner, Visiting' &&
            judge.name !== "Office, Clerk's"
    );

    return judges;
};

const getJudgeImportances = async (judgeName: string, metric: string): Promise<FeatureImportances> => {
    const url = metric === 'remand' ? '/all_judges_remand.json' : '/all_judges_bail.json';
    let res = await fetchData<FeatureImportances[]>(url);
    let result = res.filter((row) => row.judge === judgeName);
    return result[0];
//
}

// Function to get counties data
const getCounties = async (): Promise<County[]> => {
    const url = '/counties.json';
    return await fetchData<County[]>(url);
};

// Function to get New York State data
const getNewYorkState = async (): Promise<NewYorkState> => {
    const url = '/state.json';
    return await fetchData<NewYorkState>(url);
};

export {getGeoJson, getCounties, getJudges, getNewYorkState, getJudgeImportances};
