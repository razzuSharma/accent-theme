"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useAccentTheme, useAccentColor } from "./AccentThemeProvider";
import { defaultAccentColors } from "./colors";
import type { 
  AccentColor, 
  AccentColorPickerProps,
  AccentColorSwatchesProps,
  AccentColorMenuProps,
  AccentColorButtonProps,
  AccentThemeResetProps,
  CurrentAccentIndicatorProps,
  AccentColorGridProps,
  AccentColorSwatchProps
} from "./types";

// Size mappings
const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

const gapClasses = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
};

// Checkmark icon component
const CheckmarkIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Chevron icon
const ChevronIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Palette icon
const PaletteIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 3a9 9 0 100 18h1.4a2.6 2.6 0 000-5.2H11a1.5 1.5 0 010-3h4.8a3.2 3.2 0 003.2-3.2C19 6 15.9 3 12 3z"
    />
    <circle cx="7.5" cy="10.2" r="1" />
    <circle cx="10.5" cy="7.5" r="1" />
    <circle cx="14.2" cy="7.3" r="1" />
  </svg>
);

// Reset icon
const ResetIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Individual swatch component
export function AccentColorSwatch({ 
  color, 
  isSelected, 
  onClick,
  size = "md",
  className = "",
  showCheckmark = true,
}: AccentColorSwatchProps) {
  const { colors } = useAccentTheme();
  const config = colors[color] || defaultAccentColors[color];
  if (!config) return null;

  return React.createElement("button", {
    type: "button",
    onClick,
    className: `
      relative rounded-full transition-all duration-200 flex-shrink-0
      hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-offset-white dark:focus:ring-offset-gray-900
      ${sizeClasses[size]}
      ${isSelected ? "ring-2 ring-offset-2 scale-110" : ""}
      ${className}
    `,
    style: {
      background: `hsl(${config.primary})`,
      ['--tw-ring-color' as string]: `hsl(${config.light})`,
    },
    title: config.name,
    "aria-label": `Select ${config.name} theme`,
    "aria-pressed": isSelected,
  }, isSelected && showCheckmark && React.createElement(CheckmarkIcon, {
    className: "absolute inset-0 w-full h-full p-1.5 text-white drop-shadow-md"
  }));
}

