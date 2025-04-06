import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { unstable_ViewTransition as ViewTransition } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * @private
 */
export const metadata: Metadata = {
  title: "DevLink - 開発者とデザイナーがつながる、協業のはじまり",
  description:
    "DevLinkは、個人開発者・デザイナー・プランナーが初期段階から気軽にチームを組んで協業できるプラットフォームです。",
};

/**
 * @private
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  );
}
