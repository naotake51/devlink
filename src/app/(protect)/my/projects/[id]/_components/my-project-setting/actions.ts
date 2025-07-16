"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const DeleteProjectSchema = z.object({
  projectId: z.string().uuid(),
});

export const deleteProject = actionClient
  .schema(DeleteProjectSchema)
  .action(async ({ parsedInput }) => {
    const { projectId } = parsedInput;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("ユーザーが認証されていません。");
    }

    const project = await prisma.project.findUnique({
      select: {
        projectMembers: {
          select: {
            role: true,
            profileId: true,
          },
        },
      },
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("プロジェクトが見つかりません。");
    }

    if (
      !project.projectMembers.some(
        (member) => member.profileId === user.id && member.role === "OWNER",
      )
    ) {
      throw new Error("プロジェクトの所有者ではありません。");
    }

    await prisma.project.delete({ where: { id: projectId } });

    revalidatePath("/my");
    redirect("/my");
  });
