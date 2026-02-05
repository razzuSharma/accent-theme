# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-05

### ✨ New Features

- **Zero-Config CSS Injection** - CSS variables now auto-inject via `injectCSS` prop (default: `true`). No more globals.css changes needed!
- **6 New Pre-built Components**:
  - `AccentColorSwatches` - Horizontal row of color dots
  - `AccentColorMenu` - Dropdown menu with color names
  - `AccentColorButton` - Button showing current accent color
  - `AccentColorGrid` - Configurable grid with optional labels
  - `CurrentAccentIndicator` - Non-interactive color indicator
  - `AccentThemeReset` - Reset button to default theme
- **Automatic Dark Mode Detection** - Detects next-themes, ThemeProvider, data-theme attribute, or prefers-color-scheme
- **Tailwind Plugin** - Optional plugin for extended utility classes (`bg-primary`, `text-accent`, etc.)
- **Optional CSS Import** - `@razzusharma/accent-theme/styles.css` for manual CSS loading

### 🚀 Improvements

- `AccentColorPicker` now has `variant="menu"` option
- All components accept `className` and `size` props for customization
- Added `resetToDefault` function to context
- Dark mode colors auto-adjust based on theme
- Custom event `accentthemechange` dispatched on color changes

### 🔧 API Changes

- New provider props:
  - `injectCSS?: boolean` - Auto-inject base CSS (default: true)
  - `enableDarkMode?: boolean` - Auto-detect dark mode (default: true)
- New exports:
  - `useAccentDarkMode()` hook
  - All new component types

### 📦 Build

- New export paths:
  - `@razzusharma/accent-theme/tailwind` - Tailwind plugin
  - `@razzusharma/accent-theme/styles.css` - CSS file

---

## [1.0.2] - 2024

### Added
- Initial release
- `AccentThemeProvider` with context
- `AccentColorPicker` with dropdown/inline variants
- `useAccentTheme` and `useAccentColor` hooks
- 8 built-in accent colors
- localStorage persistence
- Custom color support
- TypeScript definitions

[2.0.0]: https://github.com/razzuSharma/accent-theme/compare/v1.0.2...v2.0.0
