"use client";

import { BulletList, ListKit } from "@tiptap/extension-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "focus:outline-none px-16 print:border-0 border bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [StarterKit, BulletList, ListKit],
    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:overflow-visible print:bg-white print:p-0">
      <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
