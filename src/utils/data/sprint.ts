import { today } from "@/lib/date-utils";
import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

export const getSprints = cache(async (projectId: string) => {
  const sprint = await prisma.sprint.findMany({
    where: {
      projectId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      sprintNumber: true,
      voteStartDate: true,
      voteEndDate: true,
      sprintVotes: {
        select: {
          id: true,
          member: {
            select: {
              profileId: true,
            },
          },
        },
      },
      sprintDividend: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      sprintNumber: "desc",
    },
  });

  return sprint;
});

export const getVotingSprint = cache(async (projectId: string) => {
  const _today = today();

  return await prisma.sprint.findFirst({
    where: {
      projectId: projectId,
      voteStartDate: {
        lte: _today,
      },
      voteEndDate: {
        gte: _today,
      },
    },
    select: {
      id: true,
    },
  });
});

export const getVote = cache(async (sprintId: string, userId: string) => {
  const vote = await prisma.sprintVote.findFirst({
    where: {
      sprintId: sprintId,
      member: {
        profileId: userId,
      },
    },
  });

  return vote;
});
