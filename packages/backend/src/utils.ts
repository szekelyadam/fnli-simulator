import { randomBytes } from "crypto";
import { COUNT, MAX, MIN } from "./consts";

export function drawNumbers(): number[] {
    const numbers: number[] = [];
    const range = MAX - MIN + 1;

    while (numbers.length < COUNT) {
        const randomBytesBuffer = randomBytes(4);
        const randomValue = randomBytesBuffer.readUInt32BE(0);

        // Rejection sampling to avoid modulo bias
        const maxAcceptableValue = Math.floor(0xffffffff / range) * range;
        if (randomValue >= maxAcceptableValue) {
            continue; // Skip this value to avoid bias
        }

        const randomNumber = (randomValue % range) + MIN;

        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }

    return numbers.sort((a, b) => a - b);
}

export function countMatchingNumbers(arr1: number[], arr2: number[]): number {
    const set = new Set(arr1);
    return arr2.filter((num) => set.has(num)).length;
}