// Main color picker with multiple variants
export function AccentColorPicker({
  size = "md",
  variant = "dropdown",
  columns = 4,
  className = "",
  align = "end",
  onChange,
  label = "Theme",
  showColorName = true,
}: AccentColorPickerProps) {
  const { accentColor, setAccentColor, mounted, colors } = useAccentTheme();
  const { primary } = useAccentColor();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (variant !== 'dropdown') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, variant]);

  const handleColorChange = (color: AccentColor) => {
    setAccentColor(color);
    onChange?.(color);
    if (variant === "dropdown") {
      setIsOpen(false);
    }
  };

  if (!mounted) {
    return React.createElement("div", {
      className: `animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${sizeClasses[size]} ${className}`
    });
  }

  // Inline variant
  if (variant === "inline") {
    return React.createElement("div", {
      className: `grid ${gapClasses.md} ${className}`,
      style: { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
    }, Object.entries(colors).map(([color]) => {
      const isSelected = accentColor === color;
      return React.createElement(AccentColorSwatch, {
        key: color,
        color: color as AccentColor,
        isSelected,
        onClick: () => handleColorChange(color),
        size,
      });
    }));
  }

  // Menu variant (uses fixed positioning for better placement)
  if (variant === "menu") {
    return React.createElement(AccentColorMenu, {
      size,
      className,
      onChange,
      label,
      align,
    });
  }

  // Dropdown variant (default)
  return React.createElement("div", { 
    ref: dropdownRef,
    className: `relative inline-block ${className}` 
  },
    React.createElement("button", {
      type: "button",
      onClick: () => setIsOpen(!isOpen),
      className: `
        flex items-center gap-2 px-3.5 py-2 rounded-full
        text-slate-100 bg-slate-900/70 backdrop-blur-md
        border border-white/10 hover:bg-slate-900/85
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-offset-slate-950 shadow-lg shadow-slate-950/30
      `,
      style: { ['--tw-ring-color' as string]: primary },
      "aria-expanded": isOpen,
      "aria-haspopup": "listbox",
    }, [
      React.createElement("div", {
        key: "swatch",
        className: "w-5 h-5 rounded-full shadow-sm ring-1 ring-white/20",
        style: { background: primary }
      }),
      showColorName && React.createElement("span", {
        key: "label",
        className: "text-sm font-medium text-slate-100"
      }, colors[accentColor]?.name || label),
      React.createElement(ChevronIcon, {
        key: "chevron",
        className: `w-4 h-4 text-rose-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`
      })
    ]),
    isOpen && React.createElement(React.Fragment, {}, [
      React.createElement("div", {
        key: "backdrop",
        className: "fixed inset-0 z-40",
        onClick: () => setIsOpen(false)
      }),
      React.createElement("div", {
        key: "dropdown",
        className: `
          absolute right-0 mt-3 p-4
          rounded-2xl z-50 min-w-[290px]
          bg-gradient-to-b from-slate-800/95 to-slate-900/95
          border border-slate-600/40
          shadow-2xl shadow-slate-950/50 backdrop-blur-xl
        `,
        role: "listbox"
      }, [
        React.createElement("div", {
          key: "header",
          className: "flex items-start gap-3 mb-3"
        }, [
          React.createElement("div", {
            key: "icon-wrap",
            className: "w-7 h-7 rounded-full grid place-items-center border border-rose-400/40 bg-rose-500/15"
          }, React.createElement(PaletteIcon, {
            className: "w-4 h-4 text-rose-300"
          })),
          React.createElement("div", { key: "titles" }, [
            React.createElement("p", {
              key: "title",
              className: "text-[1.15rem] font-semibold text-slate-100 leading-5"
            }, "Theme Color"),
            React.createElement("p", {
              key: "subtitle",
              className: "text-sm text-slate-300 mt-1"
            }, "Choose your preferred accent color")
          ])
        ]),
        React.createElement("div", {
          key: "grid",
          className: "grid grid-cols-4 gap-3 border-t border-white/10 pt-4"
        }, Object.entries(colors).map(([color, config]) => {
          const isSelected = accentColor === color;
          return React.createElement("button", {
            key: color,
            type: "button",
            onClick: () => handleColorChange(color),
            className: `
              relative w-12 h-12 rounded-xl transition-all duration-200
              hover:-translate-y-0.5 hover:brightness-110
              focus:outline-none focus:ring-2 ring-offset-0
              ${isSelected ? "ring-2 ring-white/70 scale-[1.03]" : "ring-1 ring-white/10"}
            `,
            style: {
              background: `hsl(${config.primary})`,
            },
            title: config.name,
            role: "option",
            "aria-selected": isSelected
          }, isSelected && React.createElement(CheckmarkIcon, {
            className: "absolute inset-0 w-full h-full p-3 text-white drop-shadow-md"
          }));
        })),
        React.createElement("div", {
          key: "footer",
          className: "mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-3"
        }, [
          React.createElement("p", {
            key: "current-text",
            className: "text-[1.05rem] text-slate-200"
          }, `Current: ${colors[accentColor]?.name || accentColor}`),
          React.createElement("span", {
            key: "current-pill",
            className: "w-14 h-7 rounded-full ring-1 ring-white/20",
            style: { background: primary },
            "aria-hidden": true
          })
        ])
      ])
    ])
  );
}

// Horizontal row of color swatches
export function AccentColorSwatches({
  className = "",
  size = "md",
  onChange,
  showCheckmark = true,
  gap = "md",
}: AccentColorSwatchesProps) {
  const { accentColor, setAccentColor, mounted, colors } = useAccentTheme();

  const handleColorChange = (color: AccentColor) => {
    setAccentColor(color);
    onChange?.(color);
  };

  if (!mounted) {
    return React.createElement("div", {
      className: `flex ${gapClasses[gap]} ${className}`
    }, Array(8).fill(null).map((_, i) => React.createElement("div", {
      key: i,
      className: `animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full ${sizeClasses[size]}`
    })));
  }

  return React.createElement("div", {
    className: `flex flex-wrap ${gapClasses[gap]} ${className}`
  }, Object.entries(colors).map(([color]) => {
    const isSelected = accentColor === color;
    return React.createElement(AccentColorSwatch, {
      key: color,
      color: color as AccentColor,
      isSelected,
      onClick: () => handleColorChange(color),
      size,
      showCheckmark,
    });
  }));
}

