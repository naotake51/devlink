import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import "server-only";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">アカウント作成</CardTitle>
          <CardDescription>
            以下の情報を入力して新しいアカウントを作成してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            すでにアカウントをお持ちの方は
            <Link href="/sign-in" className="ml-1 text-primary hover:underline">
              ログイン
            </Link>
            してください。
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
