# ramenztwo-frontend

PRTimes Hackathon Summer

## 必要な事前準備

以下のツールを事前にインストールしてください：

1. **Node.js**

   - 推奨バージョン: 最新の LTS 版
   - [Node.js 公式サイト](https://nodejs.org/)

## 環境構築手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/Shiyo1101/ramenztwo-frontend.git
cd ramenztwo-frontend
```

### 2. 必要なパッケージのインストール

プロジェクトディレクトリ直下で以下を実行

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

### 4. 環境変数の設定

```bash
cp ./.env.sample .env
```

コピー後、以下のように環境変数を設定してください。

```bash
API_URL="https://*******"
```

### 5. APIの型生成

バックエンドサーバを起動し、以下のコマンドを実行します。

```bash
npm run codegen:dev
```

## その他コマンド

### 1. リント(Linter)

```bash
npm run lint
```

### 2. フォーマット

```bash
npm run format
```
