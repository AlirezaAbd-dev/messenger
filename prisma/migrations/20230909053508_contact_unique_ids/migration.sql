/*
  Warnings:

  - A unique constraint covering the columns `[usersId,contactId]` on the table `Contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contacts_usersId_contactId_key" ON "Contacts"("usersId", "contactId");
