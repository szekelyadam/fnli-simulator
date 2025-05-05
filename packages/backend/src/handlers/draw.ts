import { LOWEST_MATCH_COUNT } from "../consts";
import {
    countMatchingNumbers,
    drawNumbers,
    saveTicket,
} from "../services/ticketService";
import type { SessionWebSocket } from "../types";

export async function draw(ws: SessionWebSocket, data: { numbers: number[] }) {
    const drawnNumbers = drawNumbers();

    const matches = countMatchingNumbers(data.numbers, drawnNumbers);

    if (matches >= LOWEST_MATCH_COUNT) {
        const winningTicket = {
            playedNumbers: data.numbers,
            drawnNumbers,
            matchCount: matches,
            sessionId: ws.sessionId,
        };

        try {
            await saveTicket(winningTicket);
        } catch (error) {
            console.error("DB error: ", error);
        }
    }

    ws.send(
        JSON.stringify({
            type: "result",
            drawnNumbers,
            matches,
        })
    );
}
