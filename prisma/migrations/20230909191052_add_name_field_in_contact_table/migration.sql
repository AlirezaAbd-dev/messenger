/*
  Warnings:

  - Added the required column `name` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacts" ADD COLUMN     "name" TEXT NOT NULL;
