import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Al iniciar, intentamos recuperar el token guardado de una sesión anterior
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token"),
  );

  function saveToken(new_token) {
    localStorage.setItem("access_token", new_token);
    setToken(new_token);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setToken(null);
  }

  const value = {
    token,
    isAuthenticated: !!token,
    saveToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar el contexto fácilmente en cualquier componente
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
