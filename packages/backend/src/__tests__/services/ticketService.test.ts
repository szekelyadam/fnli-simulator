import { describe, it, expect, beforeEach, vi } from "vitest";
import { countMatchingNumbers, saveTicket } from "../../services/ticketService";
import db from "../../services/db";

describe("ticketService", () => {
    describe("countMatchingNumbers", () => {
        it("should correctly count matching numbers", () => {
            const arr1 = [1, 2, 3, 4, 5];
            const arr2 = [3, 4, 5, 6, 7];

            expect(countMatchingNumbers(arr1, arr2)).toBe(3);
        });

        it("should return 0 when no numbers match", () => {
            const arr1 = [1, 2, 3];
            const arr2 = [4, 5, 6];

            expect(countMatchingNumbers(arr1, arr2)).toBe(0);
        });

        it("should handle duplicate numbers correctly", () => {
            const arr1 = [1, 1, 2, 2];
            const arr2 = [1, 2, 3, 4];

            expect(countMatchingNumbers(arr1, arr2)).toBe(2);
        });
    });

    describe("saveTicket", () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        it("should save ticket to database", async () => {
            const ticket = {
                playedNumbers: [1, 2, 3, 4, 5],
                drawnNumbers: [1, 2, 3, 6, 7],
                matchCount: 3,
                sessionId: "test-session",
            };

            await saveTicket(ticket);

            expect(db.ticket.create).toHaveBeenCalledWith({
                data: ticket,
            });
        });

        it("should handle database errors", async () => {
            const ticket = {
                playedNumbers: [1, 2, 3, 4, 5],
                drawnNumbers: [1, 2, 3, 6, 7],
                matchCount: 3,
                sessionId: "test-session",
            };

            const error = new Error("Database error");
            vi.mocked(db.ticket.create).mockRejectedValueOnce(error);

            await expect(saveTicket(ticket)).rejects.toThrow("Database error");
        });
    });
});
