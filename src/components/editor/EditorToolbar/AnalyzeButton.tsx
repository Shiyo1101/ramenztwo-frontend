"use client";

import type { Editor } from "@tiptap/react";
import { FileSearch } from "lucide-react";
import { useState } from "react";
import AnalyzePressReleaseForm from "@/components/forms/AnalyzePressReleaseForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFileOperations } from "@/hooks/useFileOperations";
import type { AnalysisResponse } from "@/types/editor";

interface AnalyzeButtonProps {
  editor: Editor | null;
  setAnalysisResponse: (analysisResponse: AnalysisResponse | undefined) => void;
}

export default function AnalyzeButton({ editor, setAnalysisResponse }: AnalyzeButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getCurrentMarkdown } = useFileOperations(editor);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <FileSearch className="h-4 w-4" />
          解析
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[330px] sm:w-[550px]">
        <DialogHeader>
          <DialogTitle>解析設定</DialogTitle>
        </DialogHeader>
        <AnalyzePressReleaseForm
          setIsAnalyzePressReleaseDialogOpen={setIsDialogOpen}
          contentMarkdown={getCurrentMarkdown()}
          setAnalysisResponse={setAnalysisResponse}
        />
      </DialogContent>
    </Dialog>
  );
}
