import { HIGHEST_MATCH_COUNT, LOWEST_MATCH_COUNT } from "../consts";
import { MatchStat } from "../types";
import { memo } from "react";

interface MatchStatsContainerProps {
    matchStats: MatchStat;
}

const MatchStatsContainer = memo(({ matchStats }: MatchStatsContainerProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-0 gap-y-0 w-full max-w-[508px] rounded-lg border border-secondary shadow-[1px_1px_6px_0px_#00000026] divide-y divide-x divide-secondary md:divide-y-0">
            {Object.entries(matchStats).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center p-3">
                    <div className="text-sm font-bold">{key} matches</div>
                    <div className="font-extrabold">{value}</div>
                </div>
            ))}
        </div>
    );
});

export default MatchStatsContainer;
