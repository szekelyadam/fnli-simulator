import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import NumberContainer from "./components/NumberContainer";
import StatsContainer from "./components/StatsContainer";
import { MatchStat } from "./types";
import { DEFAULT_MATCH_STATS } from "./consts";

function App() {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
    const connection = useRef<WebSocket | null>(null);
    const [playedTickets, setPlayedTickets] = useState<number>(0);
    const [matchStats, setMatchStats] =
        useState<MatchStat>(DEFAULT_MATCH_STATS);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");

        socket.addEventListener("open", () => {
            console.log("Connected to server");
        });

        socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "result") {
                setDrawnNumbers(data.drawnNumbers);
                setPlayedTickets((playedTickets) => playedTickets + 1);
                if (data.matches in matchStats) {
                    setMatchStats((prevMatchStats) => {
                        const newMatchStats = { ...prevMatchStats };
                        newMatchStats[data.matches] =
                            newMatchStats[data.matches] + 1;

                        return newMatchStats;
                    });
                }
            }
        });

        connection.current = socket;

        return () => connection.current?.close();
    }, []);

    const handleNumberChange = useCallback((index: number, value: number) => {
        setNumbers((prevNumbers) => {
            const newNumbers = [...prevNumbers];
            newNumbers[index] = value;
            return newNumbers;
        });
    }, []);

    const handleDraw = useCallback(() => {
        connection.current?.send(
            JSON.stringify({
                type: "draw",
                numbers,
            })
        );
    }, [numbers]);

    const drawnNumberContainers = useMemo(
        () =>
            drawnNumbers.map((number, index) => (
                <NumberContainer key={index} value={number} />
            )),
        [drawnNumbers]
    );

    const userNumberContainers = useMemo(
        () =>
            Array.from({ length: 5 }).map((_, index) => (
                <NumberContainer
                    key={index}
                    value={numbers[index]}
                    onChange={(value) => handleNumberChange(index, value)}
                />
            )),
        [numbers, handleNumberChange]
    );

    return (
        <>
            <StatsContainer
                playedTickets={playedTickets}
                matchStats={matchStats}
            />
            <div>
                {drawnNumberContainers.length > 0 ? (
                    drawnNumberContainers
                ) : (
                    <div>No drawn numbers yet</div>
                )}
            </div>
            <div>{userNumberContainers}</div>
            <button onClick={handleDraw}>Draw</button>
        </>
    );
}

export default App;
