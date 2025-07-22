import { ErrorMessage } from "@/components/error-message";
import { getAuthUser } from "@/utils/data/auth";
import { getProjectMember } from "@/utils/data/project";
import "server-only";
import { z } from "zod";
import { ProjectDeleteModal } from "./_components/project-delete-modal";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectSettingsProps {
  params: Promise<{ id: string }>;
}

/**
 * @private
 */
export default async function ProjectSettings({
  params,
}: ProjectSettingsProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const user = await getAuthUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const projectMember = await getProjectMember(id, user.id);
  if (projectMember?.role !== "OWNER") {
    return <ErrorMessage code={403} />;
  }

  return (
    <div className="space-y-4 py-2">
      <ProjectDeleteModal projectId={id} />
    </div>
  );
}
