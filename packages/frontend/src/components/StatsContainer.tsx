import OverallStatsContainer from "./OverallStatsContainer";
import MatchStatsContainer from "./MatchStatsContainer";
import { MatchStat } from "../types";
interface StatsContainerProps {
    playedTickets: number;
    matchStats: MatchStat;
}

const StatsContainer = ({ playedTickets, matchStats }: StatsContainerProps) => {
    return (
        <div>
            <OverallStatsContainer playedTickets={playedTickets} />
            <MatchStatsContainer matchStats={matchStats} />
        </div>
    );
};

export default StatsContainer;
