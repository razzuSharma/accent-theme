"use client";

import * as React from "react";
import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback
} from "react";
import type { 
  AccentColor, 
  AccentThemeContextType, 
  AccentThemeProviderProps 
} from "./types";
import { defaultAccentColors, mergeColors } from "./colors";

const defaultContext: AccentThemeContextType = {
  accentColor: "teal",
  setAccentColor: () => {},
  accentConfig: defaultAccentColors.teal,
  mounted: false,
};

const AccentThemeContext = createContext<AccentThemeContextType>(defaultContext);

export function AccentThemeProvider({ 
  children, 
  defaultColor = "teal",
  customColors,
  storageKey = "accent-color",
  cssVariablePrefix = ""
}: AccentThemeProviderProps) {
  const colors = mergeColors(defaultAccentColors, customColors);
  
  const [accentColor, setAccentColorState] = useState<AccentColor>(defaultColor);
  const [mounted, setMounted] = useState(false);

  // Get CSS variable names
  const getVarName = (name: string) => {
    return cssVariablePrefix ? `${cssVariablePrefix}-${name}` : name;
  };

  useEffect(() => {
    setMounted(true);
    // Check local storage
    const stored = localStorage.getItem(storageKey) as AccentColor;
    if (stored && colors[stored]) {
      setAccentColorState(stored);
    }
  }, [storageKey, colors]);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const config = colors[accentColor];
    
    if (!config) return;
    
    // Update CSS variables
    root.style.setProperty(`--${getVarName('primary')}`, config.primary);
    root.style.setProperty(`--${getVarName('primary-foreground')}`, config.primaryForeground);
    root.style.setProperty(`--${getVarName('ring')}`, config.light);
    root.style.setProperty(`--${getVarName('accent')}`, config.light);
    
    // Store preference
    localStorage.setItem(storageKey, accentColor);
    
    // Add data attribute for Tailwind selectors
    root.setAttribute(`data-${getVarName('accent')}`, accentColor);
  }, [accentColor, mounted, colors, cssVariablePrefix, getVarName]);

  const setAccentColor = useCallback((color: AccentColor) => {
    if (colors[color]) {
      setAccentColorState(color);
    } else {
      console.warn(`[AccentTheme] Color "${color}" not found in available colors`);
    }
  }, [colors]);

  const value: AccentThemeContextType = {
    accentColor,
    setAccentColor,
    accentConfig: colors[accentColor] || colors[defaultColor],
    mounted,
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
  const { accentConfig, mounted } = useAccentTheme();
  
  return {
    primary: `hsl(${accentConfig.primary})`,
    primaryForeground: `hsl(${accentConfig.primaryForeground})`,
    light: `hsl(${accentConfig.light})`,
    dark: `hsl(${accentConfig.dark})`,
    gradient: accentConfig.gradient,
    mounted,
  };
}
