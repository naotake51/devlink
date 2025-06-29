"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { MarkdownTextarea } from "@/components/markdown-textarea";
import { Button } from "@/components/ui/button";
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
import { LoaderIcon, SaveIcon } from "lucide-react";
import { updateProject } from "../actions";
import { EditProjectSchema, type EditProjectInput } from "../schema";

interface EditProjectFormProps {
  project: {
    id: string;
    title: string;
    startDate: Date;
    serviceDescription: string;
    techStackDescription: string;
  };
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const form = useForm<EditProjectInput>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      id: project.id,
      title: project.title,
      startDate: project.startDate,
      serviceDescription: project.serviceDescription,
      techStackDescription: project.techStackDescription,
    },
  });

  const { execute, status } = useAction(updateProject, {
    onSuccess: () => {
      toast.success("プロジェクトが正常に更新されました！");
    },
    onError: ({ error }) => {
      console.error("Project creation error:", error);
      const serverErrMsg = error.serverError;
      const validationErrMsg = error.validationErrors
        ? JSON.stringify(error.validationErrors)
        : null;
      toast.error(
        `プロジェクトの更新に失敗しました: ${serverErrMsg || validationErrMsg || "不明なエラー"}`,
      );
    },
  });

  function onSubmit(values: EditProjectInput) {
    execute(values);
  }

  const isLoading = status === "executing";

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>プロジェクト編集</CardTitle>
        <Button
          type="submit"
          form="new-project-form"
          disabled={isLoading || !form.formState.isDirty}
        >
          更新
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
              name="serviceDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>サービス概要</FormLabel>
                  <FormControl>
                    <MarkdownTextarea
                      placeholder="プロジェクトの簡単な説明を入力してください（Markdown）"
                      className="resize-none min-h-96"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="techStackDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>技術スタック</FormLabel>
                  <FormControl>
                    <MarkdownTextarea
                      placeholder="プロジェクトで使用する技術スタックの説明を入力してください（Markdown）"
                      className="resize-none min-h-96"
                      {...field}
                      value={field.value ?? ""}
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
