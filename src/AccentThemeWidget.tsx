"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAccentTheme, useAccentColor } from "./AccentThemeProvider";
import type { AccentColor, AccentThemeWidgetProps } from "./types";

const CheckIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "100%", height: "100%" }}>
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const PaletteIcon = (): React.JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: "14px", height: "14px" }}>
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

export function AccentThemeWidget({
  className = "",
  title = "Theme Color",
  subtitle = "Choose your preferred accent color",
  position = "top-right",
  offset = 20,
  defaultOpen = true,
  collapsible = true,
  showCurrent = true,
  onChange,
}: AccentThemeWidgetProps): React.JSX.Element {
  const { accentColor, setAccentColor, mounted, colors } = useAccentTheme();
  const { primary } = useAccentColor();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!collapsible || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, collapsible]);

  const placementStyle = useMemo((): React.CSSProperties => {
    if (position === "inline") {
      return { position: "relative", display: "inline-block" };
    }

    const base: React.CSSProperties = { position: "fixed", zIndex: 80 };
    if (position === "top-right") base.top = `${offset}px`, base.right = `${offset}px`;
    if (position === "top-left") base.top = `${offset}px`, base.left = `${offset}px`;
    if (position === "bottom-right") base.bottom = `${offset}px`, base.right = `${offset}px`;
    if (position === "bottom-left") base.bottom = `${offset}px`, base.left = `${offset}px`;
    return base;
  }, [position, offset]);

  const handleColorChange = (color: AccentColor) => {
    setAccentColor(color);
    onChange?.(color);
  };

  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          ...placementStyle,
          width: "228px",
          height: "196px",
          borderRadius: "14px",
          background: "rgba(31,41,55,0.75)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      />
    );
  }

  return (
    <div className={className} style={placementStyle} ref={panelRef}>
      {collapsible ? (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle theme color panel"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "9999px",
            border: "1px solid rgba(168,85,247,0.45)",
            background: "radial-gradient(circle at 35% 30%, rgba(168,85,247,0.42), rgba(15,23,42,0.9))",
            color: "#c4b5fd",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            marginLeft: position.endsWith("left") ? 0 : "auto",
            marginBottom: isOpen ? "8px" : 0,
            boxShadow: "0 8px 24px rgba(76,29,149,0.35)",
          }}
        >
          <PaletteIcon />
        </button>
      ) : null}

      {isOpen ? (
        <div
          role="dialog"
          aria-label="Theme color picker"
          style={{
            width: "228px",
            padding: "12px",
            borderRadius: "14px",
            background: "linear-gradient(180deg, rgba(30,41,59,0.96), rgba(15,23,42,0.96))",
            border: "1px solid rgba(100,116,139,0.45)",
            boxShadow: "0 24px 50px rgba(2,6,23,0.5)",
            color: "#f8fafc",
            backdropFilter: "blur(14px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "12px" }}>
            <div
              aria-hidden
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "9999px",
                border: "1px solid rgba(168,85,247,0.45)",
                display: "grid",
                placeItems: "center",
                color: "#c4b5fd",
              }}
            >
              <PaletteIcon />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.15 }}>{title}</p>
              <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>{subtitle}</p>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "12px",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "8px",
            }}
          >
            {Object.entries(colors).map(([color, config]) => {
              const selected = accentColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  title={config.name}
                  aria-label={`Select ${config.name}`}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    background: `hsl(${config.primary})`,
                    boxShadow: selected
                      ? "0 0 0 2px rgba(255,255,255,0.68)"
                      : "0 0 0 1px rgba(255,255,255,0.1)",
                  }}
                >
                  {selected ? (
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "block",
                        color: "#fff",
                        padding: "10px",
                        pointerEvents: "none",
                      }}
                    >
                      <CheckIcon />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {showCurrent ? (
            <div
              style={{
                marginTop: "12px",
                paddingTop: "10px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <p style={{ margin: 0, color: "#e2e8f0", fontSize: "0.95rem" }}>
                Current: {colors[accentColor]?.name || accentColor}
              </p>
              <span
                aria-hidden
                style={{
                  width: "46px",
                  height: "20px",
                  borderRadius: "9999px",
                  background: primary,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
                }}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
