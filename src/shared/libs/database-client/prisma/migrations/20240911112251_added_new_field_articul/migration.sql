/*
  Warnings:

  - Added the required column `articul` to the `guitars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guitars" ADD COLUMN     "articul" TEXT NOT NULL;
