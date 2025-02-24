"use client";

import Cookies from "js-cookie";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { SkeletonTheme } from "react-loading-skeleton";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mainTheme = process.env.NEXT_PUBLIC_THEME_DEFAULT!;
  const alterTheme = process.env.NEXT_PUBLIC_THEME_ALTERNATIVE!;
  const [theme, setTheme] = useState("");

  const skeletonColors = {
    baseColor: "var(--skeleton-base-color)",
    highlightColor: "var(--skeleton-highlight-color)",
  };

  useEffect(() => {
    const savedTheme = Cookies.get("theme") || mainTheme;
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, [mainTheme]);

  const toggleTheme = () => {
    const newTheme = theme === mainTheme ? alterTheme : mainTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    Cookies.set("theme", newTheme, { expires: 999999 });
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SkeletonTheme {...skeletonColors}>{children}</SkeletonTheme>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
