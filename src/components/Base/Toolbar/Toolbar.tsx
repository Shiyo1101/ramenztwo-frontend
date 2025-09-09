"use client";

import type { Editor } from "@tiptap/react";
import { Check, Redo2, Undo2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";

type ToolbarProps = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: ToolbarProps) {
  const [isBold, setIsBold] = useState(editor?.isActive("bold"));
  const [isOrdered, setIsOrdered] = useState(editor?.isActive("orderedList"));
  const [isBullet, setIsBullet] = useState(editor?.isActive("bulletList"));

  if (!editor) return null;

  // 見出しオプション
  const headingOptions: { label: string; value: 0 | 1 | 2 | 3 | 4 | 5 | 6; fontSize: string }[] = [
    { label: "標準テキスト", value: 0, fontSize: "11px" },
    { label: "タイトル", value: 1, fontSize: "26px" },
    { label: "サブタイトル", value: 2, fontSize: "15px" },
    { label: "見出し 1", value: 3, fontSize: "20px" },
    { label: "見出し 2", value: 4, fontSize: "18px" },
    { label: "見出し 3", value: 5, fontSize: "16px" },
    { label: "見出し 4", value: 6, fontSize: "14px" },
  ];

  // 現在のスタイルを取得
  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor.isActive("heading", { level })) {
        console.log("Current heading level:", level);
        return level;
      }
    }
    return 0; // 標準テキスト
  };

  // 見出しを設定
  const setHeading = (level: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <div className="flex h-12 w-full items-center gap-2 rounded border-b bg-gray-100 px-2">
      {/* 取り消し */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="rounded px-2 py-1 hover:bg-gray-200"
      >
        <Undo2 size={16} />
      </button>

      {/* やり直し */}
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="rounded px-2 py-1 hover:bg-gray-200"
      >
        <Redo2 size={16} />
      </button>

      {/* 太字 */}
      <Toggle
        pressed={isBold}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
          setIsBold(editor?.isActive("bold"));
        }}
        className="rounded px-2 py-1 font-bold hover:bg-gray-200 data-[state=on]:bg-gray-300"
        aria-label="Bold"
      >
        B
      </Toggle>

      {/* 番号付きリスト */}
      <Toggle
        pressed={isOrdered}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
          setIsOrdered(editor?.isActive("orderedList"));
          editor?.isActive("orderedList") && setIsBullet(false);
        }}
        className="rounded px-2 py-1 font-bold hover:bg-gray-200 data-[state=on]:bg-gray-300"
        aria-label="Bold"
      >
        1.
      </Toggle>

      {/* 箇条書きリスト */}
      <Toggle
        pressed={isBullet}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
          setIsBullet(editor?.isActive("bulletList"));
          editor?.isActive("bulletList") && setIsOrdered(false);
        }}
        className="rounded px-2 py-1 font-bold hover:bg-gray-200 data-[state=on]:bg-gray-300"
        aria-label="Bold"
      >
        •
      </Toggle>

      {/* 見出し */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="rounded border px-3 py-1 hover:bg-gray-200">
            {headingOptions.find((o) => o.value === getCurrentHeading())?.label ?? "標準テキスト"}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px]">
          {headingOptions.map((o) => (
            <DropdownMenuItem
              key={o.value}
              onClick={() => setHeading(o.value)}
              className="flex cursor-pointer justify-between"
            >
              <span style={{ fontSize: o.fontSize }}>{o.label}</span>
              {getCurrentHeading() === o.value && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
