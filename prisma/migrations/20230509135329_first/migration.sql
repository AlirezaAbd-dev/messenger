/*
  Warnings:

  - You are about to drop the column `contacts` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONLINE', 'OFFLINE', 'OFF');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contacts",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'OFFLINE';

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserContact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_key" ON "Contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserContact_AB_unique" ON "_UserContact"("A", "B");

-- CreateIndex
CREATE INDEX "_UserContact_B_index" ON "_UserContact"("B");

-- AddForeignKey
ALTER TABLE "_UserContact" ADD CONSTRAINT "_UserContact_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserContact" ADD CONSTRAINT "_UserContact_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
