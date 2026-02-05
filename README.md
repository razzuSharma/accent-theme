# @razzusharma/accent-theme

🎨 **Zero-config accent color theming for React apps.** Just install, wrap, and use. No CSS changes required!

## Features

- ✅ **Zero Configuration** - CSS variables auto-injected, no globals.css changes needed
- 🎨 **8 Built-in Colors** - Teal, Blue, Purple, Rose, Amber, Emerald, Indigo, Cyan
- 🧩 **Pre-built Components** - Pickers, swatches, menus, buttons - all styled out of the box
- 🌓 **Dark Mode Ready** - Auto-detects and adapts to next-themes, ThemeProvider, or data-theme
- 🎯 **TypeScript Support** - Fully typed with generics
- 💾 **Persistence** - Automatically saves user preference to localStorage
- 📦 **Tailwind Plugin** - Optional plugin for extended utilities
- 🪶 **Lightweight** - ~5KB gzipped

## Installation

```bash
npm install @razzusharma/accent-theme
# or
yarn add @razzusharma/accent-theme
# or
pnpm add @razzusharma/accent-theme
```

## Quick Start (It Just Works!)

### 1. Wrap your app with the provider

```tsx
import { AccentThemeProvider } from '@razzusharma/accent-theme';

function App() {
  return (
    <AccentThemeProvider>
      <YourApp />
    </AccentThemeProvider>
  );
}
```

That's it! CSS variables are auto-injected. No globals.css changes needed.

### 2. Drop in a color picker anywhere

```tsx
import { AccentColorPicker } from '@razzusharma/accent-theme';

function Navbar() {
  return (
    <nav>
      <AccentColorPicker variant="dropdown" size="sm" />
    </nav>
  );
}
```

## Pre-built Components

### AccentColorPicker

The main color picker component with multiple variants:

```tsx
import { AccentColorPicker } from '@razzusharma/accent-theme';

// Dropdown picker (default)
<AccentColorPicker variant="dropdown" size="md" />

// Inline grid
<AccentColorPicker variant="inline" columns={4} />

// Menu style
<AccentColorPicker variant="menu" align="end" />
```

**Props:**
- `variant`: `"dropdown" | "inline" | "menu"`
- `size`: `"sm" | "md" | "lg"`
- `columns`: Number of columns for inline variant
- `label`: Label text for dropdown trigger
- `showColorName`: Show color name in dropdown
- `onChange`: Callback when color changes
- `className`: Custom classes

### AccentColorSwatches

Horizontal row of color dots:

```tsx
import { AccentColorSwatches } from '@razzusharma/accent-theme';

<AccentColorSwatches size="md" gap="md" showCheckmark />
```

### AccentColorMenu

Dropdown menu with color names:

```tsx
import { AccentColorMenu } from '@razzusharma/accent-theme';

<AccentColorMenu align="end" label="Theme" />
```

### AccentColorButton

Button showing current accent color:

```tsx
import { AccentColorButton } from '@razzusharma/accent-theme';

<AccentColorButton showLabel buttonVariant="ghost" />
```

### AccentColorGrid

Configurable grid layout:

```tsx
import { AccentColorGrid } from '@razzusharma/accent-theme';

<AccentColorGrid columns={4} showLabels gap="md" />
```

### CurrentAccentIndicator

Non-interactive indicator showing current color:

```tsx
import { CurrentAccentIndicator } from '@razzusharma/accent-theme';

<CurrentAccentIndicator showName pulseOnChange />
```

### AccentThemeReset

Reset button to go back to default:

```tsx
import { AccentThemeReset } from '@razzusharma/accent-theme';

<AccentThemeReset variant="button" text="Reset Theme" />
```

## Provider Configuration

```tsx
<AccentThemeProvider
  defaultColor="teal"           // Default accent color
  customColors={{...}}          // Add custom colors
  storageKey="accent-color"     // localStorage key
  cssVariablePrefix="brand"     // Prefix CSS variables (--brand-primary)
  injectCSS={true}              // Auto-inject base CSS (default: true)
  enableDarkMode={true}         // Auto-detect dark mode (default: true)
>
  {children}
</AccentThemeProvider>
```

## Using the Hook

