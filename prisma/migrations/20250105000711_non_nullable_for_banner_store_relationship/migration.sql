/*
  Warnings:

  - Made the column `storeId` on table `Banner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Banner" ALTER COLUMN "storeId" SET NOT NULL;
