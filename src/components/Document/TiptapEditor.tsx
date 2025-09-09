"use client";

import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "../Base/Toolbar/Toolbar";

const TiptapEditor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "focus:outline-none px-16 print:border-0 border bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        heading: {
          levels: [1, 2, 3, 4, 5, 6], // 見出しレベルを有効化
        },
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });

  return (
    <div className="flex size-full flex-col gap-4 overflow-x-auto print:overflow-visible print:bg-white print:p-0">
      <Toolbar editor={editor} />
      <div className="bg-[#f9fbfd]">
        <div className="mx-auto w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;
