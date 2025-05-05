-- CreateTable
CREATE TABLE "WinningTicket" (
    "id" TEXT NOT NULL,
    "playedNumbers" INTEGER[],
    "drawnNumbers" INTEGER[],
    "sessionId" TEXT NOT NULL,
    "matchCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WinningTicket_pkey" PRIMARY KEY ("id")
);
