import { getProject } from "@/utils/data/project";
import { EditProjectForm } from "./edit-project-form";

interface EditProjectProps {
  projectId: string;
}

export async function EditProject({ projectId }: EditProjectProps) {
  const project = await getProject(projectId);
  if (!project) {
    return <div>プロジェクトが見つかりません。</div>;
  }

  return <EditProjectForm project={project} />;
}
