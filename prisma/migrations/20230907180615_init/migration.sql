-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('OFFLINE', 'ONLINE', 'OFF');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "status" "STATUS" NOT NULL DEFAULT 'OFFLINE'
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");
