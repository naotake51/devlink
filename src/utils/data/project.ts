import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

export const getProject = cache(async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
    },
  });

  return project;
});

export const getProjectMember = cache(
  async (projectId: string, profileId: string) => {
    const projectMember = await prisma.projectMember.findFirst({
      where: {
        projectId,
        profileId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    return projectMember;
  },
);

export const getProjectMembers = cache(async (projectId: string) => {
  const project = await prisma.projectMember.findMany({
    where: {
      projectId: projectId,
    },
    select: {
      role: true,
      devPoint: true,
      createdAt: true,
      profile: {
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return project;
});

export const getProjectApplication = cache(
  async (projectId: string, profileId: string) => {
    const application = await prisma.projectApplication.findUnique({
      where: {
        projectId_profileId: {
          projectId,
          profileId,
        },
      },
    });

    return application;
  },
);

export const getProjectsByQuery = cache(async (query?: string) => {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
      projectMembers: {
        select: {
          role: true,
          profile: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
    where: {
      /**
       * TODO::
       * 全角・半角、かな、カタカナなどあいまいな検索を実装する。
       * 将来的にはインデックス（転置）が必要になる。
       * PGroongaの使用を検討する。
       */
      OR: query
        ? [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ]
        : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return projects;
});
