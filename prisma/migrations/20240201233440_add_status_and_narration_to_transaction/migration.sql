/*
  Warnings:

  - Added the required column `status` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('CANCELLED', 'INITIATED', 'FAILED', 'SUCCESS');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "narration" TEXT,
ADD COLUMN     "status" "TransactionStatus" NOT NULL,
ADD COLUMN     "status_reason" TEXT;
