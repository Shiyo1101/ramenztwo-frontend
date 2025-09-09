import MarkdownIt from "markdown-it";
import Footer from "@/components/Base/Footer";
import Header from "@/components/Base/Header";
import TiptapEditor from "@/components/Document/TiptapEditor";

export default function Home() {
  const markdownContent = `
# チーム開発×データ分析に挑む3Daysハッカソン受付開始 

![PR TIMES HACKATHON]( https://prtimes.jp/api/file.php?t=origin&f=d112-1552-a6dd09c5580a91f669c7-0.jpg )

**プレスリリース配信サービス「PR TIMES」等を運営する株式会社PR TIMES（東京都港区、代表取締役：山口拓己、東証プライム：3922）は、2026・27年卒業予定のエンジニア志望学生*を対象に、「PR TIMES HACKATHON 2025 Summer」を開催します。**

**一次募集締切は2025年6月30日(月) 23:59まで、下記フォームより本日からエントリー受付を開始いたします。**

*大学、大学院、短期大学、専門学校、高等専門学校生が対象です。

👉 [エントリーはこちら](https://tayori.com/f/pth-2025summer-apply)

---

## 同世代エンジニアとつながり、チーム開発の経験を積める3日間

PR TIMESハッカソンは、2016年より開催している内定直結型のハッカソンイベントです。2025年9月8日〜10日の3日間でWebサービスの開発を行い、特に優秀な方には **年収500万円以上の中途採用基準での内定** をお出しします。

チームには当社エンジニアがメンターとして参加し、実務で扱う技術や働き方を学ぶ機会を提供します。

---

### 過去参加者からのコメント
- 初参加で不安もあったが、メンターの安心感があった
- 他の学生のレベルが非常に高く刺激になった
- チームで一つのものを作る経験が楽しかった

---

## 累計200万件超のデータ分析を通してWebサービスを開発

今回のテーマは **「プレスリリースを改善するためのレビュー機能を持ったWebサービスの開発」** です。  
PR TIMESの累計200万件超のプレスリリースデータをAPIとして提供します。

---

## 「PR TIMES HACKATHON 2025 Summer」スケジュール

- 開催日程：2025年9月8日(水)〜9月10日(金)
- 会場：PR TIMES本社（赤坂インターシティ）
- 遠方参加者には「交通費・宿泊費」を会社負担

![スケジュール]( https://prtimes.jp/api/file.php?t=origin&f=d112-1552-6624c21eaef68df195a7-0.jpg )

### オンライン事前説明会
8月上旬予定。会社概要や開発テーマの説明あり。参加できない方には録画を共有。

---

## 表彰内容

### 個人賞
- ハッカソンでの技術力や人事評価で選出
- 2026年/2027年卒の内定を付与
- 特に優秀者は「中途採用基準（年収500万円以上）」で内定

### チーム賞
- 技術力・コンセプト・完成度で評価
- 最優秀チームには選べる景品を授与

---

## 開催概要

| 項目 | 内容 |
|------|------|
| エントリー締め切り | 一次：2025/6/30(月) 23:59<br>二次：2025/7/31(木) 23:59 |
| 説明会 | 2025年8月上旬予定（録画共有あり） |
| 開催日時 | 1日目 2025/9/8（月）11:00〜19:00<br>2日目 2025/9/9（火）10:00〜19:00<br>3日目 2025/9/10（水）10:00〜17:00 |
| 開催場所 | PR TIMES本社（赤坂インターシティ8F） |
| 募集定員 | 30名 |
| 応募職種 | Webエンジニア |
| 応募条件 | - 2026 or 2027年卒予定の学生<br>- 就業経験なし(インターン除く)<br>- Web開発経験あり<br>- GitHubアカウント保有 |
| 参加費用 | 無料（交通費・宿泊費は会社負担） |

FAQ: [https://tayori.com/q/pth-2025summer-faq/](https://tayori.com/q/pth-2025summer-faq/)

---

## 申し込み方法

1. フォームより応募  
   👉 [https://tayori.com/f/pth-2025summer-apply](https://tayori.com/f/pth-2025summer-apply)  
   （GitHubやQiita, Zennなど技術アウトプットURL必須）

2. 事務局から参加確定・チャットツール招待

3. チャットツール参加で確定、説明会URL案内あり

---

## PR TIMES HACKATHON 2025 Summer 開催に向けて

**PR TIMES事業ユニット VPoE 第二開発部長 櫻井 慎也**

> 今回も全国から学生エンジニアが集まり、3日間でWebサービスを開発します。  
> 参加いただく皆さまに、新しい気づきや成長を持ち帰っていただけると信じています。

---

## 株式会社PR TIMESについて

ミッション： **「行動者発の情報が、人の心を揺さぶる時代へ」**

- プレスリリース配信サービス「PR TIMES」：利用企業数10万8000社以上
- 上場企業の61％超が利用
- メディア記者 2万7000人以上
- 月間約9000万PV
- 累計200万件超の配信実績

事業：PR TIMES STORY, PR TIMES TV, MARPH, Jooto, Tayori など

会社概要はこちら → [https://prtimes.co.jp/](https://prtimes.co.jp/)

---
`;

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  const htmlContent = md.render(markdownContent);

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 px-10 py-5">
      <Header />
      <main>
        <TiptapEditor initialContent={htmlContent} />
      </main>
      <Footer />
    </div>
  );
}
