import { TICKET_PRICE } from "../consts";

interface OverallStatsContainerProps {
    playedTickets: number;
}

const OverallStatsContainer = ({
    playedTickets,
}: OverallStatsContainerProps) => {
    return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full text-white bg-primary rounded-lg px-6 py-4 font-bold">
            <span>Number of tickets</span>
            <span className="font-bold">{playedTickets}</span>

            <span>Years spent</span>
            <span className="font-bold">{Math.floor(playedTickets / 52)}</span>

            <span>Cost of tickets</span>
            <span className="font-bold">{playedTickets * TICKET_PRICE} Ft</span>
        </div>
    );
};

export default OverallStatsContainer;
