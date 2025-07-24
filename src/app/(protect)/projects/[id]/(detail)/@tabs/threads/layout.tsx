import { ErrorMessage } from "@/components/error-message";
import { verifyAuthUser } from "@/utils/data/auth";
import { getProjectMember } from "@/utils/data/project";
import { getLatestMessages, getThreads } from "@/utils/data/thread";
import "server-only";
import { z } from "zod";
import { ThreadList } from "./_components/thread-list";
import { TwoColumnsLayout } from "./_components/two-columns-layout";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectThreadListProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export default async function ProjectThreadsLayout({
  params,
  children,
}: ProjectThreadListProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const user = await verifyAuthUser();

  const projectMember = await getProjectMember(id, user.id);
  if (!projectMember) {
    return <ErrorMessage code={403} />;
  }

  const threads = await getThreads(id);
  const latestMessages = await getLatestMessages(threads.map((t) => t.id));

  const threadsWithMessages = threads.map((thread) => {
    return {
      ...thread,
      latestMessage: latestMessages[thread.id] || null,
      href: `/projects/${id}/threads/${thread.id}`,
    };
  });

  return (
    <div className="space-y-4 py-2">
      <TwoColumnsLayout
        left={<ThreadList threads={threadsWithMessages} />}
        right={children}
      />
    </div>
  );
}
