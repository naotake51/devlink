import { ErrorMessage } from "@/components/error-message";
import { z } from "zod";
import { ProjectDeleteModal } from "./_components/project-delete-modal";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface MyProjectSettingsProps {
  params: Promise<{ id: string }>;
}

export default async function MyProjectSettings({
  params,
}: MyProjectSettingsProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  return (
    <div className="space-y-4 py-2">
      <ProjectDeleteModal projectId={id} />
    </div>
  );
}
