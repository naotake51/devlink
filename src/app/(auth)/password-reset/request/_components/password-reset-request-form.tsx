"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendHorizonalIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { requestPasswordReset } from "../../actions";
import { passwordResetRequestSchema } from "../../schema";

export function PasswordResetRequestForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { execute, status } = useAction(requestPasswordReset, {
    onSuccess: ({ data }) => {
      if (data?.failure) {
        setMessage(data.failure);
        setIsSuccess(false);
      } else if (data?.success) {
        setMessage(data.success);
        setIsSuccess(true);
      }
    },
    onError: ({ error }) => {
      if (error.serverError) {
        setMessage("システムエラー");
      } else if (error.validationErrors) {
        setMessage("入力内容を確認してください。");
      }
      setIsSuccess(false);
    },
  });

  const form = useForm<z.infer<typeof passwordResetRequestSchema>>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof passwordResetRequestSchema>,
  ) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {message && (
          <div className={isSuccess ? "text-green-600" : "text-destructive"}>
            {message}
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={status === "executing" || isSuccess}
        >
          パスワードリセットメールを送信
          {status === "executing" ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <SendHorizonalIcon />
          )}
        </Button>
        <div className="text-center mt-4">
          <Link
            href="/sign-in"
            className="text-sm text-primary hover:underline"
          >
            サインインに戻る
          </Link>
        </div>
      </form>
    </Form>
  );
}
