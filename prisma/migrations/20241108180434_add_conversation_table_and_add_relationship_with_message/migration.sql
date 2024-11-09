/*
  Warnings:

  - Added the required column `conversationId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "conversationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "participant1Id" TEXT NOT NULL,
    "participant2Id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_id_key" ON "Conversation"("id");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
