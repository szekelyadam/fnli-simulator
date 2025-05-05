import type { WebSocket } from "ws";

export interface SessionWebSocket extends WebSocket {
    sessionId: string;
}
