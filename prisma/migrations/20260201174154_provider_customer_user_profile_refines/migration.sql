-- AlterTable
ALTER TABLE "adminProfile" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "contact" DROP NOT NULL;

-- AlterTable
ALTER TABLE "providerProfile" ALTER COLUMN "providerName" DROP NOT NULL,
ALTER COLUMN "providerEmail" DROP NOT NULL,
ALTER COLUMN "providerContact" DROP NOT NULL,
ALTER COLUMN "providerAddress" DROP NOT NULL,
ALTER COLUMN "ownerName" DROP NOT NULL,
ALTER COLUMN "ownerEmail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "userProfile" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
