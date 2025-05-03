import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
    const connection = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");

        socket.addEventListener("open", () => {
            console.log("Connected to server");
        });

        socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "result") {
                setDrawnNumbers(data.drawnNumbers);
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

    return (
        <>
            <div>
                {drawnNumbers.map((number) => (
                    <div key={number}>{number}</div>
                ))}
            </div>
            {Array.from({ length: 5 }).map((_, index) => (
                <input
                    key={index}
                    type="number"
                    value={numbers[index]}
                    onChange={(e) =>
                        handleNumberChange(index, Number(e.target.value))
                    }
                />
            ))}
            <button onClick={handleDraw}>Draw</button>
        </>
    );
}

export default App;
