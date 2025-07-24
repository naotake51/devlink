import { ErrorMessage } from "@/components/error-message";
import { verifyAuthUser } from "@/utils/data/auth";
import { getProjectMember } from "@/utils/data/project";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectResolutionsProps {
  params: Promise<{ id: string }>;
}

/**
 * @private
 */
export default async function ProjectResolutions({
  params,
}: ProjectResolutionsProps) {
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

  return <div className="space-y-4 py-2">決議</div>;
}
