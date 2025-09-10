"use client";

import type { Editor } from "@tiptap/react";
import { FileSearch, Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";
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
import type { PressReleaseAnalysisResponse } from "@/types/api";

interface AnalyzeButtonProps {
  editor: Editor | null;
  setAnalysisResponse: (analysisResponse: PressReleaseAnalysisResponse | undefined) => void;
}

export default function AnalyzeButton({ editor, setAnalysisResponse }: AnalyzeButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getCurrentHtml } = useFileOperations(editor);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 font-bold" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <FileSearch className="h-4 w-4" />
          )}
          解析
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[330px] sm:w-[550px]">
        <DialogHeader>
          <DialogTitle>解析設定</DialogTitle>
        </DialogHeader>
        <AnalyzePressReleaseForm
          setIsAnalyzePressReleaseDialogOpen={setIsDialogOpen}
          contentHtml={getCurrentHtml()}
          setAnalysisResponse={setAnalysisResponse}
          isPending={isPending}
          startTransition={startTransition}
        />
      </DialogContent>
    </Dialog>
  );
}
