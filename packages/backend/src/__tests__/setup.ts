import { vi } from "vitest";

// Mock WebSocket
vi.mock("ws", () => ({
    WebSocket: vi.fn().mockImplementation(() => ({
        send: vi.fn(),
        on: vi.fn(),
        sessionId: "test-session-id",
    })),
    Server: vi.fn().mockImplementation(() => ({
        on: vi.fn(),
    })),
}));

// Mock Prisma client
vi.mock("../services/db", () => ({
    default: {
        ticket: {
            create: vi.fn(),
        },
    },
}));

// Mock crypto
vi.mock("crypto", () => ({
    randomBytes: vi.fn().mockReturnValue(Buffer.from([1, 2, 3, 4])),
}));
