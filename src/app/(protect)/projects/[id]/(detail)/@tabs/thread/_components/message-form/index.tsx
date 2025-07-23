"use client";

import { MarkdownTextarea } from "@/components/markdown-textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendMessage } from "./actions";
import { messageFormSchema, type MessageFormInput } from "./schema";

interface MessageFormProps {
  projectId: string;
  threadProfileId: string;
}

export function MessageForm({ projectId, threadProfileId }: MessageFormProps) {
  const router = useRouter();

  const form = useForm<MessageFormInput>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const { execute, status } = useAction(sendMessage, {
    onSuccess: () => {
      toast.success("メッセージを送信しました！");
      form.reset();
      router.refresh();
    },
    onError: ({ error }) => {
      console.error("Message send error:", error);
      const serverErrMsg = error.serverError;
      const validationErrMsg = error.validationErrors
        ? JSON.stringify(error.validationErrors)
        : null;
      toast.error(
        `メッセージの送信に失敗しました: ${serverErrMsg || validationErrMsg || "不明なエラー"}`,
      );
    },
  });

  function onSubmit(values: MessageFormInput) {
    execute({
      ...values,
      projectId,
      threadProfileId,
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
                <FormControl>
                  <MarkdownTextarea
                    placeholder="メッセージ（Markdown）"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <SendIcon className="h-4 w-4" />
              {isLoading ? (
                <>
                  送信中...
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                </>
              ) : (
                "送信"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
