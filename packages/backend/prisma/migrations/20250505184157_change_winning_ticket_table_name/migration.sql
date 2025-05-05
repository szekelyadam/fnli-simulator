/*
  Warnings:

  - You are about to drop the `WinningTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WinningTicket";

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "playedNumbers" INTEGER[],
    "drawnNumbers" INTEGER[],
    "sessionId" TEXT NOT NULL,
    "matchCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
