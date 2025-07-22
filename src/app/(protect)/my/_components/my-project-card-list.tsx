import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/utils/data/auth";
import { FilePenLineIcon } from "lucide-react";
import Link from "next/link";
import {
  MyProjectCard,
  projectSelectForMyProjectCard,
} from "./my-project-card";

export async function MyProjectCardList() {
  const projects = await getMyProjects();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">参加しているプロジェクト</h2>
        <Button variant="outline" asChild>
          <Link href="/my/projects/new">
            新しいプロジェクト
            <FilePenLineIcon />
          </Link>
        </Button>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <MyProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

async function getMyProjects() {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Failed to retrieve authenticated user");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      id: user.id,
    },
    select: {
      projectMembers: {
        select: {
          project: {
            select: {
              ...projectSelectForMyProjectCard,
            },
          },
        },
      },
    },
  });

  if (!profile) {
    throw new Error("Failed to retrieve profile");
  }

  return profile?.projectMembers.map((member) => member.project);
}
