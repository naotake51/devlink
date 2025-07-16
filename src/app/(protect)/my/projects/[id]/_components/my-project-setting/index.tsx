import { ProjectDeleteModal } from "./project-delete-modal";

interface MyProjectSettingProps {
  projectId: string;
}

export function MyProjectSetting({ projectId }: MyProjectSettingProps) {
  return (
    <div className="space-y-4 py-2">
      <ProjectDeleteModal projectId={projectId} />
    </div>
  );
}
