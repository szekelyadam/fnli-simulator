import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import router from "./routes/router";
import type { SessionWebSocket } from "./types";

const wss = new WebSocket.Server({ port: 8080 });

wss.on("error", (error) => {
    console.error(error);
});

wss.on("connection", (ws: SessionWebSocket) => {
    ws.sessionId = uuidv4();

    console.log(`Client connected (session: ${ws.sessionId})`);

    ws.on("message", (message: string) => {
        const data = JSON.parse(message) as { type: string; numbers: number[] };

        router(ws, data);
    });

    ws.on("close", () => {
        console.log(`Client disconnected (session: ${ws.sessionId})`);
    });
});
