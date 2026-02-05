/**
 * Tailwind CSS plugin for accent-theme
 * 
 * This plugin adds utility classes and theme extensions for working with
 * accent colors in your Tailwind CSS configuration.
 * 
 * @example
 * // tailwind.config.js
 * const { accentThemePlugin } = require('@razzusharma/accent-theme/tailwind');
 * 
 * module.exports = {
 *   plugins: [accentThemePlugin],
 * }
 */

declare const require: any;
declare const module: any;

// Using require syntax for CommonJS compatibility
const plugin = require('tailwindcss/plugin');

export const accentThemePlugin = plugin(
  // Add base styles
  function({ addBase }: { addBase: (styles: Record<string, any>) => void }) {
    addBase({
      ':root': {
        '--primary': '174 72% 35%',
        '--primary-foreground': '210 40% 98%',
        '--accent': '174 72% 45%',
        '--ring': '174 72% 45%',
      },
      '.dark': {
        '--primary': '174 72% 45%',
        '--primary-foreground': '210 40% 98%',
        '--accent': '174 72% 55%',
        '--ring': '174 72% 55%',
      },
    });
  },
  // Extend theme
  {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          accent: 'hsl(var(--accent))',
          ring: 'hsl(var(--ring))',
        },
        backgroundColor: {
          primary: 'hsl(var(--primary))',
          accent: 'hsl(var(--accent))',
        },
        textColor: {
          primary: 'hsl(var(--primary))',
          'primary-foreground': 'hsl(var(--primary-foreground))',
          accent: 'hsl(var(--accent))',
        },
        borderColor: {
          primary: 'hsl(var(--primary))',
          accent: 'hsl(var(--accent))',
        },
        ringColor: {
          primary: 'hsl(var(--primary))',
          accent: 'hsl(var(--accent))',
          ring: 'hsl(var(--ring))',
        },
        ringOffsetColor: {
          primary: 'hsl(var(--primary))',
          accent: 'hsl(var(--accent))',
        },
        outlineColor: {
          primary: 'hsl(var(--primary))',
          accent: 'hsl(var(--accent))',
        },
        fill: {
          primary: 'hsl(var(--primary))',
          accent: 'hsl(var(--accent))',
        },
        stroke: {
          primary: 'hsl(var(--primary))',
          accent: 'hsl(var(--accent))',
        },
      },
    },
  }
);

// Also export as default for ES module compatibility
export default accentThemePlugin;

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = accentThemePlugin;
  module.exports.accentThemePlugin = accentThemePlugin;
  module.exports.default = accentThemePlugin;
}
