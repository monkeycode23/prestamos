// src/renderer/context/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Creamos el contexto, valor inicial = null
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isInitialized, setIsInitialized] = useState(false);

  // Al montar, leemos del localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const initial = saved || "light";
    setTheme(initial);
    setIsInitialized(true);
  }, []);

  // Cuando cambia theme tras la inicialización, lo guardamos y aplicamos clase
  useEffect(() => {
    if (!isInitialized) return;
    window.localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, isInitialized]);

  // Alternamos el tema
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook para consumir el contexto
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return ctx;
}
