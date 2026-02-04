import { ReactNode } from 'react';

export type AccentColor = 
  | "teal" 
  | "blue" 
  | "purple" 
  | "rose" 
  | "amber" 
  | "emerald" 
  | "indigo" 
  | "cyan"
  | string; // Allow custom colors

export interface AccentColorConfig {
  name: string;
  primary: string; // HSL value like "174 72% 35%"
  primaryForeground: string;
  light: string;
  dark: string;
  gradient: string;
}

export interface AccentThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  accentConfig: AccentColorConfig;
  mounted: boolean;
}

export interface AccentThemeProviderProps {
  children: ReactNode;
  defaultColor?: AccentColor;
  customColors?: Record<string, AccentColorConfig>;
  storageKey?: string;
  cssVariablePrefix?: string;
}
