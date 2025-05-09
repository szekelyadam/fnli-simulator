import { describe, it, expect, beforeEach, vi } from "vitest";
import { router } from "../../routes/router";
import * as handlers from "../../handlers";

vi.mock("../../handlers", () => ({
    draw: vi.fn(),
}));

describe("router", () => {
    let mockWs: any;

    beforeEach(() => {
        vi.clearAllMocks();
        mockWs = {
            sessionId: "test-session",
            send: vi.fn(),
        };
    });

    it("should route draw messages to draw handler", () => {
        const data = {
            type: "draw",
            numbers: [1, 2, 3, 4, 5],
        };

        router(mockWs, data);

        expect(handlers.draw).toHaveBeenCalledWith(mockWs, data);
    });

    it("should send error for unknown message type", () => {
        const data = {
            type: "unknown",
            numbers: [1, 2, 3, 4, 5],
        };

        router(mockWs, data);

        expect(mockWs.send).toHaveBeenCalledWith(
            JSON.stringify({ error: "Unknown message type" })
        );
        expect(handlers.draw).not.toHaveBeenCalled();
    });
});
