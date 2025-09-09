import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { getCurrentHeading } from "@/lib/editor-utils";
import type { EditorState, HeadingLevel } from "@/types/editor";

export const useEditorState = (editor: Editor | null): EditorState => {
  const [isBold, setIsBold] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isBullet, setIsBullet] = useState(false);
  const [currentHeading, setCurrentHeading] = useState<HeadingLevel>(0);

  useEffect(() => {
    if (!editor) return;

    const updateState = () => {
      setIsBold(editor.isActive("bold"));
      setIsOrdered(editor.isActive("orderedList"));
      setIsBullet(editor.isActive("bulletList"));
      setCurrentHeading(getCurrentHeading(editor));
    };

    // 初期化時の状態更新
    updateState();

    // エディターの状態変更を監視
    editor.on("selectionUpdate", updateState);
    editor.on("transaction", updateState);

    return () => {
      editor.off("selectionUpdate", updateState);
      editor.off("transaction", updateState);
    };
  }, [editor]);

  return {
    isBold,
    isOrdered,
    isBullet,
    currentHeading,
  };
};
