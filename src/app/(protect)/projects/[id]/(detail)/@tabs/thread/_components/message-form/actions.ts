"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { getAuthUser } from "@/utils/data/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { messageFormSchema } from "./schema";

const sendMessageSchema = messageFormSchema.extend({
  projectId: z.string().uuid(),
  threadProfileId: z.string().uuid(),
});

export const sendMessage = actionClient
  .schema(sendMessageSchema)
  .action(async ({ parsedInput: { projectId, threadProfileId, message } }) => {
    const user = await getAuthUser();
    if (!user) {
      throw new Error("認証が必要です");
    }

    await prisma.$transaction(async (tx) => {
      const isUserThread = threadProfileId === user.id;
      const isProjectOwner = !!(await tx.projectMember.findFirst({
        where: {
          projectId,
          profileId: user.id,
          role: "OWNER",
        },
      }));
      if (!isUserThread && !isProjectOwner) {
        throw new Error(
          "プロジェクト管理者またはスレッドの対象者のみがメッセージを書き込めます。",
        );
      }

      const projectThread = await tx.projectThread.upsert({
        where: {
          projectId_profileId: {
            projectId,
            profileId: threadProfileId,
          },
        },
        update: {},
        create: {
          projectId,
          profileId: user.id,
        },
      });

      await tx.projectMessage.create({
        data: {
          threadId: projectThread.id,
          senderId: user.id,
          message,
        },
      });
    });

    revalidatePath(`/projects/${projectId}`);
    return { success: true };
  });
