import MarkdownIt from "markdown-it";
import TurndownService from "turndown";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const turndownService = new TurndownService();

export const convertMarkdownToHtml = (markdown: string): string => {
  return md.render(markdown);
};

export const convertHtmlToMarkdown = (html: string): string => {
  return turndownService.turndown(html);
};

export const downloadMarkdownFile = (content: string, filename?: string) => {
  const date = new Date().toISOString().split("T")[0];
  const finalFilename = filename || `press-release-${date}.md`;

  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = finalFilename;
  a.click();
  URL.revokeObjectURL(url);
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to read file as text"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};
