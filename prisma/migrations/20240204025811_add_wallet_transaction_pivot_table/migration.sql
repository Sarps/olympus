/*
  Warnings:

  - You are about to drop the column `narration` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_id` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idempotency_key]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TransactionRole" AS ENUM ('SENDER', 'RECEIPIENT', 'FEE');

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_wallet_id_fkey";

-- DropIndex
DROP INDEX "transactions_idempotency_key_type_key";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "narration",
DROP COLUMN "type",
DROP COLUMN "wallet_id";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "wallet_transactions" (
    "wallet_id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "role" "TransactionRole" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL,
    "narration" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "status_reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_transactions_pkey" PRIMARY KEY ("wallet_id","transaction_id","role")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_idempotency_key_key" ON "transactions"("idempotency_key");

-- AddForeignKey
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