// Menu dropdown component
export function AccentColorMenu({
  className = "",
  size: _size = "md",
  onChange,
  align = "end",
  label = "Theme",
}: AccentColorMenuProps) {
  const { accentColor, setAccentColor, mounted, colors } = useAccentTheme();
  const { primary } = useAccentColor();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleColorChange = (color: AccentColor) => {
    setAccentColor(color);
    onChange?.(color);
    setIsOpen(false);
  };

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  if (!mounted) {
    return React.createElement("div", {
      className: `animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-24 h-9 ${className}`
    });
  }

  return React.createElement("div", { 
    ref: menuRef,
    className: `relative inline-block ${className}` 
  },
    React.createElement("button", {
      type: "button",
      onClick: () => setIsOpen(!isOpen),
      className: `
        flex items-center gap-2 px-3 py-2 rounded-lg 
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        hover:bg-gray-50 dark:hover:bg-gray-700 
        transition-colors focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
      `,
      style: { ['--tw-ring-color' as string]: primary },
      "aria-expanded": isOpen,
    }, [
      React.createElement("div", {
        key: "swatch",
        className: `${sizeClasses.sm} rounded-full shadow-sm`,
        style: { background: primary }
      }),
      React.createElement("span", {
        key: "label",
        className: "text-sm font-medium text-gray-700 dark:text-gray-300"
      }, label),
      React.createElement(ChevronIcon, {
        key: "chevron",
        className: `w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`
      })
    ]),
    isOpen && React.createElement("div", {
      className: `
        absolute top-full mt-2 p-2 
        bg-white dark:bg-gray-800 
        rounded-lg shadow-xl 
        border border-gray-200 dark:border-gray-700 
        z-50 min-w-[160px]
        ${alignClasses[align]}
      `
    }, Object.entries(colors).map(([color, config]) => {
      const isSelected = accentColor === color;
      return React.createElement("button", {
        key: color,
        type: "button",
        onClick: () => handleColorChange(color),
        className: `
          w-full flex items-center gap-3 px-3 py-2 rounded-md
          transition-colors
          ${isSelected ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"}
        `,
      }, [
        React.createElement("div", {
          key: "dot",
          className: `w-4 h-4 rounded-full flex-shrink-0`,
          style: { background: `hsl(${config.primary})` }
        }),
        React.createElement("span", {
          key: "name",
          className: `text-sm ${isSelected ? "font-medium text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"}`
        }, config.name),
        isSelected && React.createElement(CheckmarkIcon, {
          key: "check",
          className: "w-4 h-4 ml-auto text-gray-500 dark:text-gray-400"
        })
      ]);
    }))
  );
}

// Button showing current accent color
export function AccentColorButton({
  className = "",
  size = "md",
  onClick,
  showLabel = false,
  buttonVariant = "default",
}: AccentColorButtonProps) {
  const { accentColor, mounted, colors } = useAccentTheme();
  const { primary } = useAccentColor();
  const colorConfig = colors[accentColor] || defaultAccentColors[accentColor];

  const variantClasses = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
    outline: "border-2 border-current hover:bg-gray-50 dark:hover:bg-gray-800",
  };

  const sizeStyles = {
    sm: { button: "p-1.5", dot: "w-4 h-4" },
    md: { button: "p-2", dot: "w-5 h-5" },
    lg: { button: "p-2.5", dot: "w-6 h-6" },
  };

  if (!mounted) {
    return React.createElement("div", {
      className: `animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${sizeStyles[size].button}`
    });
  }

  return React.createElement("button", {
    type: "button",
    onClick,
    className: `
      inline-flex items-center gap-2 rounded-lg 
      transition-colors focus:outline-none focus:ring-2 
      focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
      ${variantClasses[buttonVariant]}
      ${sizeStyles[size].button}
      ${className}
    `,
    style: { ['--tw-ring-color' as string]: primary },
    title: colorConfig?.name || accentColor,
  }, [
    React.createElement("div", {
      key: "dot",
      className: `${sizeStyles[size].dot} rounded-full shadow-sm`,
      style: { background: primary }
    }),
    showLabel && React.createElement("span", {
      key: "label",
      className: "text-sm font-medium text-gray-700 dark:text-gray-300"
    }, colorConfig?.name || accentColor)
  ]);
}

