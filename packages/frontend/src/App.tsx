import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NumberContainer from "./components/NumberContainer";
import StatsContainer from "./components/StatsContainer";
import { MatchStat } from "./types";
import { DEFAULT_MATCH_STATS, HIGHEST_MATCH_COUNT, YEAR_CAP } from "./consts";
import Checkbox from "./components/Checkbox";
import { getEmptyNumbers, getRandomNumbers } from "./helpers";
import Header from "./components/Header";
import ContainerTitle from "./components/ContainerTitle";
function App() {
    const connection = useRef<WebSocket | null>(null);

    const [numbers, setNumbers] = useState<number[]>(getEmptyNumbers());
    const [drawnNumbers, setDrawnNumbers] =
        useState<number[]>(getEmptyNumbers());
    const [playedTickets, setPlayedTickets] = useState<number>(0);
    const [matchStats, setMatchStats] =
        useState<MatchStat>(DEFAULT_MATCH_STATS);
    const [playWithRandomNumbers, setPlayWithRandomNumbers] =
        useState<boolean>(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationIntervalMs, setSimulationIntervalMs] = useState(500);
    const simulationRef = useRef<NodeJS.Timeout | null>(null);

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

    const handleNumberChange = (index: number, value: number) => {
        setNumbers((prevNumbers) => {
            const newNumbers = [...prevNumbers];
            newNumbers[index] = value;
            return newNumbers;
        });
    };

    const handleDraw = useCallback(() => {
        const numbersToSend = playWithRandomNumbers
            ? getRandomNumbers()
            : numbers;

        if (playWithRandomNumbers) {
            setNumbers(numbersToSend);
        }

        connection.current?.send(
            JSON.stringify({
                type: "draw",
                numbers: numbersToSend,
            })
        );
    }, [numbers, playWithRandomNumbers]);

    useEffect(() => {
        if (isSimulating) {
            simulationRef.current = setInterval(() => {
                handleDraw();
            }, simulationIntervalMs);
        } else if (simulationRef.current) {
            clearInterval(simulationRef.current);
            simulationRef.current = null;
        }

        return () => {
            if (simulationRef.current) {
                clearInterval(simulationRef.current);
            }
        };
    }, [isSimulating, simulationIntervalMs, handleDraw]);

    useEffect(() => {
        if (
            playedTickets / 52 >= YEAR_CAP ||
            matchStats[HIGHEST_MATCH_COUNT] === 1
        ) {
            setIsSimulating(false);
        }
    }, [playedTickets, matchStats]);

    const handlePlayWithRandomNumbersChange = useCallback(
        (checked: boolean) => {
            setNumbers(getEmptyNumbers());
            setPlayWithRandomNumbers(checked);
        },
        []
    );

    const handleSimulationToggle = useCallback(() => {
        setIsSimulating((prev) => !prev);
    }, []);

    const handleSimulationIntervalChange = useCallback((value: number) => {
        const clampedValue = Math.min(Math.max(value, 10), 1000);
        setSimulationIntervalMs(clampedValue);
    }, []);

    const drawnNumberContainers = drawnNumbers.map((number, index) => (
        <NumberContainer key={index} value={number} />
    ));

    const userNumberContainers = useMemo(() => {
        return getEmptyNumbers().map((_, index) => (
            <NumberContainer
                key={index}
                value={numbers[index]}
                onChange={
                    playWithRandomNumbers
                        ? undefined
                        : (value) => handleNumberChange(index, value)
                }
            />
        ));
    }, [numbers, handleNumberChange]);

    return (
        <>
            <Header />
            <div className="flex flex-col gap-12 items-start justify-center bg-white my-[clamp(24px,5vw,48px)] mx-[clamp(24px,10vw,116px)] py-[clamp(16px,5vw,48px)] px-[clamp(16px,8vw,78px)] rounded-[24px] shadow-[2px_2px_10px_0px_#0000001A]">
                <ContainerTitle title="Result" />
                <StatsContainer
                    playedTickets={playedTickets}
                    matchStats={matchStats}
                />
                <div>{drawnNumberContainers}</div>
                <div>{userNumberContainers}</div>
                <Checkbox
                    checked={playWithRandomNumbers}
                    onChange={handlePlayWithRandomNumbersChange}
                    label="Play with random numbers"
                />
                <input
                    type="number"
                    value={simulationIntervalMs}
                    onChange={(e) =>
                        handleSimulationIntervalChange(Number(e.target.value))
                    }
                />
                <button onClick={handleSimulationToggle}>
                    {isSimulating ? "Stop" : "Start"}
                </button>
            </div>
        </>
    );
}

export default App;
