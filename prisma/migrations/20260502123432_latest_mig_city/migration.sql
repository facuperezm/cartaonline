/*
  Warnings:

  - You are about to drop the column `storeId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mpPreapprovalId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_storeId_fkey";

-- DropIndex
DROP INDEX "Payment_storeId_idx";

-- DropIndex
DROP INDEX "Payment_storeId_key";

-- DropIndex
DROP INDEX "Subscription_storeId_idx";

-- DropIndex
DROP INDEX "Subscription_storeId_key";

-- AlterTable
ALTER TABLE "Banner" ALTER COLUMN "storeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Logo" ALTER COLUMN "storeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "storeId",
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "rawPayload" JSONB,
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "paymentId" DROP NOT NULL,
ALTER COLUMN "merchantOrderId" DROP NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL,
ALTER COLUMN "metadata" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "expiresAt",
DROP COLUMN "startDate",
DROP COLUMN "storeId",
ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "currentPeriodStart" TIMESTAMP(3),
ADD COLUMN     "mpPreapprovalId" TEXT,
ADD COLUMN     "nextPaymentDate" TIMESTAMP(3),
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");

-- CreateIndex
CREATE INDEX "Payment_subscriptionId_idx" ON "Payment"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_mpPreapprovalId_key" ON "Subscription"("mpPreapprovalId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE INDEX "Subscription_mpPreapprovalId_idx" ON "Subscription"("mpPreapprovalId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
