import WebSocket from "ws";
import { countMatchingNumbers, drawNumbers } from "./utils";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { LOWEST_MATCH_COUNT } from "./consts";

const wss = new WebSocket.Server({ port: 8080 });

const prisma = new PrismaClient();

wss.on("error", (error) => {
    console.error(error);
});

wss.on("connection", async (ws: WebSocket) => {
    console.log("Client connected");

    const sessionId = uuidv4();

    ws.on("message", async (message: string) => {
        const data = JSON.parse(message) as { type: string; numbers: number[] };

        if (data.type === "draw") {
            const drawnNumbers = drawNumbers();

            const matches = countMatchingNumbers(data.numbers, drawnNumbers);

            if (matches >= LOWEST_MATCH_COUNT) {
                const winningTicket = {
                    playedNumbers: data.numbers,
                    drawnNumbers,
                    matchCount: matches,
                    sessionId: sessionId,
                };

                try {
                    await prisma.winningTicket.create({
                        data: winningTicket,
                    });
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
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
