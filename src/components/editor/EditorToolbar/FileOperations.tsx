"use client";

import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFileOperations } from "@/hooks/useFileOperations";

interface FileOperationsProps {
  editor: Editor | null;
}

export default function FileOperations({ editor }: FileOperationsProps) {
  const {
    state,
    openUploadDialog,
    closeUploadDialog,
    openDownloadDialog,
    closeDownloadDialog,
    handleFileUpload,
    confirmUpload,
    downloadFile,
  } = useFileOperations(editor);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            ファイル
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={openUploadDialog}>開く</DropdownMenuItem>
          <DropdownMenuItem onSelect={openDownloadDialog}>ダウンロード</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* アップロードダイアログ */}
      <Dialog open={state.isUploadOpen} onOpenChange={closeUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ファイルをアップロードする</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-6">
            <div>
              <Label htmlFor="markdownfile">マークダウンファイル</Label>
              <Input
                id="markdownfile"
                type="file"
                accept=".md,.markdown,.txt"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={confirmUpload} disabled={!state.content}>
              確定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ダウンロードダイアログ */}
      <Dialog open={state.isDownloadOpen} onOpenChange={closeDownloadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ファイルをダウンロードする</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={downloadFile}>
              ダウンロード
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
