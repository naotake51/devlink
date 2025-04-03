"use client";

import { signIn } from "../actions";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "../schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export function SignInForm() {
  const [message, setMessage] = useState<string | null>(null);

  const { execute, status } = useAction(signIn, {
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

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {message && <div className="text-destructive">{message}</div>}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>パスワード</FormLabel>
                <Link
                  href="/password-reset/request"
                  className="text-sm text-primary hover:underline"
                >
                  パスワードをお忘れですか？
                </Link>
              </div>
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
          {status === "executing" ? "ログイン中..." : "ログイン"}
        </Button>
      </form>
    </Form>
  );
}
