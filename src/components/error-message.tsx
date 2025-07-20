"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

const errors = {
  400: {
    title: "パラメータエラー",
    description:
      "リクエストのパラメータに誤りがあります。URL、入力内容をご確認ください。",
    illustration: "⚠️",
  },
  403: {
    title: "アクセスが拒否されました",
    description: "このページにアクセスする権限がありません。",
    illustration: "🚫",
  },
  404: {
    title: "リソースが見つかりません",
    description: "お探しのリソースは存在しないか、削除された可能性があります。",
    illustration: "🔍",
  },
  500: {
    title: "サーバーエラーが発生しました",
    description:
      "申し訳ございません。サーバーで問題が発生しています。しばらく時間をおいてから再度お試しください。",
    illustration: "⚠️",
  },
} as const;

interface ErrorMessageProps {
  code: keyof typeof errors;
  title?: string;
  description?: string;
  illustration?: string | React.ReactNode;
}

export function ErrorMessage({
  code,
  title,
  description,
  illustration,
}: ErrorMessageProps) {
  const error = errors[code];

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Card>
      <CardContent className="p-12 text-center space-y-8">
        <div className="space-y-4">
          <div className="text-8xl font-bold text-slate-300 select-none">
            {code}
          </div>
          <div className="text-6xl" role="img" aria-label="Error illustration">
            {illustration ?? error.illustration}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-800">
            {title ?? error.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
            {description ?? error.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button asChild size="lg" variant="outline">
            <Link href="/my">
              <Home className="w-4 h-4 mr-2" />
              ホームに戻る
            </Link>
          </Button>

          <Button variant="outline" size="lg" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            前のページ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
