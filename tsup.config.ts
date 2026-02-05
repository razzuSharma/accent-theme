import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig([
  // Main package build
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    onSuccess: async () => {
      // Copy CSS file to dist
      const srcDir = join(__dirname, 'src');
      const distDir = join(__dirname, 'dist');
      
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }
      
      // Copy styles.css
      try {
        copyFileSync(
          join(srcDir, 'styles.css'),
          join(distDir, 'styles.css')
        );
        console.log('✓ Copied styles.css to dist');
      } catch (err) {
        console.error('Failed to copy styles.css:', err);
      }
    },
  },
  // Tailwind plugin build
  {
    entry: ['src/tailwind.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist',
    external: ['tailwindcss', 'react', 'react-dom'],
    banner: {
      js: '// Tailwind plugin for accent-theme\n',
    },
  },
]);
