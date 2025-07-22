import { ErrorMessage } from "@/components/error-message";
import { Markdown } from "@/components/markdown";
import { MarkdownIndexes } from "@/components/markdown-indexes";
import { getProject } from "@/utils/data/project";
import "server-only";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectOverviewProps {
  params: Promise<{ id: string }>;
}

/**
 * @private
 */
export default async function ProjectOverview({
  params,
}: ProjectOverviewProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const project = await getProject(id);
  if (!project) {
    return <ErrorMessage code={404} />;
  }

  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Markdown content={project.description} />
      </div>
      <div className="w-[250px] hidden lg:block">
        <div className="sticky top-6">
          <MarkdownIndexes content={project.description} />
        </div>
      </div>
    </div>
  );
}
