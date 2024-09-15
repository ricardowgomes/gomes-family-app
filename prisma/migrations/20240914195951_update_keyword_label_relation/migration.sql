/*
  Warnings:

  - You are about to drop the `_KeywordLabels` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `labelId` to the `Keyword` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_KeywordLabels" DROP CONSTRAINT "_KeywordLabels_A_fkey";

-- DropForeignKey
ALTER TABLE "_KeywordLabels" DROP CONSTRAINT "_KeywordLabels_B_fkey";

-- AlterTable
ALTER TABLE "Keyword" ADD COLUMN     "labelId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_KeywordLabels";

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
