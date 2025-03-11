import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type BackgroundTheme = "space" | "gradient";

interface ThemeContextType {
  theme: Theme;
  backgroundTheme: BackgroundTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>("space");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setBackgroundTheme((prev) => (prev === "space" ? "gradient" : "space"));
  };

  return (
    <ThemeContext.Provider value={{ theme, backgroundTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
