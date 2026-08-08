export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  primary: string;
  border: string;
  statusStyle: ThemeMode;
}

export interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}
