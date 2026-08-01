// Global type declarations for window extensions

interface Window {
  __themeInitialized?: boolean;
  toggleTheme?: () => void;
  getTheme?: () => string;
}
