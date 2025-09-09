export type HeadingLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingOption {
  label: string;
  value: HeadingLevel;
  fontSize: string;
}

export interface FileOperationsState {
  isUploadOpen: boolean;
  isDownloadOpen: boolean;
  content: string;
}

export interface EditorState {
  isBold: boolean;
  isOrdered: boolean;
  isBullet: boolean;
  currentHeading: HeadingLevel;
}