// Reset to default button
export function AccentThemeReset({
  className = "",
  size = "md",
  text = "Reset",
  onReset,
  variant = "button",
}: AccentThemeResetProps) {
  const { defaultColor, resetToDefault, mounted, accentColor } = useAccentTheme();
  const { primary } = useAccentColor();
  
  const isDefault = accentColor === defaultColor;

  const handleReset = () => {
    resetToDefault();
    onReset?.();
  };

  const sizeStyles = {
    sm: { button: "text-xs px-2 py-1", icon: "w-3 h-3" },
    md: { button: "text-sm px-3 py-1.5", icon: "w-3.5 h-3.5" },
    lg: { button: "text-base px-4 py-2", icon: "w-4 h-4" },
  };

  const variantClasses = {
    button: `
      inline-flex items-center gap-1.5 rounded-md
      bg-gray-100 dark:bg-gray-800 
      text-gray-700 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-700
      disabled:opacity-50 disabled:cursor-not-allowed
      text-sm px-3 py-1.5
    `,
    link: `
      inline-flex items-center gap-1.5
      text-gray-500 dark:text-gray-400
      hover:text-gray-700 dark:hover:text-gray-300
      underline underline-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline
    `,
    subtle: `
      inline-flex items-center gap-1.5
      text-gray-400 dark:text-gray-500
      hover:text-gray-600 dark:hover:text-gray-400
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
  };

  if (!mounted) {
    return React.createElement("div", {
      className: `animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md w-20 h-8`
    });
  }

  return React.createElement("button", {
    type: "button",
    onClick: handleReset,
    disabled: isDefault,
    className: `
      transition-colors focus:outline-none focus:ring-2 
      focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
      ${variantClasses[variant]}
      ${className}
    `,
    style: variant === 'button' ? { ['--tw-ring-color' as string]: primary } : undefined,
    title: isDefault ? "Already using default theme" : `Reset to default theme`,
  }, [
    React.createElement(ResetIcon, {
      key: "icon",
      className: sizeStyles[size].icon
    }),
    React.createElement("span", { key: "text" }, text)
  ]);
}

// Current color indicator (non-interactive)
export function CurrentAccentIndicator({
  className = "",
  size = "md",
  showName = false,
  pulseOnChange = false,
}: CurrentAccentIndicatorProps) {
  const { accentColor, mounted, colors } = useAccentTheme();
  const { primary } = useAccentColor();
  const config = colors[accentColor] || defaultAccentColors[accentColor];
  const [isPulsing, setIsPulsing] = useState(false);
  const prevColorRef = useRef(accentColor);

  useEffect(() => {
    if (pulseOnChange && prevColorRef.current !== accentColor) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 500);
      prevColorRef.current = accentColor;
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [accentColor, pulseOnChange]);

  if (!mounted) {
    return React.createElement("div", {
      className: `flex items-center gap-2 ${className}`
    }, [
      React.createElement("div", {
        key: "dot",
        className: `animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full ${sizeClasses[size]}`
      }),
      showName && React.createElement("div", {
        key: "name",
        className: "animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-4 w-16"
      })
    ]);
  }

  return React.createElement("div", {
    className: `inline-flex items-center gap-2 ${className}`
  }, [
    React.createElement("div", {
      key: "dot",
      className: `
        ${sizeClasses[size]} rounded-full shadow-sm flex-shrink-0
        ${isPulsing ? "animate-ping" : ""}
      `,
      style: { background: primary }
    }),
    showName && React.createElement("span", {
      key: "name",
      className: "text-sm font-medium text-gray-700 dark:text-gray-300"
    }, config?.name || accentColor)
  ]);
}

// Grid layout for color selection
export function AccentColorGrid({
  className = "",
  size = "md",
  columns = 4,
  onChange,
  showLabels = false,
  gap = "md",
}: AccentColorGridProps) {
  const { accentColor, setAccentColor, mounted, colors } = useAccentTheme();

  const handleColorChange = (color: AccentColor) => {
    setAccentColor(color);
    onChange?.(color);
  };

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    8: "grid-cols-8",
  };

  if (!mounted) {
    return React.createElement("div", {
      className: `grid ${gridCols[columns]} ${gapClasses[gap]} ${className}`
    }, Array(8).fill(null).map((_, i) => React.createElement("div", {
      key: i,
      className: `animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${sizeClasses[size]}`
    })));
  }

  return React.createElement("div", {
    className: `grid ${gridCols[columns]} ${gapClasses[gap]} ${className}`
  }, Object.entries(colors).map(([color, config]) => {
    const isSelected = accentColor === color;
    
    if (showLabels) {
      return React.createElement("button", {
        key: color,
        type: "button",
        onClick: () => handleColorChange(color),
        className: `
          flex flex-col items-center gap-1.5 p-2 rounded-lg
          transition-colors
          ${isSelected ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-800"}
        `,
      }, [
        React.createElement("div", {
          key: "dot",
          className: `${sizeClasses[size]} rounded-full shadow-sm`,
          style: { background: `hsl(${config.primary})` }
        }),
        React.createElement("span", {
          key: "name",
          className: `text-xs ${isSelected ? "font-medium text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"}`
        }, config.name)
      ]);
    }

    return React.createElement(AccentColorSwatch, {
      key: color,
      color: color as AccentColor,
      isSelected,
      onClick: () => handleColorChange(color),
      size,
    });
  }));
}
