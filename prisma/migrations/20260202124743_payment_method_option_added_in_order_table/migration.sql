-- CreateEnum
CREATE TYPE "paymentMethods" AS ENUM ('CASHONDELIVERY', 'OTHERS');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentMethod" "paymentMethods" NOT NULL DEFAULT 'CASHONDELIVERY';
