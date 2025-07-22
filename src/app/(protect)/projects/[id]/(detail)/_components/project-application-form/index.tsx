"use client";

import { MarkdownTextarea } from "@/components/markdown-textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { submitApplication } from "../project-application-form-actions";
import {
  ProjectApplicationSchema,
  type ProjectApplicationInput,
} from "../project-application-form-schema";
import { messageTemplate } from "./message-template";

interface ProjectApplicationFormProps {
  project: {
    id: string;
  };
  onSuccess?: () => void;
}

export function ProjectApplicationForm({
  project,
  onSuccess,
}: ProjectApplicationFormProps) {
  const form = useForm<ProjectApplicationInput>({
    resolver: zodResolver(ProjectApplicationSchema),
    defaultValues: {
      message: messageTemplate,
    },
  });

  const { execute, status } = useAction(submitApplication, {
    onSuccess: () => {
      toast.success("プロジェクトに応募しました！");
      form.reset();
      onSuccess?.();
    },
    onError: ({ error }) => {
      console.error("Application submission error:", error);
      const serverErrMsg = error.serverError;
      const validationErrMsg = error.validationErrors
        ? JSON.stringify(error.validationErrors)
        : null;
      toast.error(
        `応募に失敗しました: ${serverErrMsg || validationErrMsg || "不明なエラー"}`,
      );
    },
  });

  function onSubmit(values: ProjectApplicationInput) {
    execute({
      ...values,
      projectId: project.id,
    });
  }

  const isLoading = status === "executing";

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メッセージ</FormLabel>
                <FormControl>
                  <MarkdownTextarea
                    placeholder="応募した理由や自分のスキル・経験、関われそうなことを入力してください（Markdown）"
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                送信中...
                <LoaderIcon className="animate-spin" />
              </>
            ) : (
              <>
                応募する
                <SendIcon />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
