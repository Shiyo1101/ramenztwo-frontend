import type { Editor } from "@tiptap/react";
import { useState } from "react";
import {
  convertHtmlToMarkdown,
  convertMarkdownToHtml,
  downloadMarkdownFile,
  readFileAsText,
} from "@/lib/file-utils";
import type { FileOperationsState } from "@/types/editor";

export const useFileOperations = (editor: Editor | null) => {
  const [state, setState] = useState<FileOperationsState>({
    isUploadOpen: false,
    isDownloadOpen: false,
    content: "",
  });

  const openUploadDialog = () => {
    setState((prev) => ({ ...prev, isUploadOpen: true }));
  };

  const closeUploadDialog = () => {
    setState((prev) => ({ ...prev, isUploadOpen: false, content: "" }));
  };

  const openDownloadDialog = () => {
    setState((prev) => ({ ...prev, isDownloadOpen: true }));
  };

  const closeDownloadDialog = () => {
    setState((prev) => ({ ...prev, isDownloadOpen: false }));
  };

  const handleFileUpload = async (file: File) => {
    try {
      const markdown = await readFileAsText(file);
      const htmlContent = convertMarkdownToHtml(markdown);
      setState((prev) => ({ ...prev, content: htmlContent }));
    } catch (error) {
      console.error("Failed to read file:", error);
    }
  };

  const confirmUpload = () => {
    if (editor && state.content) {
      editor.commands.setContent(state.content);
    }
    closeUploadDialog();
  };

  const downloadFile = () => {
    if (!editor) return;

    const html = editor.getHTML();
    const markdown = convertHtmlToMarkdown(html);
    downloadMarkdownFile(markdown);
    closeDownloadDialog();
  };

  const getCurrentMarkdown = (): string => {
    if (!editor) return "";
    return convertHtmlToMarkdown(editor.getHTML());
  };

  return {
    state,
    openUploadDialog,
    closeUploadDialog,
    openDownloadDialog,
    closeDownloadDialog,
    handleFileUpload,
    confirmUpload,
    downloadFile,
    getCurrentMarkdown,
  };
};
