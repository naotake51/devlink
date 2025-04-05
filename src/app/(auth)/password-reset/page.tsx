import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "server-only";
import { PasswordResetForm } from "./_components/password-reset-form";

/**
 * @private
 */
export default function PasswordResetPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              新しいパスワードの設定
            </CardTitle>
            <CardDescription>
              新しいパスワードを入力してください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordResetForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
