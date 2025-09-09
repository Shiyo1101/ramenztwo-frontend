"use client";

import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Toolbar from "../Base/Toolbar";

const TiptapEditor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "focus:outline-none px-16 print:border-0 border bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        heading: {
          levels: [1, 2, 3, 4, 5, 6], // 見出しレベルを有効化
        },
      }),
      BulletList,
      OrderedList,
      ListItem,
      Image,
    ],
    content: "",
    immediatelyRender: false,
  });

  const JumpToPosition = (from: number, to: number) => {
    if (from > to) return;
    // 選択範囲を設定
    editor?.commands.setTextSelection({ from, to });

    // エディタにフォーカスを当てる
    editor?.commands.focus();
  };

  // 指摘リスト（テストデータ）
  const issues = [
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

  return (
    <div className="flex size-full flex-col gap-4 overflow-x-auto print:overflow-visible print:bg-white print:p-0">
      <Toolbar editor={editor} />
      <div className="bg-background">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={70} // 初期比率 (%)
            minSize={50} // 最小比率 (%)
          >
            <div className="mx-auto w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
              {/* goole docみたいにEditor部分だけスクロール */}
              <div className="max-h-[80vh] overflow-y-auto rounded border bg-white">
                <EditorContent editor={editor} />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto p-4">
              {issues.map((i) => (
                <Card key={i.id} onClick={() => JumpToPosition(i.position.start, i.position.end)}>
                  <CardHeader>
                    <CardTitle>
                      {i.id}. {i.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{i.message}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <p>開始:{i.position.start}</p>
                    <p>終了:{i.position.end}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default TiptapEditor;
