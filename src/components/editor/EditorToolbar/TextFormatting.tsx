"use client";

import type { Editor } from "@tiptap/react";
import { Redo2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useEditorState } from "@/hooks/useEditorState";

interface TextFormattingProps {
  editor: Editor | null;
}

export default function TextFormatting({ editor }: TextFormattingProps) {
  const { isBold, isOrdered, isBullet } = useEditorState(editor);
  if (!editor) return null;

  const handleBoldToggle = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleOrderedListToggle = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const handleBulletListToggle = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleUndo = () => {
    editor.chain().focus().undo().run();
  };

  const handleRedo = () => {
    editor.chain().focus().redo().run();
  };

  return (
    <div className="flex items-center gap-1">
      {/* 取り消し */}
      <Button variant="ghost" size="sm" onClick={handleUndo} className="h-8 w-8 p-0 shadow-xs">
        <Undo2 className="h-4 w-4" />
      </Button>

      {/* やり直し */}
      <Button variant="ghost" size="sm" onClick={handleRedo} className="h-8 w-8 p-0 shadow-xs">
        <Redo2 className="h-4 w-4" />
      </Button>

      {/* 太字 */}
      <Toggle
        pressed={isBold}
        onPressedChange={handleBoldToggle}
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 font-bold"
      >
        B
      </Toggle>

      {/* 番号付きリスト */}
      <Toggle
        pressed={isOrdered}
        onPressedChange={handleOrderedListToggle}
        variant="outline"
        size="sm"
        className="h-8 px-2 font-bold text-sm"
      >
        1.
      </Toggle>

      {/* 箇条書きリスト */}
      <Toggle
        pressed={isBullet}
        onPressedChange={handleBulletListToggle}
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 font-bold text-lg"
      >
        •
      </Toggle>
    </div>
  );
}
