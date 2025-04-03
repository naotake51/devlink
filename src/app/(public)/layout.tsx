import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <a href="/sign-in">ログイン</a>
          </Button>
          <Button asChild>
            <a href="/sign-up">新規登録</a>
          </Button>
        </div>
      </Header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
