import React, { useRef, useState, useEffect } from "react";
import { THEMES, useAppTheme } from "../../contexts/ThemeContext";

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useAppTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="테마 변경"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.35rem 0.75rem",
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--color-header-border)",
          background: "transparent",
          color: "var(--color-header-text)",
          cursor: "pointer",
          fontSize: "0.78rem",
          fontWeight: 600,
          fontFamily: "var(--font-family)",
          transition: "all var(--transition-base)",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--color-primary-pale)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        <ThemeDot color={current.preview.primary} />
        <span>{current.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--transition-base)",
            opacity: 0.6,
          }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 0.4rem)",
            background: "var(--color-bg-primary)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            zIndex: "var(--z-dropdown)",
            overflow: "hidden",
            minWidth: "11rem",
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                width: "100%",
                padding: "0.55rem 0.9rem",
                background: theme === t.id ? "var(--color-primary-pale)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                if (theme !== t.id)
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-tertiary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  theme === t.id ? "var(--color-primary-pale)" : "transparent";
              }}
            >
              <ThemeSwatch theme={t} />
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: theme === t.id ? 700 : 600,
                    color: theme === t.id ? "var(--color-primary)" : "var(--color-text-primary)",
                    fontFamily: "var(--font-family)",
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-family)",
                  }}
                >
                  {t.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ThemeDot: React.FC<{ color: string }> = ({ color }) => (
  <span
    style={{
      display: "inline-block",
      width: "0.55rem",
      height: "0.55rem",
      borderRadius: "999px",
      background: color,
      flexShrink: 0,
    }}
  />
);

const ThemeSwatch: React.FC<{ theme: (typeof THEMES)[number] }> = ({ theme: t }) => (
  <div
    style={{
      display: "flex",
      borderRadius: "0.3rem",
      overflow: "hidden",
      flexShrink: 0,
      width: "1.6rem",
      height: "1.6rem",
      border: "1px solid rgba(0,0,0,0.1)",
    }}
  >
    <div style={{ flex: 1, background: t.preview.bg }} />
    <div style={{ flex: 1, background: t.preview.primary }} />
    <div style={{ flex: 1, background: t.preview.accent }} />
  </div>
);

export default ThemeSwitch;
