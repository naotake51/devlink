import { getAuthUser } from "@/utils/data/auth";
import { getProjectMember } from "@/utils/data/project";
import "server-only";
import { TabNavigationPresentational } from "./presentational";

interface TabNavigationContainerProps {
  projectId: string;
}

/**
 * @package
 */
export async function TabNavigationContainer({
  projectId,
}: TabNavigationContainerProps) {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const projectMember = await getProjectMember(projectId, user.id);

  const basePath = `/projects/${projectId}`;

  const tabs =
    projectMember?.role === "OWNER"
      ? [
          { label: "概要", segment: "overview" },
          { label: "メンバー", segment: "members" },
          { label: "Dev Point", segment: "dev-point" },
          { label: "Sprint", segment: "sprints" },
          { label: "スレッド", segment: "threads" },
          { label: "決議", segment: "resolutions" },
          { label: "設定", segment: "settings" },
        ]
      : projectMember?.role === "MEMBER"
        ? [
            { label: "概要", segment: "overview" },
            { label: "メンバー", segment: "members" },
            { label: "Dev Point", segment: "dev-point" },
            { label: "Sprint", segment: "sprints" },
            { label: "スレッド", segment: "threads" },
            { label: "決議", segment: "resolutions" },
          ]
        : [
            { label: "概要", segment: "overview" },
            { label: "メンバー", segment: "members" },
            { label: "Dev Point", segment: "dev-point" },
            { label: "Sprint", segment: "sprints" },
            { label: "メッセージ", segment: "thread" },
          ];

  return <TabNavigationPresentational basePath={basePath} tabs={tabs} />;
}
