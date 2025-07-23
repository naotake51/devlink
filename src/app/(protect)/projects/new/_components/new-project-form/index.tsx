"use client";

import { MarkdownTextarea } from "@/components/markdown-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateInput } from "@/components/ui/date-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { today } from "@/lib/date-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SaveIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createProject } from "../../actions";
import { NewProjectSchema, type NewProjectInput } from "../../schema";
import { descriptionTemplate } from "./description-template";

export function NewProjectForm() {
  const form = useForm<NewProjectInput>({
    resolver: zodResolver(NewProjectSchema),
    defaultValues: {
      title: "",
      startDate: today(),
      description: descriptionTemplate,
    },
  });

  const { execute, status } = useAction(createProject, {
    onSuccess: () => {
      toast.success("プロジェクトが正常に作成されました！");
    },
    onError: ({ error }) => {
      console.error("Project creation error:", error);
      const serverErrMsg = error.serverError;
      const validationErrMsg = error.validationErrors
        ? JSON.stringify(error.validationErrors)
        : null;
      toast.error(
        `プロジェクトの作成に失敗しました: ${serverErrMsg || validationErrMsg || "不明なエラー"}`,
      );
    },
  });

  function onSubmit(values: NewProjectInput) {
    execute(values);
  }

  const isLoading = status === "executing";

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>新しいプロジェクト</CardTitle>
        <Button type="submit" form="new-project-form" disabled={isLoading}>
          作成
          {isLoading ? <LoaderIcon className="animate-spin" /> : <SaveIcon />}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            id="new-project-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="例: 新しいWebアプリ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>開始日</FormLabel>
                  <FormControl>
                    <DateInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>概要</FormLabel>
                  <FormControl>
                    <MarkdownTextarea
                      placeholder="開発しているサービスの概要、技術スタック、求める人材などを入力してください（Markdown）"
                      className="resize-none min-h-96"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
