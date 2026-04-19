import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeVariant = "meridian" | "obsidian" | "nimbus";

export interface ThemeInfo {
  id: ThemeVariant;
  label: string;
  desc: string;
  preview: { bg: string; primary: string; accent: string };
}

export const THEMES: ThemeInfo[] = [
  {
    id: "meridian",
    label: "Meridian",
    desc: "학술적 권위",
    preview: { bg: "#f6f2eb", primary: "#1b3d6e", accent: "#b07d28" },
  },
  {
    id: "obsidian",
    label: "Obsidian",
    desc: "다크 인텔리전스",
    preview: { bg: "#0d1117", primary: "#818cf8", accent: "#34d399" },
  },
  {
    id: "nimbus",
    label: "Nimbus",
    desc: "클린 거버넌스",
    preview: { bg: "#f1f5f9", primary: "#1d4ed8", accent: "#0284c7" },
  },
];

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  themeInfo: ThemeInfo;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "meridian",
  setTheme: () => {},
  themeInfo: THEMES[0],
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeVariant>(() => {
    const saved = localStorage.getItem("ahp-theme") as ThemeVariant | null;
    return saved && THEMES.some((t) => t.id === saved) ? saved : "meridian";
  });

  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    localStorage.setItem("ahp-theme", newTheme);
  };

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "meridian") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const themeInfo = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeInfo }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
