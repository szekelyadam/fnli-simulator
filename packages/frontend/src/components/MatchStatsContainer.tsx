import { MatchStat } from "../types";
import { memo } from "react";

interface MatchStatsContainerProps {
    matchStats: MatchStat;
}

const MatchStatsContainer = memo(({ matchStats }: MatchStatsContainerProps) => {
    return (
        <div>
            {Object.entries(matchStats).map(([key, value]) => (
                <div key={key}>
                    {key} matches: {value}
                </div>
            ))}
        </div>
    );
});

export default MatchStatsContainer;
