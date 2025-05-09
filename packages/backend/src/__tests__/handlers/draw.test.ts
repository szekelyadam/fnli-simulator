import { describe, it, expect, beforeEach, vi } from "vitest";
import { draw } from "../../handlers/draw";
import {
    drawNumbers,
    countMatchingNumbers,
    saveTicket,
} from "../../services/ticketService";
import { LOWEST_MATCH_COUNT } from "../../consts";

// Mock the ticket service module
vi.mock("../../services/ticketService", () => ({
    drawNumbers: vi.fn(),
    countMatchingNumbers: vi.fn(),
    saveTicket: vi.fn(),
}));

describe("draw handler", () => {
    let mockWs: any;

    beforeEach(() => {
        vi.clearAllMocks();
        mockWs = {
            sessionId: "test-session",
            send: vi.fn(),
        };
    });

    it("should send result with drawn numbers and matches", async () => {
        const playedNumbers = [1, 2, 3, 4, 5];
        const drawnNumbers = [1, 2, 6, 7, 8];
        const matches = 2;

        vi.mocked(drawNumbers).mockReturnValue(drawnNumbers);
        vi.mocked(countMatchingNumbers).mockReturnValue(matches);

        await draw(mockWs, { numbers: playedNumbers });

        expect(mockWs.send).toHaveBeenCalledWith(
            JSON.stringify({
                type: "result",
                drawnNumbers,
                matches,
            })
        );
    });

    it("should save ticket when matches meet minimum threshold", async () => {
        const playedNumbers = [1, 2, 3, 4, 5];
        const drawnNumbers = [1, 2, 3, 6, 7];
        const matches = LOWEST_MATCH_COUNT;

        vi.mocked(drawNumbers).mockReturnValue(drawnNumbers);
        vi.mocked(countMatchingNumbers).mockReturnValue(matches);

        await draw(mockWs, { numbers: playedNumbers });

        expect(saveTicket).toHaveBeenCalledWith({
            playedNumbers,
            drawnNumbers,
            matchCount: matches,
            sessionId: mockWs.sessionId,
        });
    });

    it("should not save ticket when matches are below threshold", async () => {
        const playedNumbers = [1, 2, 3, 4, 5];
        const drawnNumbers = [1, 2, 6, 7, 8];
        const matches = LOWEST_MATCH_COUNT - 1;

        vi.mocked(drawNumbers).mockReturnValue(drawnNumbers);
        vi.mocked(countMatchingNumbers).mockReturnValue(matches);

        await draw(mockWs, { numbers: playedNumbers });

        expect(saveTicket).not.toHaveBeenCalled();
    });

    it("should handle database errors gracefully", async () => {
        const playedNumbers = [1, 2, 3, 4, 5];
        const drawnNumbers = [1, 2, 3, 6, 7];
        const matches = LOWEST_MATCH_COUNT;

        vi.mocked(drawNumbers).mockReturnValue(drawnNumbers);
        vi.mocked(countMatchingNumbers).mockReturnValue(matches);
        vi.mocked(saveTicket).mockRejectedValueOnce(new Error("DB error"));

        await draw(mockWs, { numbers: playedNumbers });

        // Should still send result even if save fails
        expect(mockWs.send).toHaveBeenCalledWith(
            JSON.stringify({
                type: "result",
                drawnNumbers,
                matches,
            })
        );
    });
});
