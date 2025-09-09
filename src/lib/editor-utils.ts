import type { Editor } from "@tiptap/react";
import type { HeadingLevel } from "@/types/editor";

export const getCurrentHeading = (editor: Editor | null): HeadingLevel => {
  if (!editor) return 0;

  for (let level = 1; level <= 6; level++) {
    if (editor.isActive("heading", { level })) {
      return level as HeadingLevel;
    }
  }
  return 0;
};

export const setHeading = (editor: Editor | null, level: HeadingLevel) => {
  if (!editor) return;

  if (level === 0) {
    editor.chain().focus().setParagraph().run();
  } else {
    editor.chain().focus().toggleHeading({ level }).run();
  }
};

export const jumpToPosition = (editor: Editor | null, from: number, to: number) => {
  if (!editor || from > to) return;

  editor.commands.setTextSelection({ from, to });
  editor.commands.focus();
};
