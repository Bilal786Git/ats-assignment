/*
  Warnings:

  - You are about to drop the column `applicationFields` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "applicationFields",
ADD COLUMN     "coverRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resumeRequired" BOOLEAN NOT NULL DEFAULT false;
