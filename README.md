# @razzu/accent-theme

A React hook and provider for dynamic accent color theming. Perfect for adding customizable color themes to your React applications.

## Features

- 🎨 **8 Built-in Colors** - Teal, Blue, Purple, Rose, Amber, Emerald, Indigo, Cyan
- 🎯 **TypeScript Support** - Fully typed with generics
- 💾 **Persistence** - Automatically saves user preference to localStorage
- 🌓 **Dark Mode Compatible** - Works seamlessly with dark mode
- 🎛️ **Customizable** - Add your own custom colors
- 📦 **Zero Dependencies** - Only peer dependencies on React
- 🪶 **Lightweight** - ~3KB gzipped

## Installation

```bash
npm install @razzu/accent-theme
# or
yarn add @razzu/accent-theme
# or
pnpm add @razzu/accent-theme
```

## Quick Start

### 1. Wrap your app with the provider

```tsx
import { AccentThemeProvider } from '@razzu/accent-theme';

function App() {
  return (
    <AccentThemeProvider>
      <YourApp />
    </AccentThemeProvider>
  );
}
```

### 2. Use the hook in your components

```tsx
import { useAccentTheme, useAccentColor } from '@razzu/accent-theme';

function MyComponent() {
  const { accentColor, setAccentColor } = useAccentTheme();
  const { primary, light, gradient } = useAccentColor();

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

### 3. Use the built-in color picker

```tsx
import { AccentColorPicker } from '@razzu/accent-theme';

function Settings() {
  return (
    <div>
      <h2>Choose your theme</h2>
      <AccentColorPicker variant="inline" columns={4} />
    </div>
  );
}
```

## Configuration

### Provider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultColor` | `string` | `'teal'` | Default accent color |
| `customColors` | `object` | `undefined` | Add custom colors |
| `storageKey` | `string` | `'accent-color'` | localStorage key |
| `cssVariablePrefix` | `string` | `''` | Prefix for CSS variables |

### Custom Colors

```tsx
import { AccentThemeProvider } from '@razzu/accent-theme';

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

## CSS Variables

The library sets these CSS custom properties on the root element:

```css
:root {
  --primary: 174 72% 35%;        /* HSL values */
  --primary-foreground: 210 40% 98%;
  --accent: 174 72% 45%;
  --ring: 174 72% 45%;
}
```

Use them in your CSS/Tailwind:

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

## API Reference

### `useAccentTheme()`

```ts
const {
  accentColor,      // Current color name
  setAccentColor,   // Function to change color
  accentConfig,     // Full color config object
  mounted,          // Hydration flag
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
} = useAccentColor();
```

### `AccentColorPicker`

```tsx
<AccentColorPicker 
  size="md"           // 'sm' | 'md' | 'lg'
  variant="dropdown"  // 'dropdown' | 'inline'
  columns={4}         // Number of columns for inline
  onChange={(color) => console.log(color)}
/>
```

## Tailwind CSS Integration

Add to your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        accent: 'hsl(var(--accent))',
        ring: 'hsl(var(--ring))',
      },
    },
  },
}
```

## License

MIT © razzu
