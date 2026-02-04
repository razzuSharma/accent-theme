// Main exports
export { AccentThemeProvider, useAccentTheme, useAccentColor } from './AccentThemeProvider';
export { AccentColorPicker, AccentColorSwatch } from './AccentColorPicker';
export { defaultAccentColors } from './colors';

// Types
export type {
  AccentColor,
  AccentColorConfig,
  AccentThemeContextType,
  AccentThemeProviderProps,
} from './types';

// Utilities
export {
  generateCSSVariables,
  applyCSSVariables,
  createGradient,
  createShadow,
  adjustHSL,
  getContrastColor,
  isClient,
  storage,
} from './utils';
