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
  defaultColor: AccentColor;
  resetToDefault: () => void;
}

export interface AccentThemeProviderProps {
  children: ReactNode;
  defaultColor?: AccentColor;
  customColors?: Record<string, AccentColorConfig>;
  storageKey?: string;
  cssVariablePrefix?: string;
  /** Auto-inject base CSS variables (default: true) */
  injectCSS?: boolean;
  /** Detect and adapt to dark mode automatically (default: true) */
  enableDarkMode?: boolean;
}

// Component props
export type ComponentSize = "sm" | "md" | "lg";

export interface BaseComponentProps {
  className?: string;
  size?: ComponentSize;
}

export interface AccentColorPickerProps extends BaseComponentProps {
  /** Show as a dropdown or inline grid */
  variant?: "dropdown" | "inline" | "menu";
  /** Number of columns for inline variant */
  columns?: number;
  /** Callback when color changes */
  onChange?: (color: AccentColor) => void;
  /** Label text for dropdown trigger */
  label?: string;
  /** Show color name in dropdown */
  showColorName?: boolean;
}

export interface AccentColorSwatchesProps extends BaseComponentProps {
  /** Callback when color changes */
  onChange?: (color: AccentColor) => void;
  /** Show checkmark on selected */
  showCheckmark?: boolean;
  /** Spacing between swatches */
  gap?: "sm" | "md" | "lg";
}

export interface AccentColorMenuProps extends BaseComponentProps {
  /** Callback when color changes */
  onChange?: (color: AccentColor) => void;
  /** Menu alignment */
  align?: "start" | "center" | "end";
  /** Menu button label */
  label?: string;
}

export interface AccentColorButtonProps extends BaseComponentProps {
  /** Callback when clicked */
  onClick?: () => void;
  /** Show current color name */
  showLabel?: boolean;
  /** Button variant */
  buttonVariant?: "default" | "ghost" | "outline";
}

export interface AccentThemeResetProps extends BaseComponentProps {
  /** Custom reset text */
  text?: string;
  /** Callback after reset */
  onReset?: () => void;
  /** Variant style */
  variant?: "button" | "link" | "subtle";
}

export interface CurrentAccentIndicatorProps extends BaseComponentProps {
  /** Show color name next to indicator */
  showName?: boolean;
  /** Pulse animation on change */
  pulseOnChange?: boolean;
}

export interface AccentColorGridProps extends BaseComponentProps {
  /** Number of columns */
  columns?: 2 | 3 | 4 | 5 | 6 | 8;
  /** Callback when color changes */
  onChange?: (color: AccentColor) => void;
  /** Show color labels */
  showLabels?: boolean;
  /** Gap size */
  gap?: "sm" | "md" | "lg";
}

export interface AccentColorSwatchProps {
  color: AccentColor;
  isSelected?: boolean;
  onClick?: () => void;
  size?: ComponentSize;
  className?: string;
  showCheckmark?: boolean;
}
