import { PasswordResetRequestForm } from "./_components/password-reset-request-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PasswordResetRequestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              パスワードリセット
            </CardTitle>
            <CardDescription>
              登録したメールアドレスを入力してください。パスワードリセット用のリンクを送信します。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordResetRequestForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
