import type { EditorIssue, HeadingOption } from "@/types/editor";

export const HEADING_OPTIONS: HeadingOption[] = [
  { label: "標準テキスト", value: 0, fontSize: "11px" },
  { label: "タイトル", value: 1, fontSize: "26px" },
  { label: "サブタイトル", value: 2, fontSize: "15px" },
  { label: "見出し 1", value: 3, fontSize: "20px" },
  { label: "見出し 2", value: 4, fontSize: "18px" },
  { label: "見出し 3", value: 5, fontSize: "16px" },
  { label: "見出し 4", value: 6, fontSize: "14px" },
];

// テスト用の指摘データ（実際の実装では外部から取得）
export const MOCK_ISSUES: EditorIssue[] = [
  {
    id: 1,
    type: "誤字脱字",
    message: "「サンプルテキスト」が「サンブルテキスト」と誤記されています。",
    position: { start: 3, end: 15 },
    suggestion: "サンプルテキスト",
  },
  {
    id: 2,
    type: "表記ゆれ",
    message: "「メール」と「Eメール」が混在しています。",
    position: { start: 20, end: 28 },
    suggestion: "どちらかに統一しましょう（例: メール）",
  },
  {
    id: 3,
    type: "冗長表現",
    message: "「まず最初に」は冗長です。",
    position: { start: 12, end: 30 },
    suggestion: "「最初に」",
  },
  {
    id: 4,
    type: "文法",
    message: "助詞の使い方が不自然です。「を」と「に」の混同。",
    position: { start: 18, end: 25 },
    suggestion: "「を」を「に」に修正",
  },
];
