import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import "server-only";

/**
 * @private
 */
export default function RootPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-b from-primary/5 to-background">
        <Logo size="lg" className="mb-4" />
        <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-6">
          スキルも熱量も違う仲間がつながる、協業のはじまり
        </p>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            DevLinkは、開発者・デザイナー・プランナー・マーケターなど、
            <br className="hidden sm:block" />
            スキルや熱量に違いがある人たちが、初期段階から気軽に協業できる仕組みを提供するプラットフォームです。
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            初期開発から法人化前までをスコープとし、チーム形成・貢献管理・成果配分までを支援します
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium">
              プロジェクトを始める
            </Button>
            <Button size="lg" variant="outline" className="font-medium">
              詳しく見る
            </Button>
          </div>
        </div>
      </section>

      {/* 特徴と哲学セクション */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">特徴と哲学</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>気軽に始められる協業</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  大きな契約や取り決めは不要。共感ベースで参加できます。
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>貢献を正しく見える化する仕組み</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  DevPointで日々の貢献を記録し、プロジェクト内で共有・評価できます。
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>成果に応じたフェアな利益分配</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  DevPointの蓄積に応じて、成功時の取り分が自動的に決まる仕組みです。
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>貢献に応じた意思決定権の設計</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  DevPointの保有比率に応じて投票パワーが割り当てられ、株式転換合意のもとで公平なチーム運営と意思決定を実現します。
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>無理なく関われる柔軟な協業設計</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  熱量や役割が違っても、それぞれに合った関わり方ができます。必要なときに参加し、貢献分のDevPointを得て自然に離脱も可能です。
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>仲間同士で応援しあえる文化</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  相互紹介によって、開発者同士の認知と支援が自然に広がります。
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 主な機能セクション */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">主な機能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xl">
                  🚀
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    プロジェクト作成 & メンバー募集
                  </h3>
                  <p className="text-muted-foreground">
                    プロジェクトを立ち上げ、必要なスキルや役割を登録。公開または招待制でメンバーを募集できます。
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xl">
                  💎
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    DevPoint（貢献ポイント）
                  </h3>
                  <p className="text-muted-foreground">
                    毎月プロジェクトの段階に応じたDevPointを発行し、チーム内で貢献度に応じて分配。初期ほど多くのポイントが発行される「時間割引モデル」を採用しています。
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xl">
                  🗳️
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    意思決定ガバナンス
                  </h3>
                  <p className="text-muted-foreground">
                    重要な判断はDevPoint保有比率に応じた重み付き投票制を採用。過去の貢献がプロジェクトの方向性に反映される仕組みです。
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xl">
                  🤝
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    サポーター支援と貢献
                  </h3>
                  <p className="text-muted-foreground">
                    サーバー代やツール費用などを支援したメンバーにもDevPointを付与可能。技術以外の支援も貢献として評価します。
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xl">
                  🔄
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    相互プロモーション機能
                  </h3>
                  <p className="text-muted-foreground">
                    開発中・開発済みのプロジェクトを他のメンバーに紹介・応援できる機能。「おすすめプロジェクト」や「つながりのある作品」として掲載されます。
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xl">
                  📝
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    株式転換合意（必須）
                  </h3>
                  <p className="text-muted-foreground">
                    法人化・事業化時にDevPoint保有割合をもとに株式持分を協議。合意テンプレートは自動生成され、全メンバーの同意が必要です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DevPointの活用方法セクション */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            DevPointの活用方法
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left">用途</th>
                  <th className="py-4 px-6 text-left">内容</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">⏳ 分配</td>
                  <td className="py-4 px-6">
                    毎月の活動に応じたポイント配分（早期ほど多い）
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">📊 可視化</td>
                  <td className="py-4 px-6">
                    各メンバーの貢献量が記録・表示される
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">🗳️ 投票</td>
                  <td className="py-4 px-6">
                    意思決定時にDevPoint比率で重みづけ
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">💎 報酬</td>
                  <td className="py-4 px-6">
                    利益分配・株式配分の参考として活用可能
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">💬 信頼</td>
                  <td className="py-4 px-6">
                    長期に関わった証としての役割も持つ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DevLinkが描く新しい協業のかたちセクション */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            DevLinkが描く協業のかたち
          </h2>
          <div className="max-w-6xl mx-auto px-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl text-muted-foreground  text-center mb-2">
                  DevPointで貢献を管理、成功時には株式に変換
                </h3>
                <Image
                  src="/img/lp-comics/1.png"
                  alt="DevLinkのコンセプトコミック1"
                  width={1024}
                  height={1536}
                  className="rounded-lg shadow-xl border"
                />
              </div>
              <div>
                <h3 className="text-xl text-muted-foreground  text-center mb-2">
                  リスクとリターンのバランス
                </h3>
                <Image
                  src="/img/lp-comics/2.png"
                  alt="DevLinkのコンセプトコミック2"
                  width={1024}
                  height={1024}
                  className="rounded-lg shadow-xl border"
                />
              </div>
              <div>
                <h3 className="text-xl text-muted-foreground  text-center mb-2">
                  意思決定の透明性
                </h3>
                <Image
                  src="/img/lp-comics/3.png"
                  alt="DevLinkのコンセプトコミック3"
                  width={1024}
                  height={1024}
                  className="rounded-lg shadow-xl border"
                />
              </div>
              <div>
                <h3 className="text-xl text-muted-foreground  text-center mb-2">
                  貢献を記録しているのでいつでも離脱可能
                </h3>
                <Image
                  src="/img/lp-comics/4.png"
                  alt="DevLinkのコンセプトコミック4"
                  width={1024}
                  height={1024}
                  className="rounded-lg shadow-xl border"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">DevLinkを使ってみたい方へ</h2>
          <p className="text-xl mb-8">
            プロジェクトを立ち上げたい人、協業仲間を探している開発者・デザイナー、
            <br />
            応援したいプロジェクトに貢献したい人
          </p>
          <p className="text-2xl font-medium mb-10">
            DevLinkで、あなたの熱量をつなげてみませんか？
          </p>
          <Button
            size="lg"
            variant="outline"
            className="font-medium bg-white text-primary hover:bg-white/90"
          >
            今すぐ始める
          </Button>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 DevLink. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              利用規約
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              プライバシーポリシー
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
