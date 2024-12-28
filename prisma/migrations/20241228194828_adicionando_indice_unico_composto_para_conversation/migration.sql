/*
  Warnings:

  - A unique constraint covering the columns `[participant1Id,participant2Id]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[participant2Id,participant1Id]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_participant1Id_participant2Id_key" ON "Conversation"("participant1Id", "participant2Id");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_participant2Id_participant1Id_key" ON "Conversation"("participant2Id", "participant1Id");
