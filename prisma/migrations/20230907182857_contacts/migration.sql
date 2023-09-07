-- CreateTable
CREATE TABLE "Contacts" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_id_key" ON "Contacts"("id");

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
