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
import { LoaderIcon, SaveIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPassword } from "../actions";
import { passwordResetSchema } from "../schema";

export function PasswordResetForm() {
  const [message, setMessage] = useState<string | null>(null);

  const { execute, status } = useAction(resetPassword, {
    onSuccess: ({ data }) => {
      if (data?.failure) {
        setMessage(data.failure);
      }
    },
    onError: ({ error }) => {
      if (error.serverError) {
        setMessage("システムエラー");
      } else if (error.validationErrors) {
        setMessage("入力内容を確認してください。");
      }
    },
  });

  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordResetSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {message && <div className="text-destructive">{message}</div>}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>新しいパスワード</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード（確認）</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={status === "executing"}
        >
          パスワードを変更
          {status === "executing" ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <SaveIcon />
          )}
        </Button>
      </form>
    </Form>
  );
}
