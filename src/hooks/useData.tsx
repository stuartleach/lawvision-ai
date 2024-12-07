import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  County,
  GeoJSONData,
  Judge,
  NewYorkState,
  SortTarget,
} from "@/types/frontendTypes";
import {
  getCounties,
  getGeoJson,
  getJudgeImportances,
  getJudges,
  getNewYorkState,
} from "./api.ts";

type DataContextType = {
  loading: boolean;
  allCounties: County[];
  allJudges: Judge[];
  geoJson: GeoJSONData | null;
  newYorkState: NewYorkState | null;
  currentPage: PageOption;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageOption>>;
  selectedEntity: Judge | County | null;
  setSelectedEntity: React.Dispatch<
    React.SetStateAction<Judge | County | null>
  >;
  deviation: boolean;
  setDeviation: React.Dispatch<React.SetStateAction<boolean>>;
  filterRace: string;
  setFilterRace: React.Dispatch<React.SetStateAction<string>>;
  filterSeverity: string;
  setFilterSeverity: React.Dispatch<React.SetStateAction<string>>;
  sortTarget: SortTarget | null;
  setSortTarget: React.Dispatch<React.SetStateAction<SortTarget | null>>;
  countyNameFilter: string | null;
  setCountyNameFilter: React.Dispatch<React.SetStateAction<string | null>>;
  judgeNameFilter: string;
  setJudgeNameFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedCounty: County | null;
  setSelectedCounty: React.Dispatch<React.SetStateAction<County | null>>;
  selectedJudge: Judge | null;
  setSelectedJudge: React.Dispatch<React.SetStateAction<Judge | null>>;
  severityLabels: string[];
};

type DataProviderProps = {
  children: ReactNode;
};

type PageOption = "home" | "about";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageOption>("home");
  const [loading, setLoading] = useState<boolean>(true);
  const [allCounties, setAllCounties] = useState<County[]>([]);
  const [allJudges, setAllJudges] = useState<Judge[]>([]);
  const [geoJson, setGeoJson] = useState<GeoJSONData | null>(null);
  const [newYorkState, setNewYorkState] = useState<NewYorkState | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Judge | County | null>(
    null,
  );
  const [deviation, setDeviation] = useState<boolean>(false);
  const [filterRace, setFilterRace] = useState<string>("Any");
  const [filterSeverity, setFilterSeverity] = useState<string>("Any");
  const [sortTarget, setSortTarget] = useState<SortTarget | null>(null);
  const [countyNameFilter, setCountyNameFilter] = useState<string | null>(null);
  const [judgeNameFilter, setJudgeNameFilter] = useState<string>("");
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          newYorkGeoJson,
          fetchedCounties,
          fetchedJudges,
          fetchedNewYorkState,
        ] = await Promise.all([
          getGeoJson(),
          getCounties(),
          getJudges(),
          getNewYorkState(),
        ]);

        setGeoJson(newYorkGeoJson);
        setAllCounties(
          fetchedCounties.sort((a, b) => a.name.localeCompare(b.name)),
        );
        setNewYorkState(fetchedNewYorkState);
        setAllJudges(fetchedJudges); // Set judges without importances initially

        setLoading(false);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchJudgeImportances = async () => {
      if (selectedJudge) {
        try {
          const bailImportances = await getJudgeImportances(
            selectedJudge.name,
            "bail",
          );
          const remandImportances = await getJudgeImportances(
            selectedJudge.name,
            "remand",
          );

          setSelectedJudge((prevJudge) =>
            prevJudge
              ? {
                  ...prevJudge,
                  featureImportancesBailSet: bailImportances,
                  featureImportancesRemand: remandImportances,
                }
              : null,
          );
        } catch (error) {
          console.error("Error fetching judge importances:", error);
        }
      }
    };
    fetchJudgeImportances();
  }, [selectedJudge]); // Fetch importances whenever selectedJudge changes

  const contextValue: DataContextType = useMemo(
    () => ({
      loading,
      allCounties,
      allJudges,
      geoJson,
      newYorkState,
      currentPage,
      setCurrentPage,
      selectedEntity,
      setSelectedEntity,
      deviation,
      setDeviation,
      filterRace,
      setFilterRace,
      filterSeverity,
      setFilterSeverity,
      sortTarget,
      setSortTarget,
      countyNameFilter,
      setCountyNameFilter,
      judgeNameFilter,
      setJudgeNameFilter,
      selectedCounty,
      setSelectedCounty,
      selectedJudge,
      setSelectedJudge,
      severityLabels: [],
    }),
    [
      loading,
      allCounties,
      allJudges,
      geoJson,
      newYorkState,
      currentPage,
      setCurrentPage,
      selectedEntity,
      setSelectedEntity,
      deviation,
      setDeviation,
      filterRace,
      setFilterRace,
      filterSeverity,
      setFilterSeverity,
      sortTarget,
      setSortTarget,
      countyNameFilter,
      setCountyNameFilter,
      judgeNameFilter,
      setJudgeNameFilter,
      selectedCounty,
      setSelectedCounty,
      selectedJudge,
      setSelectedJudge,
    ],
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
