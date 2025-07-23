"use server";

import { ProjectApplicationStatus } from "@/__generated__/prisma";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { getAuthUser } from "@/utils/data/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ProjectApplicationSchema } from "./project-application-form-schema";

const submitApplicationSchema = ProjectApplicationSchema.extend({
  projectId: z.string(),
});

export const submitApplication = actionClient
  .schema(submitApplicationSchema)
  .action(async ({ parsedInput }) => {
    const { message, projectId } = parsedInput;

    const user = await getAuthUser();
    if (!user) {
      throw new Error("認証が必要です");
    }

    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
    });

    if (!profile) {
      throw new Error("プロフィールが見つかりません");
    }

    await prisma.$transaction(async (tx) => {
      const existingApplication = await prisma.projectApplication.findFirst({
        where: {
          projectId: projectId,
          profileId: profile.id,
        },
      });

      if (existingApplication) {
        throw new Error("すでに応募済みです");
      }

      await tx.projectApplication.create({
        data: {
          projectId: projectId,
          profileId: profile.id,
          status: ProjectApplicationStatus.PENDING,
        },
      });

      // ProjectThreadを作成または取得
      const projectThread = await tx.projectThread.upsert({
        where: {
          projectId_profileId: {
            projectId: projectId,
            profileId: profile.id,
          },
        },
        update: {},
        create: {
          projectId: projectId,
          profileId: profile.id,
        },
      });

      // ProjectMessageを作成
      await tx.projectMessage.create({
        data: {
          threadId: projectThread.id,
          senderId: profile.id,
          message: message,
        },
      });
    });

    redirect(`/projects/${projectId}/overview`);
  });
