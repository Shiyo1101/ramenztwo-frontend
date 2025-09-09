"use client";

import type { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HEADING_OPTIONS } from "@/constants/editor";
import { useEditorState } from "@/hooks/useEditorState";
import { setHeading } from "@/lib/editor-utils";
import type { HeadingLevel } from "@/types/editor";

interface HeadingSelectorProps {
  editor: Editor | null;
}

export default function HeadingSelector({ editor }: HeadingSelectorProps) {
  const { currentHeading } = useEditorState(editor);

  if (!editor) return null;

  const currentOption = HEADING_OPTIONS.find((option) => option.value === currentHeading);

  const handleHeadingChange = (value: string) => {
    const level = parseInt(value, 10) as HeadingLevel;
    setHeading(editor, level);
  };

  return (
    <Select value={currentHeading.toString()} onValueChange={handleHeadingChange}>
      <SelectTrigger className="h-8 w-[180px]">
        <SelectValue>
          <span style={{ fontSize: currentOption?.fontSize }}>
            {currentOption?.label || "標準テキスト"}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {HEADING_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            <span style={{ fontSize: option.fontSize }}>{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
