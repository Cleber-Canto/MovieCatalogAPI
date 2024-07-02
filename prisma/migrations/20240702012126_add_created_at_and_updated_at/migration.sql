-- Add columns with default values
ALTER TABLE "Movie" ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();
ALTER TABLE "Movie" ADD COLUMN "updatedAt" TIMESTAMP DEFAULT NOW();

-- Update existing rows to have default values
UPDATE "Movie" SET "createdAt" = NOW() WHERE "createdAt" IS NULL;
UPDATE "Movie" SET "updatedAt" = NOW() WHERE "updatedAt" IS NULL;

-- Alter the columns to make them NOT NULL
ALTER TABLE "Movie" ALTER COLUMN "createdAt" SET NOT NULL;
ALTER TABLE "Movie" ALTER COLUMN "updatedAt" SET NOT NULL;
