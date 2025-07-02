"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { messageFormSchema } from "./message-form-schema";

const sendMessageSchema = messageFormSchema.extend({
  projectId: z.string(),
});

export const sendMessage = actionClient
  .schema(sendMessageSchema)
  .action(async ({ parsedInput: { projectId, message } }) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("認証が必要です");
    }

    // ProjectThreadを作成または取得
    const projectThread = await prisma.projectThread.upsert({
      where: {
        projectId_profileId: {
          projectId,
          profileId: user.id,
        },
      },
      update: {},
      create: {
        projectId,
        profileId: user.id,
      },
    });

    // メッセージを作成
    await prisma.projectMessage.create({
      data: {
        threadId: projectThread.id,
        senderId: user.id,
        message,
      },
    });

    revalidatePath(`/projects/${projectId}`);
    return { success: true };
  });
