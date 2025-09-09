"use client";

import { EditorContent } from "@tiptap/react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { MOCK_ISSUES } from "@/constants/editor";
import { useTiptapEditor } from "@/hooks/useEditor";
import EditorSidebar from "./EditorSidebar";
import EditorToolbar from "./EditorToolbar";

export default function TiptapEditor() {
  const editor = useTiptapEditor();

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-x-auto print:overflow-visible print:bg-white print:p-0">
      <EditorToolbar editor={editor} />

      <div className="bg-background">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={70} minSize={50}>
            <div className="mx-auto w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
              <div className="max-h-[80vh] overflow-y-auto rounded border bg-white">
                <EditorContent editor={editor} />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={30} minSize={25}>
            <EditorSidebar editor={editor} issues={MOCK_ISSUES} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
