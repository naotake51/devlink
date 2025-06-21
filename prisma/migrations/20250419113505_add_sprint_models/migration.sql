/*
  Warnings:

  - The primary key for the `ProjectMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[projectId,profileId]` on the table `ProjectMember` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `ProjectMember` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `initialDevPoint` to the `ProjectMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD COLUMN     "initialDevPoint" INTEGER NOT NULL,
ADD CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Sprint" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "sprintNumber" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "voteStartDate" TIMESTAMP(3) NOT NULL,
    "voteEndDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SprintVote" (
    "id" UUID NOT NULL,
    "sprintId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "devPoint" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SprintVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SprintVoteAllocation" (
    "id" UUID NOT NULL,
    "sprintVoteId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "devPoint" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SprintVoteAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SprintDividend" (
    "id" UUID NOT NULL,
    "sprintId" UUID NOT NULL,
    "devPoint" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SprintDividend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SprintDividendAllocation" (
    "id" UUID NOT NULL,
    "sprintDividendId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "devPoint" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SprintDividendAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_projectId_sprintNumber_key" ON "Sprint"("projectId", "sprintNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SprintVote_sprintId_memberId_key" ON "SprintVote"("sprintId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "SprintVoteAllocation_sprintVoteId_memberId_key" ON "SprintVoteAllocation"("sprintVoteId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "SprintDividend_sprintId_key" ON "SprintDividend"("sprintId");

-- CreateIndex
CREATE UNIQUE INDEX "SprintDividendAllocation_sprintDividendId_memberId_key" ON "SprintDividendAllocation"("sprintDividendId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMember_projectId_profileId_key" ON "ProjectMember"("projectId", "profileId");

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintVote" ADD CONSTRAINT "SprintVote_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintVote" ADD CONSTRAINT "SprintVote_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "ProjectMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintVoteAllocation" ADD CONSTRAINT "SprintVoteAllocation_sprintVoteId_fkey" FOREIGN KEY ("sprintVoteId") REFERENCES "SprintVote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintVoteAllocation" ADD CONSTRAINT "SprintVoteAllocation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "ProjectMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintDividend" ADD CONSTRAINT "SprintDividend_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintDividendAllocation" ADD CONSTRAINT "SprintDividendAllocation_sprintDividendId_fkey" FOREIGN KEY ("sprintDividendId") REFERENCES "SprintDividend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintDividendAllocation" ADD CONSTRAINT "SprintDividendAllocation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "ProjectMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
