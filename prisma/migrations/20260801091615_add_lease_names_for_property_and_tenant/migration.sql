/*
  Warnings:

  - Added the required column `propertyName` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantName` to the `Lease` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lease" ADD COLUMN     "propertyName" TEXT NOT NULL,
ADD COLUMN     "tenantName" TEXT NOT NULL;
