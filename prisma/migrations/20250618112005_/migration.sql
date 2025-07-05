/*
  Warnings:

  - The values [FAILED] on the enum `UPDATE_STATUSES` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[id,belongsToId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UPDATE_STATUSES_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "Update" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Update" ALTER COLUMN "status" TYPE "UPDATE_STATUSES_new" USING ("status"::text::"UPDATE_STATUSES_new");
ALTER TYPE "UPDATE_STATUSES" RENAME TO "UPDATE_STATUSES_old";
ALTER TYPE "UPDATE_STATUSES_new" RENAME TO "UPDATE_STATUSES";
DROP TYPE "UPDATE_STATUSES_old";
ALTER TABLE "Update" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belongsToId_key" ON "Product"("id", "belongsToId");
