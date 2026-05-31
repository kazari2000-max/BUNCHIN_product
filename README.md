# BUNCHIN — Product Page (Next.js App Router)

事業協力者・開発メンバー向けの、BUNCHIN プロダクト＆事業概観 1ページサイト。
BUNCHIN デザインシステム（High Contrast Terminal / Pixel Companion / Paperweight Anchor）をそのまま適用しています。

## スタック
- **Next.js 16 (App Router)** / React 19
- Node.js **20.9.0 以上**
- プレーン JavaScript（`.jsx`）— TypeScript なしでそのままビルド可
- スタイルは各コンポーネント内のインラインスタイル + `app/globals.css`（デザイントークン）

## ローカル起動
```bash
npm install
npm run dev      # http://localhost:3000
```

## ビルド / 本番
```bash
npm run build
npm run start
```

## デプロイ（Cloudflare Pages）
このページはSSR/APIなしの静的サイトとして書き出せるため、Cloudflare Pagesでは以下を選択します。

- Framework preset: **Next.js (Static HTML Export)**
- Build command: `npx next build`
- Build output directory: `out`
- Root directory: 未指定（リポジトリルート）
- Production branch: `main`

`next.config.mjs` で `output: "export"` を有効化しているため、`npm run build` 後に `out/` が生成されます。

## デプロイ（Vercel）
1. このリポジトリを GitHub に push
2. [vercel.com](https://vercel.com) で New Project → リポジトリを import
3. Framework Preset が Next.js として検出されていることを確認 → Deploy

## 構成
```
/
  app/
    layout.jsx        メタ情報・フォント読み込み（JetBrains Mono は Google Fonts、他は self-host）
    page.jsx          1ページの構成（セクションを順に並べる）
    globals.css       デザイントークン（色・フォント・@font-face）
  components/
    ui.jsx            Section / SectionHead / Tag / Panel ＋ BunchinSound（3+1 SE 再生）
    PixelFace.jsx     実機のピクセル顔（丸LEDドット・横長楕円・発話時リップシンク）"use client"
    Hero.jsx          TopBar（SOUND ON/OFF）/ Hero / HeroDevice  "use client"
    Demo.jsx          インタラクティブ実機デモ（声かけ→見守り→立て直し→完走→振り返り）"use client"
    Product.jsx       名前の意味(7要素) / 課題 / 体験ループ / である・でない
    Business.jsx      現在地 / なぜ物理 / Founders Beta（機能3階層）
    Plan.jsx          検証KPI / 規律 / ロードマップ / クロージング
  public/
    audio/            デモSE 4種（tap_start / session_start / recovery / complete）
    fonts/            DenkiChip（ロゴ＆LCD）, GenEi M Gothic 2（本文・見出し）
```

## サウンドについて
- ブラウザの自動再生ポリシーに従い、**音は最初のユーザー操作（右上 SOUND ON）で有効化**されます。
- SE はデモ操作のビートに同期：タップ開始相当=`tap_start`、開始発話=`session_start`、立て直し=`recovery`、完走=`complete`。
- 既定はミュート。`SOUND ON` で有効・初回プリロード。

## 預かり事項（実装にあたっての注記）
- **声かけ／振り返りの文面**は仮テキスト。別途設計予定（コード内コメントに明示）。
- **体感の値**（集中の作業中↔小休止のヒステリシス秒数、呼吸・瞬きレート、LEDの満ちる粒度）は
  デモ用の仮レート。実機プロトタイプで詰める対象（コード内 `TBD` コメント）。
- **立て直しの色**はデザインシステムの Reset Coral ではなく、本仕様の「赤を使わず琥珀＝休息」に従い
  アンバー（`#FFC24D`）。`PixelFace` に `color` override を渡して実現（デザインシステム側の既定は不変）。

## デザインシステムとの関係
このアプリは親プロジェクトの BUNCHIN デザインシステムを実体化したもの。トークンは `app/globals.css`、
ピクセル顔は `components/PixelFace.jsx` に同梱（デザインシステムの `ui_kits/device/PixelFace.jsx` と同一系統）。
