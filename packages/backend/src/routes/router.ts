import * as handlers from "../handlers/index";
import { SessionWebSocket } from "../types";

export function router(
    ws: SessionWebSocket,
    data: { type: string; numbers: number[] }
) {
    switch (data.type) {
        case "draw":
            handlers.draw(ws, data);
            break;
        default:
            ws.send(JSON.stringify({ error: "Unknown message type" }));
            break;
    }
}

export default router;
