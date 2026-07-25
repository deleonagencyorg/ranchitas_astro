export {};

declare global {
  interface Window {
    openVideoModal?: (videoUrl: string, videoHost?: string) => void;
  }
}
