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
        <CardContent>
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
