# Publishing @razzusharma/accent-theme

Guide for maintaining and publishing the accent-theme library.

## 📦 Package Structure

```
src/
├── index.ts              # Main exports
├── types.ts              # TypeScript types
├── colors.ts             # Default colors
├── styles.css            # Optional CSS import
├── tailwind.ts           # Tailwind plugin
├── AccentThemeProvider.tsx
├── AccentColorPicker.tsx
└── utils.ts
dist/                      # Built files (generated)
├── index.js / index.mjs
├── index.d.ts
├── tailwind.js / tailwind.mjs  # Tailwind plugin
├── tailwind.d.ts
└── styles.css            # Copied from src
```

## 🚀 Publishing Steps

### 1. Build

```bash
npm run build
```

### 2. Version Bump

```bash
# For bug fixes
npm version patch   # 2.0.0 → 2.0.1

# For new features
npm version minor   # 2.0.0 → 2.1.0

# For breaking changes
npm version major   # 2.0.0 → 3.0.0
```

### 3. Publish

```bash
npm publish --access public
```

### 4. Tag Release (GitHub)

```bash
git tag v2.0.0
git push origin v2.0.0
```

## 📋 Pre-Publish Checklist

- [ ] `npm run build` succeeds
- [ ] All TypeScript types generated (`dist/*.d.ts`)
- [ ] `dist/styles.css` copied correctly
- [ ] `CHANGELOG.md` updated
- [ ] Version bumped in package.json
- [ ] Test in a fresh project

## 🔗 Exports

The package exports:

```js
// Main
import { AccentThemeProvider } from '@razzusharma/accent-theme';

// Tailwind plugin
import { accentThemePlugin } from '@razzusharma/accent-theme/tailwind';

// CSS file
import '@razzusharma/accent-theme/styles.css';
```

## 🧪 Local Testing

```bash
# Link locally
cd /path/to/accent-theme
npm link

# In test project
cd /path/to/test-project
npm link @razzusharma/accent-theme
```

Or use `npm pack`:

```bash
cd /path/to/accent-theme
npm pack
# Install tarball in test project
npm install /path/to/accent-theme-2.0.0.tgz
```

## 📖 Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.
