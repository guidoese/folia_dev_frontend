import { useEffect, useState } from "react";

/*
  Maneja el theme (claro/oscuro) de toda la app.
  Lo guardamos en localStorage para que se mantenga entre recargas,
  y lo aplicamos como atributo data-theme en <html> para que
  las variables CSS de theme.css reaccionen automáticamente.
*/
function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved_theme = localStorage.getItem("theme");
    if (saved_theme) return saved_theme;

    // Si el usuario no eligió nada todavía, respetamos su preferencia de sistema
    const prefers_dark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefers_dark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return { theme, toggleTheme };
}

export default useTheme;
