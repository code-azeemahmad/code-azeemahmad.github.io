import * as React from "react";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "portfolio_theme";

export function useTheme() {
  const [theme, setThemeState] = React.useState<Theme>("dark");

  React.useEffect(() => {
    // Read persisted theme or default to "dark"
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const initialTheme: Theme = saved === "light" ? "light" : "dark";
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (t: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", t);
    if (t === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem(THEME_STORAGE_KEY, t);
    applyTheme(t);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === "dark",
  };
}