```tsx
import { useAccentTheme, useAccentColor } from '@razzusharma/accent-theme';

function MyComponent() {
  const { accentColor, setAccentColor, resetToDefault } = useAccentTheme();
  const { primary, light, dark, gradient } = useAccentColor();

  return (
    <div style={{ color: primary }}>
      <h1>Current theme: {accentColor}</h1>
      <button onClick={() => setAccentColor('blue')}>
        Switch to Blue
      </button>
    </div>
  );
}
```

## Tailwind CSS Integration (Optional)

For enhanced Tailwind integration, add the plugin:

```js
// tailwind.config.js
import { accentThemePlugin } from '@razzusharma/accent-theme/tailwind';

export default {
  plugins: [accentThemePlugin],
}
```

This adds utility classes:
```html
<div class="bg-primary text-primary-foreground ring-accent">
  Content with accent colors
</div>
```

### Without the Plugin

If you prefer manual setup, CSS variables are available:

```css
.my-button {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

```html
<button class="bg-[hsl(var(--primary))] text-white">
  Click me
</button>
```

## Custom Colors

```tsx
import { AccentThemeProvider } from '@razzusharma/accent-theme';

const customColors = {
  coral: {
    name: "Coral",
    primary: "16 100% 60%",
    primaryForeground: "0 0% 100%",
    light: "16 100% 70%",
    dark: "16 100% 50%",
    gradient: "from-orange-400 to-red-500",
  },
};

function App() {
  return (
    <AccentThemeProvider 
      defaultColor="coral"
      customColors={customColors}
    >
      <YourApp />
    </AccentThemeProvider>
  );
}
```

## Dark Mode

The package automatically detects dark mode from:
- `next-themes`
- `ThemeProvider`
- `data-theme="dark"` attribute
- `class="dark"` on html element
- `prefers-color-scheme: dark` media query

## CSS Variables

The following CSS variables are set on the root element:

```css
:root {
  --primary: 174 72% 35%;           /* HSL values */
  --primary-foreground: 210 40% 98%;
  --accent: 174 72% 45%;
  --ring: 174 72% 45%;
}
```

With `cssVariablePrefix="brand"`:
```css
:root {
  --brand-primary: 174 72% 35%;
  --brand-primary-foreground: 210 40% 98%;
  --brand-accent: 174 72% 45%;
  --brand-ring: 174 72% 45%;
}
```

## Importing CSS Manually

If you prefer to disable auto-injection and import CSS manually:

```tsx
// Disable auto-injection
<AccentThemeProvider injectCSS={false}>
```

```tsx
// Import CSS in your app
import '@razzusharma/accent-theme/styles.css';
```

Or in CSS:
```css
@import '@razzusharma/accent-theme/styles.css';
```

## API Reference

### `useAccentTheme()`

```ts
const {
  accentColor,      // Current color name
  setAccentColor,   // Function to change color
  accentConfig,     // Full color config object
  mounted,          // Hydration flag
  defaultColor,     // Default color name
  resetToDefault,   // Reset function
} = useAccentTheme();
```

### `useAccentColor()`

```ts
const {
  primary,          // hsl() string for primary color
  primaryForeground,// hsl() string for text color
  light,            // hsl() string for light variant
  dark,             // hsl() string for dark variant
  gradient,         // Tailwind gradient class
  mounted,          // Hydration flag
  isDark,           // Current dark mode state
} = useAccentColor();
```

### Color Config Structure

```ts
interface AccentColorConfig {
  name: string;              // Display name
  primary: string;           // HSL value "174 72% 35%"
  primaryForeground: string; // HSL value for text
  light: string;             // Lighter variant
  dark: string;              // Darker variant
  gradient: string;          // Tailwind gradient classes
}
```

## Built-in Colors

| Color | Name | Primary |
|-------|------|---------|
| teal | Teal | `#199c88` |
| blue | Ocean Blue | `#0b6dc6` |
| purple | Royal Purple | `#7c3aed` |
| rose | Rose Pink | `#e11d48` |
| amber | Sunset Amber | `#d97706` |
| emerald | Forest Emerald | `#208562` |
| indigo | Deep Indigo | `#4f46e5` |
| cyan | Electric Cyan | `#0ba5c9` |

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Supports server-side rendering (Next.js, Remix, etc.)

## License

MIT © razzusharma
