/*
  Warnings:

  - You are about to drop the column `usernameA` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `usernameB` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdAt` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_conversationId_fkey";

-- DropIndex
DROP INDEX "Conversation_usernameA_usernameB_key";

-- DropIndex
DROP INDEX "Conversation_usernameB_usernameA_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "usernameA",
DROP COLUMN "usernameB",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isGroup" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "messages";

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
