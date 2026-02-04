import { AccentColor, AccentColorConfig } from './types';

export const defaultAccentColors: Record<AccentColor, AccentColorConfig> = {
  teal: {
    name: "Teal",
    primary: "174 72% 35%",
    primaryForeground: "210 40% 98%",
    light: "174 72% 45%",
    dark: "174 72% 25%",
    gradient: "from-teal-500 to-emerald-500",
  },
  blue: {
    name: "Ocean Blue",
    primary: "217 91% 45%",
    primaryForeground: "210 40% 98%",
    light: "217 91% 55%",
    dark: "217 91% 35%",
    gradient: "from-blue-500 to-cyan-500",
  },
  purple: {
    name: "Royal Purple",
    primary: "270 60% 45%",
    primaryForeground: "210 40% 98%",
    light: "270 60% 55%",
    dark: "270 60% 35%",
    gradient: "from-purple-500 to-pink-500",
  },
  rose: {
    name: "Rose Pink",
    primary: "350 80% 50%",
    primaryForeground: "210 40% 98%",
    light: "350 80% 60%",
    dark: "350 80% 40%",
    gradient: "from-rose-500 to-pink-500",
  },
  amber: {
    name: "Sunset Amber",
    primary: "35 95% 45%",
    primaryForeground: "210 40% 98%",
    light: "35 95% 55%",
    dark: "35 95% 35%",
    gradient: "from-amber-500 to-orange-500",
  },
  emerald: {
    name: "Forest Emerald",
    primary: "150 65% 35%",
    primaryForeground: "210 40% 98%",
    light: "150 65% 45%",
    dark: "150 65% 25%",
    gradient: "from-emerald-500 to-green-500",
  },
  indigo: {
    name: "Deep Indigo",
    primary: "240 60% 50%",
    primaryForeground: "210 40% 98%",
    light: "240 60% 60%",
    dark: "240 60% 40%",
    gradient: "from-indigo-500 to-purple-500",
  },
  cyan: {
    name: "Electric Cyan",
    primary: "190 90% 45%",
    primaryForeground: "210 40% 98%",
    light: "190 90% 55%",
    dark: "190 90% 35%",
    gradient: "from-cyan-500 to-blue-500",
  },
};

export function mergeColors(
  defaultColors: Record<string, AccentColorConfig>,
  customColors?: Record<string, AccentColorConfig>
): Record<string, AccentColorConfig> {
  if (!customColors) return defaultColors;
  return { ...defaultColors, ...customColors };
}
