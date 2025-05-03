import { HIGHEST_MATCH_COUNT } from "./consts";

export function getRandomNumbers(): number[] {
    const numbers: number[] = [];
    while (numbers.length < HIGHEST_MATCH_COUNT) {
        const num = getCryptoRandomInt(1, 90);
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers.sort((a, b) => a - b);
}

export function getCryptoRandomInt(min: number, max: number): number {
    // Returns a random integer between min (inclusive) and max (inclusive)
    const range = max - min + 1;
    const randomBuffer = new Uint32Array(1);
    let randomNumber: number;
    do {
        window.crypto.getRandomValues(randomBuffer);
        randomNumber = randomBuffer[0] & 0x7fffffff; // ensure positive
    } while (randomNumber >= Math.floor(0x7fffffff / range) * range);
    return min + (randomNumber % range);
}

export function getEmptyNumbers(): number[] {
    return Array.from({ length: HIGHEST_MATCH_COUNT });
}
