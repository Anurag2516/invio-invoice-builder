-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "senderAddress" TEXT,
ADD COLUMN     "senderCompany" TEXT,
ADD COLUMN     "senderEmail" TEXT,
ADD COLUMN     "senderName" TEXT,
ADD COLUMN     "senderPhone" TEXT,
ADD COLUMN     "senderWebsite" TEXT,
ADD COLUMN     "snapshotClientAddress" TEXT,
ADD COLUMN     "snapshotClientCompany" TEXT,
ADD COLUMN     "snapshotClientEmail" TEXT,
ADD COLUMN     "snapshotClientName" TEXT,
ADD COLUMN     "snapshotClientPhone" TEXT,
ADD COLUMN     "snapshotClientWebsite" TEXT;
