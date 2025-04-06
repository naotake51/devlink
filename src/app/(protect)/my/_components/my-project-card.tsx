import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";
import "server-only";

export const MY_PROJECT_CARD_FIELDS = `
  id,
  title,
  description,
  created_at,
  profile:profiles (
    id,
    display_name,
    avatar_url
  )
`;

/**
 * @package
 */
export interface MyProjectCardPropsProject {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  profile: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
}

interface MyProjectCardProps {
  project: MyProjectCardPropsProject;
}

/**
 * @package
 */
export function MyProjectCard({ project }: MyProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          {new Date(project.created_at).toLocaleDateString("ja-JP")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
            {project.profile.avatar_url ? (
              <Image
                src={project.profile.avatar_url}
                alt={project.profile.display_name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-gray-500" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">
              {project.profile.display_name}
            </p>
          </div>
        </div>
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          詳細を見る
        </Button>
      </CardFooter>
    </Card>
  );
}
