/*
  Warnings:

  - You are about to drop the column `labelIds` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "labelIds";

-- CreateTable
CREATE TABLE "_TransactionLabels" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TransactionLabels_AB_unique" ON "_TransactionLabels"("A", "B");

-- CreateIndex
CREATE INDEX "_TransactionLabels_B_index" ON "_TransactionLabels"("B");

-- AddForeignKey
ALTER TABLE "_TransactionLabels" ADD CONSTRAINT "_TransactionLabels_A_fkey" FOREIGN KEY ("A") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionLabels" ADD CONSTRAINT "_TransactionLabels_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
