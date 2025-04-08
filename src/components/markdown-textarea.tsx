import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Markdown } from "./markdown";

function MarkdownTextarea({
  className,
  value,
  onChange,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Tabs defaultValue="editor">
      <TabsList>
        <TabsTrigger value="editor">編集</TabsTrigger>
        <TabsTrigger value="preview">プレビュー</TabsTrigger>
      </TabsList>
      <TabsContent value="editor">
        <textarea
          data-slot="textarea"
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          value={value}
          onChange={onChange}
          {...props}
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className="p-2 border border-input rounded-md">
          <Markdown content={typeof value === "string" ? value : ""} />
        </div>
      </TabsContent>
    </Tabs>
  );
}

export { MarkdownTextarea };
