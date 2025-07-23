import "server-only";
import { type ProjectCardPropsProject, ProjectCard } from "./project-card";

interface ProjectCardListProps {
  projects: ProjectCardPropsProject[];
}

export function ProjectCardList({ projects }: ProjectCardListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
