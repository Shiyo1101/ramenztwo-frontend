"use client";

import type { Editor } from "@tiptap/react";
import type { AnalysisResponse } from "@/types/editor";
import AnalyzeButton from "./AnalyzeButton";
import FileOperations from "./FileOperations";
import HeadingSelector from "./HeadingSelector";
import TextFormatting from "./TextFormatting";

interface EditorToolbarProps {
  editor: Editor | null;
  setAnalysisResponse: (analysisResponse: AnalysisResponse | undefined) => void;
}

export default function EditorToolbar({ editor, setAnalysisResponse }: EditorToolbarProps) {
  return (
    <div className="flex h-12 w-full items-center justify-between rounded border-b bg-secondary px-4">
      <div className="flex items-center gap-4">
        <FileOperations editor={editor} />
        <div className="h-6 w-px bg-border" />
        <TextFormatting editor={editor} />
        <div className="h-6 w-px bg-border" />
        <HeadingSelector editor={editor} />
      </div>
      <AnalyzeButton editor={editor} setAnalysisResponse={setAnalysisResponse} />
    </div>
  );
}
