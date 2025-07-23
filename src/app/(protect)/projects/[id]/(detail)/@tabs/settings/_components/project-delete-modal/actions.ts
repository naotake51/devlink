"use server";

import { ProjectMemberRole } from "@/__generated__/prisma/index";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { getAuthUser } from "@/utils/data/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const DeleteProjectSchema = z.object({
  projectId: z.string().uuid(),
});

export const deleteProject = actionClient
  .schema(DeleteProjectSchema)
  .action(async ({ parsedInput }) => {
    const { projectId } = parsedInput;

    const user = await getAuthUser();
    if (!user) {
      throw new Error("ユーザーが認証されていません。");
    }

    const project = await prisma.project.findUnique({
      select: {
        id: true,
      },
      where: { id: projectId },
    });
    if (!project) {
      throw new Error("プロジェクトが見つかりません。");
    }

    const projectMember = await prisma.projectMember.findFirst({
      where: { projectId: project.id, profileId: user.id },
      select: { role: true },
    });
    if (!projectMember || projectMember.role !== ProjectMemberRole.OWNER) {
      throw new Error("プロジェクトの所有者ではありません。");
    }

    await prisma.project.delete({ where: { id: projectId } });

    redirect("/my");
  });
