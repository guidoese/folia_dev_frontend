import React from "react";
import useTheme from "../hooks/useTheme";

export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={
        theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
      }
      title={theme === "light" ? "Modo oscuro" : "Modo claro"}
      type="button"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};
