/** @format */

import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import Navbar from "@/shared/ui/Navibar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MoMuk | 오늘 뭐 먹지?",
    template: "%s | MoMuk",
  },
  description:
    "매일 반복되는 메뉴 고민, MoMuk에서 쉽고 재미있게 해결하세요! 음식 월드컵, 룰렛, 사다리 게임으로 메뉴를 추천해 드립니다.",
  keywords: [
    "음식 추천",
    "메뉴 추천",
    "점심 메뉴",
    "점메추",
    "저녁 메뉴",
    "저메추",
    "뭐먹지",
    "음식 월드컵",
    "메뉴 룰렛",
    "메뉴 사다리 게임",
    "메뉴 고르기",
    "모먹",
  ],
  creator: "MJ",
  openGraph: {
    title: "오늘 뭐 먹지?",
    description: "점메추 저메추 해드립니다!",
    url: "https://momuk.space",
    siteName: "MoMuk",
    images: [
      {
        url: "/food.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 구글 애드센스 심사/연결 코드 */}
        <Script
          id="adsense-connect"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 구글 애널리틱스 연결 코드 */}
        <Script
          id="google-analytics-gtag"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics-inline" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
