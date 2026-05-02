-- Add location fields before dropping City so existing rows can be migrated.
ALTER TABLE "Store"
ADD COLUMN "citySlug" TEXT,
ADD COLUMN "cityName" TEXT,
ADD COLUMN "province" TEXT,
ADD COLUMN "latitude" DOUBLE PRECISION,
ADD COLUMN "longitude" DOUBLE PRECISION;

UPDATE "Store"
SET
  "citySlug" = REPLACE("City"."name", '_', '-'),
  "cityName" = "City"."displayName",
  "province" = "City"."state",
  "latitude" = 0,
  "longitude" = 0
FROM "City"
WHERE "Store"."cityId" = "City"."id";

ALTER TABLE "Store"
ALTER COLUMN "citySlug" SET NOT NULL,
ALTER COLUMN "cityName" SET NOT NULL,
ALTER COLUMN "province" SET NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

ALTER TABLE "Store" DROP CONSTRAINT "Store_cityId_fkey";
DROP INDEX "Store_cityId_idx";
ALTER TABLE "Store" DROP COLUMN "cityId";
DROP TABLE "City";

CREATE INDEX "Store_citySlug_idx" ON "Store"("citySlug");
