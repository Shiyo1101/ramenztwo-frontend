"use client";

import type { Editor } from "@tiptap/react";
import type { PressReleaseAnalysisResponse } from "@/types/api";
import IssueList from "./IssueList";

interface EditorSidebarProps {
  editor: Editor | null;
  analysisResponse: PressReleaseAnalysisResponse | undefined;
}

export default function EditorSidebar({ editor, analysisResponse }: EditorSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      {/* ヘッダー */}
      <div className="border-b bg-background p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold text-lg">指摘事項</h2>
          {/* <Badge variant="secondary">{issueCount}件</Badge> */}
        </div>
        {/* {issueTypes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {issueTypes.map((type) => (
              <Badge key={type} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        )} */}
      </div>

      {/* 指摘リスト */}
      <div className="flex-1">
        <IssueList editor={editor} analysisResponse={analysisResponse} />
      </div>
    </div>
  );
}
