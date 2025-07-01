"use client";

import { MarkdownTextarea } from "@/components/markdown-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { submitApplication } from "../actions";
import {
  ProjectApplicationSchema,
  type ProjectApplicationInput,
} from "../schema";

interface ProjectApplicationFormProps {
  project: {
    id: string;
    title: string;
  };
}

export function ProjectApplicationForm({
  project,
}: ProjectApplicationFormProps) {
  const form = useForm<ProjectApplicationInput>({
    resolver: zodResolver(ProjectApplicationSchema),
    defaultValues: {
      message: "",
    },
  });

  const { execute, status } = useAction(submitApplication, {
    onSuccess: () => {
      toast.success("プロジェクトに応募しました！");
      form.reset();
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
    <Card>
      <CardHeader>
        <CardTitle>プロジェクトに応募する</CardTitle>
        <p className="text-sm text-muted-foreground">{project.title}</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>応募メッセージ</FormLabel>
                  <FormControl>
                    <MarkdownTextarea
                      placeholder="応募理由や自己PRなどのメッセージを入力してください（Markdown）"
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
      </CardContent>
    </Card>
  );
}
