import WebSocket from "ws";
import { countMatchingNumbers, drawNumbers } from "./utils";

const wss = new WebSocket.Server({ port: 8080 });

wss.on("error", (error) => {
    console.error(error);
});

wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    ws.on("message", (message: string) => {
        const data = JSON.parse(message) as { type: string; numbers: number[] };

        if (data.type === "draw") {
            const drawnNumbers = drawNumbers();

            const matches = countMatchingNumbers(data.numbers, drawnNumbers);

            ws.send(
                JSON.stringify({
                    type: "result",
                    drawnNumbers,
                    matches,
                })
            );
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
