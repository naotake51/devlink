"use client";

import { signup } from "@/app/sign-up/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/app/sign-up/schema";
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

export function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    await signup(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                パスワードは8文字以上で、大文字、小文字、数字、特殊文字を含める必要があります
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          登録する
        </Button>
      </form>
    </Form>
  );
}
