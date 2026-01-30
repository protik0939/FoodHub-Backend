-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'NONE';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'NONE';
