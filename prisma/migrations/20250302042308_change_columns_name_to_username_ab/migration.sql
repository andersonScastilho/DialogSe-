/*
  Warnings:

  - You are about to drop the column `participant1Id` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `participant2Id` on the `Conversation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usernameA,usernameB]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usernameB,usernameA]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usernameA` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usernameB` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Conversation_participant1Id_participant2Id_key";

-- DropIndex
DROP INDEX "Conversation_participant2Id_participant1Id_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "participant1Id",
DROP COLUMN "participant2Id",
ADD COLUMN     "usernameA" TEXT NOT NULL,
ADD COLUMN     "usernameB" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_usernameA_usernameB_key" ON "Conversation"("usernameA", "usernameB");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_usernameB_usernameA_key" ON "Conversation"("usernameB", "usernameA");
