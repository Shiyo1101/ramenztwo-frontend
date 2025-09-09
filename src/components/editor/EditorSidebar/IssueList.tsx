"use client";

import type { Editor } from "@tiptap/react";
import { jumpToPosition } from "@/lib/editor-utils";
import type { EditorIssue } from "@/types/editor";
import IssueCard from "./IssueCard";

interface IssueListProps {
  editor: Editor | null;
  issues: EditorIssue[];
}

export default function IssueList({ editor, issues }: IssueListProps) {
  const handleIssueClick = (issue: EditorIssue) => {
    jumpToPosition(editor, issue.position.start, issue.position.end);
  };

  if (issues.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <p className="text-sm">指摘事項はありません</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto p-4">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onClick={() => handleIssueClick(issue)} />
      ))}
    </div>
  );
}
