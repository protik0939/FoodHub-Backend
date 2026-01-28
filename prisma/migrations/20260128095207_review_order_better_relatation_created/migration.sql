/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `mealId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `userProfileId` on the `review` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_mealId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_userProfileId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "userProfileId";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "mealId",
DROP COLUMN "userProfileId",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
