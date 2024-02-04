/*
  Warnings:

  - The values [RECEIPIENT] on the enum `TransactionRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `wallet_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `status_reason` on the `wallet_transactions` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionRole_new" AS ENUM ('SENDER', 'RECIPIENT', 'FEE');
ALTER TABLE "wallet_transactions" ALTER COLUMN "role" TYPE "TransactionRole_new" USING ("role"::text::"TransactionRole_new");
ALTER TYPE "TransactionRole" RENAME TO "TransactionRole_old";
ALTER TYPE "TransactionRole_new" RENAME TO "TransactionRole";
DROP TYPE "TransactionRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT 'INITIATED';

-- AlterTable
ALTER TABLE "wallet_transactions" DROP COLUMN "status",
DROP COLUMN "status_reason";
