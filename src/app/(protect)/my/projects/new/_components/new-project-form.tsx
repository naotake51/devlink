"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming Textarea component exists
import { SaveIcon } from "lucide-react";
import { createProject } from "../actions";
import { NewProjectSchema, type NewProjectInput } from "../schema";

export function NewProjectForm() {
  const form = useForm<NewProjectInput>({
    resolver: zodResolver(NewProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { execute, status } = useAction(createProject, {
    onSuccess: () => {
      toast.success("プロジェクトが正常に作成されました！");
      form.reset();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>説明</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="プロジェクトの簡単な説明を入力してください"
                  className="resize-none min-h-96"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "作成中..." : "プロジェクトを作成"}
          <SaveIcon />
        </Button>
      </form>
    </Form>
  );
}
