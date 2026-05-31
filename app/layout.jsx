import "./globals.css";

export const metadata = {
  title: "BUNCHIN · プロダクト概観",
  description:
    "未来のわたしが、机の上にいる。机の上のAIが努力時間に同席する物理アンカー、BUNCHIN。事業協力者・開発メンバー向けの製品＆事業概観。",
  openGraph: {
    title: "BUNCHIN · プロダクト概観",
    description: "机の上のAIが、あなたの努力時間に同席する。",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
