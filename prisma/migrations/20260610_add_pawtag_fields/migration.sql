-- AlterTable: Add PawTag fields to Pet
ALTER TABLE "Pet" ADD COLUMN "ownerName" TEXT;
ALTER TABLE "Pet" ADD COLUMN "ownerPhone" TEXT;
ALTER TABLE "Pet" ADD COLUMN "altPhone" TEXT;
ALTER TABLE "Pet" ADD COLUMN "allergies" TEXT;
ALTER TABLE "Pet" ADD COLUMN "medications" TEXT;
ALTER TABLE "Pet" ADD COLUMN "conditions" TEXT;
ALTER TABLE "Pet" ADD COLUMN "vetName" TEXT;
ALTER TABLE "Pet" ADD COLUMN "vetPhone" TEXT;

-- Add tagId as nullable first
ALTER TABLE "Pet" ADD COLUMN "tagId" TEXT;

-- Populate existing rows with unique cuid-like values
UPDATE "Pet" SET "tagId" = "id" WHERE "tagId" IS NULL;

-- Make tagId required and unique
ALTER TABLE "Pet" ALTER COLUMN "tagId" SET NOT NULL;
CREATE UNIQUE INDEX "Pet_tagId_key" ON "Pet"("tagId");
CREATE INDEX "Pet_tagId_idx" ON "Pet"("tagId");
