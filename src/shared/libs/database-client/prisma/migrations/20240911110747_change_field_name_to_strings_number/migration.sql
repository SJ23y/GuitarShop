/*
  Warnings:

  - You are about to drop the column `StringsNumber` on the `guitars` table. All the data in the column will be lost.
  - Added the required column `strings_number` to the `guitars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guitars" DROP COLUMN "StringsNumber",
ADD COLUMN     "strings_number" INTEGER NOT NULL;
