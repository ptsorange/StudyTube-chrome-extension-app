![StudyTube Logo](./public/icon/128.png)
# StudyTube<br/>(remove-youtube-contents-app)

YouTubeの誘惑的なコンテンツ（おすすめ動画、サイドバーなど）を非表示にし、学習や作業に集中するためのブラウザ拡張機能です。

## 機能

- **トップページの置換**: YouTubeのトップページをシンプルな検索画面に置き換えます。誘惑的なサムネイルやおすすめ動画は表示されません。
- **不要な要素の削除**: 動画再生ページなどで、サイドバーやガイドボタンなどの集中を阻害する要素を自動的に削除します。
- **検索機能**: シンプルな検索バーから動画を検索できます。

## 技術スタック

- [WXT](https://wxt.dev/) - Next-gen Web Extension Framework
- React
- TypeScript

## 開発の始め方

### 前提条件

- Node.js
- pnpm

### インストール

```bash
pnpm install
```

### 開発サーバーの起動 (Chrome)

```bash
pnpm dev
```

### 開発サーバーの起動 (Firefox)

```bash
pnpm dev:firefox
```

## ビルド

本番用にビルドするには以下のコマンドを実行します。

```bash
pnpm build
```

ビルド成果物は `.output/` ディレクトリに出力されます。

## インストール方法 (開発者モード)

1. Chromeで `chrome://extensions/` を開きます。
2. 右上の「デベロッパーモード」をオンにします。
3. 「パッケージ化されていない拡張機能を読み込む」をクリックし、`.output/chrome-mv3` フォルダ（ビルド後）を選択します。