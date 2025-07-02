import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileTextIcon } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";

export function MarkdownIndexes({ content }: { content: string }) {
  return (
    <Card className="shadow-none rounded-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          目次
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ReactMarkdown allowedElements={["h1", "h2"]} components={components}>
          {content}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
}

const components: Components = {
  h1: ({ children }) => {
    const id = encodeURIComponent(children?.toString() ?? "");
    return (
      <Button
        variant="ghost"
        asChild
        className="justify-start h-auto p-2 text-left hover:bg-muted/50 w-full font-semibold whitespace-pre-line"
      >
        <a href={"#" + id}>{children}</a>
      </Button>
    );
  },
  h2: ({ children }) => {
    const id = encodeURIComponent(children?.toString() ?? "");
    return (
      <Button
        variant="ghost"
        asChild
        className="justify-start h-auto p-2 text-left hover:bg-muted/50 w-full pl-6 text-muted-foreground whitespace-pre-line"
      >
        <a href={"#" + id}>{children}</a>
      </Button>
    );
  },
};
