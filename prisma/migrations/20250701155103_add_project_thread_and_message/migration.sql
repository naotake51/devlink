/*
  Warnings:

  - You are about to drop the column `message` on the `ProjectApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectApplication" DROP COLUMN "message";

-- CreateTable
CREATE TABLE "ProjectThread" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "profileId" UUID NOT NULL,

    CONSTRAINT "ProjectThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMessage" (
    "id" UUID NOT NULL,
    "threadId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectThread_projectId_profileId_key" ON "ProjectThread"("projectId", "profileId");

-- AddForeignKey
ALTER TABLE "ProjectThread" ADD CONSTRAINT "ProjectThread_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectThread" ADD CONSTRAINT "ProjectThread_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMessage" ADD CONSTRAINT "ProjectMessage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "ProjectThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMessage" ADD CONSTRAINT "ProjectMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
