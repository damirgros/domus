-- AlterTable
ALTER TABLE "Expense" ADD COLUMN "propertyName" TEXT;

-- AlterTable
ALTER TABLE "MaintenanceTicket" ADD COLUMN "propertyName" TEXT;

UPDATE "Expense"
SET "propertyName" = "Property"."name"
FROM "Property"
WHERE "Expense"."propertyId" = "Property"."id";

UPDATE "MaintenanceTicket"
SET "propertyName" = "Property"."name"
FROM "Property"
WHERE "MaintenanceTicket"."propertyId" = "Property"."id";

ALTER TABLE "Expense"
ALTER COLUMN "propertyName" SET NOT NULL;

ALTER TABLE "MaintenanceTicket"
ALTER COLUMN "propertyName" SET NOT NULL;
