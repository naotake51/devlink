"use server";

import { ProjectApplicationStatus } from "@/__generated__/prisma";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ProjectApplicationSchema } from "./schema";

const safeAction = createSafeActionClient();

const submitApplicationSchema = ProjectApplicationSchema.extend({
  projectId: z.string(),
});

export const submitApplication = safeAction
  .schema(submitApplicationSchema)
  .action(async ({ parsedInput }) => {
    const { message, projectId } = parsedInput;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("認証が必要です");
    }

    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
    });

    if (!profile) {
      throw new Error("プロフィールが見つかりません");
    }

    // 既に応募があるか確認
    const existingApplication = await prisma.projectApplication.findFirst({
      where: {
        projectId: projectId,
        profileId: profile.id,
      },
    });

    if (existingApplication) {
      throw new Error("すでに応募済みです");
    }

    await prisma.projectApplication.create({
      data: {
        projectId: projectId,
        profileId: profile.id,
        message: message,
        status: ProjectApplicationStatus.PENDING,
      },
    });

    revalidatePath(`/projects/${projectId}`);
    redirect(`/projects/${projectId}`);
  });
