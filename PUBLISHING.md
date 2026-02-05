# Publishing Your Accent Theme Library

This guide shows you how to publish your library to npm so you can use it in future projects.

## 📦 Package Structure

```
packages/accent-theme/
├── src/
│   ├── index.ts              # Main exports
│   ├── types.ts              # TypeScript types
│   ├── colors.ts             # Default colors
│   ├── AccentThemeProvider.tsx
│   ├── AccentColorPicker.tsx
│   └── utils.ts              # Utility functions
├── dist/                      # Built files (generated)
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── README.md
└── .gitignore
```

## 🚀 Publishing to npm

### 1. Create npm Account (if you don't have one)

```bash
npm adduser
# or login if you already have an account
npm login
```

### 2. Update Package Name

Edit `package.json` and change the name:

```json
{
  "name": "@razzusharma/accent-theme",
  "version": "1.0.0",
  ...
}
```

Or for a scoped package (recommended):
```json
{
  "name": "@your-org/accent-theme",
  ...
}
```

### 3. Build the Package

```bash
cd packages/accent-theme
npm run build
```

### 4. Test Locally (Optional)

Create a test project:

```bash
cd /tmp
mkdir test-accent-theme
cd test-accent-theme
npm init -y
npm install /path/to/accent-theme
```

### 5. Publish to npm

```bash
# For public packages
npm publish --access public

# For scoped packages (if private by default)
npm publish --access public

# For updates (after changing version)
npm version patch  # or minor, major
npm publish
```

### 6. Verify Installation

```bash
npm info @razzusharma/accent-theme
```

## 💻 Using in Your Projects

### Installation

```bash
npm install @razzusharma/accent-theme
# or
yarn add @razzusharma/accent-theme
# or
pnpm add @razzusharma/accent-theme
```

### Basic Usage

```tsx
import { AccentThemeProvider, useAccentColor, AccentColorPicker } from '@razzusharma/accent-theme';

// Wrap your app
function App() {
  return (
    <AccentThemeProvider defaultColor="teal">
      <YourApp />
    </AccentThemeProvider>
  );
}

// Use in components
function Button() {
  const { primary, gradient } = useAccentColor();
  
  return (
    <button style={{ background: gradient }}>
      Click me
    </button>
  );
}

// Use the picker
function Settings() {
  return <AccentColorPicker variant="inline" />;
}
```

## 🔧 Development Workflow

### Making Changes

1. Edit files in `src/`
2. Build: `npm run build`
3. Test: `npm link` or local install
4. Version bump: `npm version patch`
5. Publish: `npm publish`

### Versioning

Follow [Semantic Versioning](https://semver.org/):

- `patch` (1.0.0 → 1.0.1) - Bug fixes
- `minor` (1.0.0 → 1.1.0) - New features (backwards compatible)
- `major` (1.0.0 → 2.0.0) - Breaking changes

```bash
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

## 📋 Checklist Before Publishing

- [ ] Update `package.json` name
- [ ] Update author information
- [ ] Update repository URL
- [ ] Write good README.md
- [ ] Choose appropriate license
- [ ] Build succeeds without errors
- [ ] Types are generated correctly
- [ ] Test in a fresh project
- [ ] npm login successful

## 🌟 Best Practices

1. **Use scoped packages** (`@username/package`) to avoid name conflicts
2. **Include a README** with usage examples
3. **Add a LICENSE** file (MIT recommended)
4. **Use TypeScript** for better DX
5. **Include source maps** for debugging
6. **Test thoroughly** before each publish
7. **Document breaking changes** in major versions

## 🔗 Useful Commands

```bash
# Check if logged in
npm whoami

# View package info
npm view @razzusharma/accent-theme

# Unpublish (within 24 hours)
npm unpublish @razzusharma/accent-theme --force

# Deprecate version
npm deprecate @razzusharma/accent-theme@1.0.0 "Use 1.0.1 instead"

# Check for vulnerabilities
npm audit

# Update dependencies
npm update
```

## 🎉 Congratulations!

Your accent theme library is now published and ready to use in any project!
