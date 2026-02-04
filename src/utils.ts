import { AccentColorConfig } from './types';

/**
 * Generate CSS custom properties for an accent color
 */
export function generateCSSVariables(
  config: AccentColorConfig,
  prefix: string = ""
): Record<string, string> {
  const p = prefix ? `${prefix}-` : "";
  return {
    [`--${p}primary`]: config.primary,
    [`--${p}primary-foreground`]: config.primaryForeground,
    [`--${p}accent`]: config.light,
    [`--${p}ring`]: config.light,
  };
}

/**
 * Apply CSS variables to an element
 */
export function applyCSSVariables(
  element: HTMLElement,
  variables: Record<string, string>
): void {
  Object.entries(variables).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

/**
 * Create a gradient string from accent color config
 */
export function createGradient(
  config: AccentColorConfig,
  direction: string = "to right"
): string {
  return `linear-gradient(${direction}, hsl(${config.light}), hsl(${config.primary}))`;
}

/**
 * Create a shadow with the accent color
 */
export function createShadow(
  config: AccentColorConfig,
  intensity: number = 0.3,
  blur: number = 20
): string {
  return `0 4px ${blur}px hsl(${config.primary} / ${intensity})`;
}

/**
 * Lighten or darken an HSL color
 */
export function adjustHSL(
  hsl: string,
  adjustments: {
    hue?: number;
    saturation?: number;
    lightness?: number;
  }
): string {
  const [h, s, l] = hsl.split(" ").map((v) => parseFloat(v));
  const newH = h + (adjustments.hue || 0);
  const newS = Math.max(0, Math.min(100, s + (adjustments.saturation || 0)));
  const newL = Math.max(0, Math.min(100, l + (adjustments.lightness || 0)));
  return `${newH} ${newS}% ${newL}%`;
}

/**
 * Get contrasting text color (black or white) for a background
 */
export function getContrastColor(
  hsl: string,
  threshold: number = 50
): "black" | "white" {
  const [, , l] = hsl.split(" ").map((v) => parseFloat(v));
  return l > threshold ? "black" : "white";
}

/**
 * Check if code is running on client side
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Local storage wrapper with error handling
 */
export const storage = {
  get: (key: string, defaultValue?: string): string | undefined => {
    if (!isClient()) return defaultValue;
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key: string, value: string): void => {
    if (!isClient()) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors
    }
  },
  remove: (key: string): void => {
    if (!isClient()) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }
  },
};
