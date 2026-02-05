"use client";

import * as React from "react";
import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback,
  useMemo
} from "react";
import type { 
  AccentColor, 
  AccentThemeContextType, 
  AccentThemeProviderProps 
} from "./types";
import { defaultAccentColors, mergeColors } from "./colors";

const STYLE_ID = 'accent-theme-base-styles';

const defaultContext: AccentThemeContextType = {
  accentColor: "teal",
  setAccentColor: () => {},
  accentConfig: defaultAccentColors.teal,
  mounted: false,
  defaultColor: "teal",
  resetToDefault: () => {},
};

const AccentThemeContext = createContext<AccentThemeContextType>(defaultContext);

// Base CSS that gets injected automatically
const BASE_CSS = `
  :root {
    --primary: 174 72% 35%;
    --primary-foreground: 210 40% 98%;
    --accent: 174 72% 45%;
    --ring: 174 72% 45%;
  }
  
  .dark {
    --primary: 174 72% 45%;
    --primary-foreground: 210 40% 98%;
    --accent: 174 72% 55%;
    --ring: 174 72% 55%;
  }
`;

// Detect if dark mode is active
function detectDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  const root = document.documentElement;
  
  // Check various dark mode indicators
  const isDark = 
    root.classList.contains('dark') ||
    root.getAttribute('data-theme') === 'dark' ||
    root.getAttribute('data-mode') === 'dark' ||
    document.body.classList.contains('dark') ||
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  return isDark;
}

export function AccentThemeProvider({ 
  children, 
  defaultColor = "teal",
  customColors,
  storageKey = "accent-color",
  cssVariablePrefix = "",
  injectCSS = true,
  enableDarkMode = true,
}: AccentThemeProviderProps) {
  const colors = useMemo(() => mergeColors(defaultAccentColors, customColors), [customColors]);
  
  const [accentColor, setAccentColorState] = useState<AccentColor>(defaultColor);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Get CSS variable names
  const getVarName = useCallback((name: string) => {
    return cssVariablePrefix ? `${cssVariablePrefix}-${name}` : name;
  }, [cssVariablePrefix]);

  // Inject base CSS on mount
  useEffect(() => {
    if (!injectCSS || typeof document === 'undefined') return;
    
    // Check if styles already exist
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = BASE_CSS;
      document.head.appendChild(style);
    }
  }, [injectCSS]);

  // Initialize from localStorage and detect dark mode
  useEffect(() => {
    setMounted(true);
    
    // Check local storage
    const stored = localStorage.getItem(storageKey) as AccentColor;
    if (stored && colors[stored]) {
      setAccentColorState(stored);
    }
    
    // Detect dark mode
    if (!enableDarkMode) return;
    
    setIsDark(detectDarkMode());
    
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(detectDarkMode());
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-mode']
    });
    
    return () => observer.disconnect();
  }, [storageKey, colors, enableDarkMode, defaultColor]);

  // Update CSS variables when color changes
  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;
    
    const root = document.documentElement;
    const config = colors[accentColor];
    
    if (!config) return;
    
    // Adjust colors for dark mode if enabled
    const primary = isDark && enableDarkMode ? config.light : config.primary;
    const accent = isDark && enableDarkMode ? config.light : config.light;
    
    // Update CSS variables
    root.style.setProperty(`--${getVarName('primary')}`, primary);
    root.style.setProperty(`--${getVarName('primary-foreground')}`, config.primaryForeground);
    root.style.setProperty(`--${getVarName('ring')}`, accent);
    root.style.setProperty(`--${getVarName('accent')}`, accent);
    
    // Store preference
    localStorage.setItem(storageKey, accentColor);
    
    // Add data attribute for Tailwind selectors
    root.setAttribute(`data-${getVarName('accent')}`, accentColor);
    
    // Dispatch custom event for external listeners
    window.dispatchEvent(new CustomEvent('accentthemechange', { 
      detail: { color: accentColor, config, isDark } 
    }));
  }, [accentColor, mounted, colors, cssVariablePrefix, getVarName, isDark, enableDarkMode, storageKey]);

  const setAccentColor = useCallback((color: AccentColor) => {
    if (colors[color]) {
      setAccentColorState(color);
    } else {
      console.warn(`[AccentTheme] Color "${color}" not found in available colors`);
    }
  }, [colors]);

  const resetToDefault = useCallback(() => {
    setAccentColorState(defaultColor);
    localStorage.removeItem(storageKey);
  }, [defaultColor, storageKey]);

  const value: AccentThemeContextType = {
    accentColor,
    setAccentColor,
    accentConfig: colors[accentColor] || colors[defaultColor],
    mounted,
    defaultColor,
    resetToDefault,
  };

  return React.createElement(
    AccentThemeContext.Provider,
    { value },
    children
  );
}

export function useAccentTheme() {
  return useContext(AccentThemeContext);
}

// Utility hook for getting color values
export function useAccentColor() {
  const context = useAccentTheme();
  const { accentConfig, mounted } = context;
  
  // Get dark mode from detectDarkMode for the hook
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    setIsDark(detectDarkMode());
    
    const observer = new MutationObserver(() => {
      setIsDark(detectDarkMode());
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-mode']
    });
    
    return () => observer.disconnect();
  }, []);
  
  return {
    primary: `hsl(${accentConfig.primary})`,
    primaryForeground: `hsl(${accentConfig.primaryForeground})`,
    light: `hsl(${accentConfig.light})`,
    dark: `hsl(${accentConfig.dark})`,
    gradient: accentConfig.gradient,
    mounted,
    isDark,
  };
}

// Hook to detect dark mode
export function useAccentDarkMode() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    setIsDark(detectDarkMode());
    
    const observer = new MutationObserver(() => {
      setIsDark(detectDarkMode());
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-mode']
    });
    
    return () => observer.disconnect();
  }, []);
  
  return isDark;
}
