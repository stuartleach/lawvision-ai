import React from "react";
import {useData} from "../hooks/useData.tsx";
import {ResultsBySeverity} from "../types/frontendTypes";
import {getValue} from "../utils/misc";
import EntityStatItem from "./EntityStatItem";

interface EntityStatsGridProps {
    severity: keyof ResultsBySeverity;
}

const EntityStatsGrid: React.FC<EntityStatsGridProps> = ({severity}) => {
    //@ts-ignore
    const {selectedJudge, severityLabels} = useData();

    const label = severityLabels[severity] || "All Charges";

    if (!selectedJudge) return null;

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center">
                <div className="bg-zinc-900">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid w-full">
                            <div
                                className="flex flex-row justify-between mx-2 text-zinc-200 bg-zinc-950/50 rounded-t-3xl text-left px-10 py-2 pt-6 w-full text-2xl mt-6 mb-0.5 tracking-tighter">
                                <h3 className="flex">{label}</h3>
                            </div>
                            <div
                                className="grid grid-cols-2 w-full rounded-md gap-x-0.5 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-5">
                                <EntityStatItem
                                    //@ts-ignore
                                    severity={severity}
                                    metric="averageBailAmount"
                                    // @ts-ignore
                                    value={getValue(selectedJudge, "averageBailAmount", severity)}
                                />
                                <EntityStatItem
                                    //@ts-ignore
                                    severity={severity}
                                    metric="bailSet"
                                    // @ts-ignore
                                    value={getValue(selectedJudge, "bailSet", severity)}
                                />
                                <EntityStatItem
                                    //@ts-ignore
                                    severity={severity}
                                    metric="remanded"
                                    // @ts-ignore
                                    value={getValue(selectedJudge, "remanded", severity)}
                                />
                                <EntityStatItem
                                    //@ts-ignore
                                    severity={severity}
                                    metric="released"
                                    // @ts-ignore
                                    value={getValue(selectedJudge, "released", severity)}
                                />
                                <EntityStatItem
                                    //@ts-ignore
                                    severity={severity}
                                    metric="totalCases"
                                    // @ts-ignore
                                    value={getValue(selectedJudge, "totalCases", severity)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntityStatsGrid;
