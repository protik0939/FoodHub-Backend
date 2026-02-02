/*
  Warnings:

  - Added the required column `mealImage` to the `providerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "providerProfile" ADD COLUMN     "mealImage" TEXT NOT NULL;
