// Main exports - Provider and Hooks
export { 
  AccentThemeProvider, 
  useAccentTheme, 
  useAccentColor,
  useAccentDarkMode 
} from './AccentThemeProvider';

// UI Components
export { 
  AccentColorPicker, 
  AccentColorSwatch,
  AccentColorSwatches,
  AccentColorMenu,
  AccentColorButton,
  AccentThemeReset,
  CurrentAccentIndicator,
  AccentColorGrid,
} from './AccentColorPicker';

// Color data
export { defaultAccentColors, mergeColors } from './colors';

// Types
export type {
  // Core types
  AccentColor,
  AccentColorConfig,
  AccentThemeContextType,
  AccentThemeProviderProps,
  
  // Component types
  ComponentSize,
  BaseComponentProps,
  AccentColorPickerProps,
  AccentColorSwatchesProps,
  AccentColorMenuProps,
  AccentColorButtonProps,
  AccentThemeResetProps,
  CurrentAccentIndicatorProps,
  AccentColorGridProps,
  AccentColorSwatchProps,
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

// Version
export const VERSION = '2.0.0';
