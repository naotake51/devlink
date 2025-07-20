"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteProject } from "./actions"; // Correct relative path to actions.ts

const DeleteProjectSchema = z.object({
  confirm: z.literal("削除" as string),
});

type DeleteProjectInput = z.infer<typeof DeleteProjectSchema>;

interface MyProjectSettingProps {
  projectId: string;
}

export function ProjectDeleteModal({ projectId }: MyProjectSettingProps) {
  const form = useForm<DeleteProjectInput>({
    resolver: zodResolver(DeleteProjectSchema),
    defaultValues: {
      confirm: "",
    },
  });

  const { execute, status } = useAction(deleteProject, {
    onSuccess: () => {
      toast.success("プロジェクトが削除されました！");
    },
    onError: ({ error }) => {
      console.error("Project delete error:", error);
      const serverErrMsg = error.serverError;
      const validationErrMsg = error.validationErrors
        ? JSON.stringify(error.validationErrors)
        : null;
      toast.error(
        `プロジェクトの削除に失敗しました: ${serverErrMsg || validationErrMsg || "不明なエラー"}`,
      );
    },
  });

  function onSubmit() {
    execute({ projectId });
  }

  const isLoading = status === "executing";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">プロジェクトを削除</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>プロジェクトを削除</DialogTitle>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form id="delete-project-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>「削除」と正確に入力してください</FormLabel>
                  <FormControl>
                    <Input placeholder="削除" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="submit"
            form="delete-project-form"
            disabled={isLoading || !form.formState.isValid}
          >
            削除
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
