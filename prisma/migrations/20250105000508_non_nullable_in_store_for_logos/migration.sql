/*
  Warnings:

  - Made the column `storeId` on table `Logo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Logo" ALTER COLUMN "storeId" SET NOT NULL;
