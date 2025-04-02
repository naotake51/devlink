import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/components/SignInForm";
import { Separator } from "@/components/ui/separator";
import { SignInWithGithub } from "@/components/SignInWithGithub";
import { SignInWithGmail } from "@/components/SignInWithGmail";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">ログイン</CardTitle>
          <CardDescription>
            アカウントにログインして続行してください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInWithGithub />
          <SignInWithGmail />
          <SeparatorWithLabel label="または" />
          <SignInForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            アカウントをお持ちでない方は
            <Link href="/sign-up" className="ml-1 text-primary hover:underline">
              新規登録
            </Link>
            してください。
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function SeparatorWithLabel({ label }: { label: string }) {
  return (
    <div className="relative my-4">
      <Separator />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-background px-2 text-xs uppercase text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}
