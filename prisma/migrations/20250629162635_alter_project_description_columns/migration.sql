/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
ADD COLUMN     "serviceDescription" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "techStackDescription" TEXT NOT NULL DEFAULT '';
