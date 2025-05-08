import OverallStatsContainer from "./OverallStatsContainer";
import MatchStatsContainer from "./MatchStatsContainer";
import { MatchStat } from "../types";
interface StatsContainerProps {
    playedTickets: number;
    matchStats: MatchStat;
}

const StatsContainer = ({ playedTickets, matchStats }: StatsContainerProps) => {
    return (
        <>
            <OverallStatsContainer playedTickets={playedTickets} />
            <MatchStatsContainer matchStats={matchStats} />
        </>
    );
};

export default StatsContainer;
