import { TICKET_PRICE } from "../consts";

interface OverallStatsContainerProps {
    playedTickets: number;
}

const OverallStatsContainer = ({
    playedTickets,
}: OverallStatsContainerProps) => {
    return (
        <div>
            Number of tickets: {playedTickets}
            Years spent: {Math.floor(playedTickets / 52)}
            Cost of tickets: {playedTickets * TICKET_PRICE} Ft
        </div>
    );
};

export default OverallStatsContainer;
