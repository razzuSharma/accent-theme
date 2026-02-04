"use client";

import * as React from "react";
import { useState } from "react";
import { useAccentTheme, useAccentColor } from "./AccentThemeProvider";
import { defaultAccentColors } from "./colors";
import { AccentColor } from "./types";

interface AccentColorPickerProps {
  /** Size of the color swatches */
  size?: "sm" | "md" | "lg";
  /** Show as a dropdown or inline grid */
  variant?: "dropdown" | "inline";
  /** Number of columns for inline variant */
  columns?: number;
  /** Custom className */
  className?: string;
  /** Callback when color changes */
  onChange?: (color: AccentColor) => void;
}

export function AccentColorPicker({
  size = "md",
  variant = "dropdown",
  columns = 4,
  className = "",
  onChange,
}: AccentColorPickerProps) {
  const { accentColor, setAccentColor, mounted } = useAccentTheme();
  const { primary } = useAccentColor();
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (color: AccentColor) => {
    setAccentColor(color);
    onChange?.(color);
    if (variant === "dropdown") {
      setIsOpen(false);
    }
  };

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const selectedSizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  if (!mounted) {
    return React.createElement("div", {
      className: `animate-pulse bg-gray-200 rounded-full ${sizeClasses[size]}`
    });
  }

  // Inline variant - show all colors
  if (variant === "inline") {
    return React.createElement("div", {
      className: `grid gap-2 ${className}`,
      style: { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
    }, Object.entries(defaultAccentColors).map(([color, config]) => {
      const isSelected = accentColor === color;
      return React.createElement("button", {
        key: color,
        onClick: () => handleColorChange(color),
        className: `
          relative rounded-full transition-all duration-200
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${isSelected ? `ring-2 ring-offset-2 scale-110 ${selectedSizeClasses[size]}` : sizeClasses[size]}
        `,
        style: {
          background: `hsl(${config.primary})`,
          ['--tw-ring-color' as string]: `hsl(${config.light})`,
        },
        title: config.name,
        'aria-label': `Select ${config.name} theme`,
        'aria-pressed': isSelected,
      }, isSelected && React.createElement("svg", {
        className: "absolute inset-0 w-full h-full p-1.5 text-white",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, React.createElement("path", {
        fillRule: "evenodd",
        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
        clipRule: "evenodd"
      })));
    }));
  }

  // Dropdown variant
  return React.createElement("div", { className: `relative ${className}` },
    React.createElement("button", {
      onClick: () => setIsOpen(!isOpen),
      className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
      'aria-expanded': isOpen,
      'aria-haspopup': "listbox"
    }, [
      React.createElement("div", {
        key: "swatch",
        className: "w-5 h-5 rounded-full",
        style: { background: primary }
      }),
      React.createElement("span", {
        key: "label",
        className: "text-sm font-medium text-gray-700 dark:text-gray-300"
      }, "Theme"),
      React.createElement("svg", {
        key: "chevron",
        className: `w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
      }, React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M19 9l-7 7-7-7"
      }))
    ]),
    isOpen && React.createElement(React.Fragment, {}, [
      React.createElement("div", {
        key: "backdrop",
        className: "fixed inset-0 z-40",
        onClick: () => setIsOpen(false)
      }),
      React.createElement("div", {
        key: "dropdown",
        className: "absolute right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 min-w-[200px]",
        role: "listbox"
      }, [
        React.createElement("div", {
          key: "grid",
          className: "grid grid-cols-4 gap-2"
        }, Object.entries(defaultAccentColors).map(([color, config]) => {
          const isSelected = accentColor === color;
          return React.createElement("button", {
            key: color,
            onClick: () => handleColorChange(color),
            className: `
              relative w-10 h-10 rounded-lg transition-all duration-200
              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isSelected ? "ring-2 ring-offset-2 scale-105" : ""}
            `,
            style: {
              background: `hsl(${config.primary})`,
              ['--tw-ring-color' as string]: `hsl(${config.light})`,
            },
            title: config.name,
            role: "option",
            'aria-selected': isSelected
          }, isSelected && React.createElement("svg", {
            className: "absolute inset-0 w-full h-full p-2 text-white",
            viewBox: "0 0 20 20",
            fill: "currentColor"
          }, React.createElement("path", {
            fillRule: "evenodd",
            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
            clipRule: "evenodd"
          })));
        })),
        React.createElement("div", {
          key: "footer",
          className: "mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"
        }, React.createElement("p", {
          className: "text-xs text-gray-500 dark:text-gray-400 text-center"
        }, `Current: ${defaultAccentColors[accentColor]?.name || accentColor}`))
      ])
    ])
  );
}

// Simple swatch component
interface AccentColorSwatchProps {
  color: AccentColor;
  isSelected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export function AccentColorSwatch({ 
  color, 
  isSelected, 
  onClick,
  size = "md"
}: AccentColorSwatchProps) {
  const config = defaultAccentColors[color];
  if (!config) return null;

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return React.createElement("button", {
    onClick,
    className: `
      relative rounded-full transition-all duration-200
      hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
      ${sizeClasses[size]}
      ${isSelected ? "ring-2 ring-offset-2 scale-110" : ""}
    `,
    style: {
      background: `hsl(${config.primary})`,
      ['--tw-ring-color' as string]: `hsl(${config.light})`,
    },
    title: config.name
  }, isSelected && React.createElement("svg", {
    className: "absolute inset-0 w-full h-full p-1.5 text-white",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, React.createElement("path", {
    fillRule: "evenodd",
    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  })));
}
