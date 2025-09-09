"use client";

import { EditorContent } from "@tiptap/react";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useTiptapEditor } from "@/hooks/useEditor";
import type { PressReleaseAnalysisResponse } from "@/types/api";
import EditorSidebar from "./EditorSidebar";
import EditorToolbar from "./EditorToolbar";

export default function TiptapEditor() {
  const editor = useTiptapEditor();
  const [analysisResponse, setAnalysisResponse] = useState<
    PressReleaseAnalysisResponse | undefined
  >();

  return (
    <div className="flex h-full w-full flex-col overflow-x-auto print:overflow-visible print:bg-white print:p-0">
      <EditorToolbar editor={editor} setAnalysisResponse={setAnalysisResponse} />
      <div className="bg-background">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={analysisResponse ? 70 : 100}
            minSize={analysisResponse ? 50 : 100}
          >
            <div className="mx-auto w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
              <div className="max-h-[80vh] overflow-y-auto rounded border bg-white">
                <EditorContent editor={editor} />
              </div>
            </div>
          </ResizablePanel>

          {analysisResponse && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={25} maxSize={50}>
                <EditorSidebar editor={editor} analysisResponse={analysisResponse} />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
