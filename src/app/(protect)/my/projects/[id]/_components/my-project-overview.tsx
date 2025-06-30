import { Markdown } from "@/components/markdown";
import { MarkdownIndexes } from "@/components/markdown-indexes";
import "server-only";

interface MyProjectOverviewProps {
  content: string;
}

export function MyProjectOverview({ content }: MyProjectOverviewProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Markdown content={content} />
      </div>
      <div className="max-w-[250px] hidden lg:block">
        <div className="sticky top-6">
          <MarkdownIndexes content={content} />
        </div>
      </div>
    </div>
  );
}
