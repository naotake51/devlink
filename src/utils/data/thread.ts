import { Prisma } from "@/__generated__/prisma";
import prisma from "@/lib/prisma";
import _ from "lodash";
import { cache } from "react";
import "server-only";

export const getThreadByUser = cache(
  async (projectId: string, profileId: string) => {
    const thread = await prisma.projectThread.findUnique({
      where: {
        projectId_profileId: {
          projectId,
          profileId,
        },
      },
      select: {
        id: true,
      },
    });

    return thread;
  },
);

export const getThread = cache(async (projectId: string, id: string) => {
  const thread = await prisma.projectThread.findUnique({
    where: {
      id: id,
      projectId: projectId,
    },
    select: {
      id: true,
      profile: {
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return thread;
});

export const getThreads = cache(async (projectId: string) => {
  const threads = await prisma.projectThread.findMany({
    where: {
      projectId: projectId,
    },
    select: {
      id: true,
      profile: {
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return threads;
});

export const getMessages = cache(async (threadId: string) => {
  const messages = await prisma.projectMessage.findMany({
    where: {
      threadId,
    },
    select: {
      id: true,
      message: true,
      senderId: true,
      createdAt: true,
      sender: {
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return messages;
});

export const getLatestMessages = cache(async (threadIds: string[]) => {
  if (threadIds.length === 0) return {};

  const latestMessages = await prisma.$queryRaw<
    Array<{
      id: string;
      message: string;
      createdAt: Date;
      threadId: string;
    }>
  >(Prisma.sql`
  SELECT DISTINCT ON ("threadId")
    id,
    message,
    "createdAt",
    "threadId"
  FROM "ProjectMessage"
  WHERE "threadId" = ANY(${threadIds}::uuid[])
  ORDER BY "threadId", "createdAt" DESC
`);

  return _.keyBy(latestMessages, "threadId");
});
