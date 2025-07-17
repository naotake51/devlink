import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import * as React from "react";
import { toast } from "sonner";
import { Markdown } from "../markdown";
import { uploadFiles } from "./actions";

const MAX_UPLOAD_FILE_COUNT = 10;
const MAX_FILE_SIZE_MB = 10;

export function MarkdownTextarea({
  className,
  value,
  onChange,
  ...props
}: React.ComponentProps<"textarea">) {
  async function onDrop(event: React.DragEvent<HTMLTextAreaElement>) {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);

    // validation files
    if (files.length === 0) {
      return;
    }
    if (files.length >= MAX_UPLOAD_FILE_COUNT) {
      toast.error(
        `ファイルは一度に${MAX_UPLOAD_FILE_COUNT}つまでしかアップロードできません。`,
      );
      return;
    }

    const hasInvalidSizeFile = files.some(
      (file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024,
    );
    if (hasInvalidSizeFile) {
      toast.error(`ファイルサイズは${MAX_FILE_SIZE_MB}MB以下にしてください。`);
      return;
    }

    // upload files
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const response = await uploadFiles(formData);

    if (response.validationErrors) {
      console.error("Validation errors:", response.validationErrors);
      toast.error("ファイルのアップロードに失敗しました: 不正なパラメータ");
      return;
    }

    if (response.serverError) {
      console.error("Server error:", response.serverError);
      toast.error("ファイルのアップロードに失敗しました: システムエラー");
      return;
    }

    // insert markdown
    if (response.data && onChange) {
      const markdown = response.data.result
        .map((file) =>
          file.fileType.startsWith("image/")
            ? `![${file.fileName}](${file.publicUrl})\n`
            : `[${file.fileName}](${file.publicUrl})\n`,
        )
        .join("");
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const oldValue = typeof value === "string" ? value : "";
      const newValue =
        oldValue.slice(0, start) + markdown + oldValue.slice(end);

      onChange({
        target: { value: newValue } as HTMLTextAreaElement,
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }

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
          onDrop={onDrop}
          {...props}
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className={cn("p-2 border border-input rounded-md", className)}>
          <Markdown content={typeof value === "string" ? value : ""} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
