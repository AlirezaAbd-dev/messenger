/*
  Warnings:

  - You are about to drop the `_UserContact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserContact" DROP CONSTRAINT "_UserContact_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserContact" DROP CONSTRAINT "_UserContact_B_fkey";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserContact";

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
