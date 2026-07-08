import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "../../components/ThemeToggle";
import "../../theme.css";
import "./LoginScreen.css";

export const LoginScreen = () => {
  const [error_message, setErrorMessage] = useState("");
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  const initial_form_state = {
    email: "",
    password: "",
  };

  async function onSubmit(formData) {
    try {
      setErrorMessage("");
      const response = await login(formData.email, formData.password);

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      saveToken(response.data.access_token);
      navigate("/home"); // o "/notas" si decidimos crear esa pantalla aparte
    } catch (error) {
      setErrorMessage("Ocurrió un error al iniciar sesión. Intentá de nuevo.");
    }
  }

  const { formState, handleChange, handleSubmit } = useForm(
    initial_form_state,
    onSubmit,
  );

  return (
    <div className="auth-screen">
      <ThemeToggle className="theme-toggle--floating" />

      <div className="auth-card">
        <p className="auth-eyebrow">Notas personales</p>
        <h1 className="auth-title">Iniciar sesión</h1>

        {error_message && <p className="auth-error">{error_message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <button className="auth-submit">Iniciar sesión</button>
        </form>
        <p style={{ textAlign: "right", margin: "0.5rem 0 0" }}>
          <Link
            to="/forgot-password"
            style={{
              fontSize: "0.85rem",
              color: "var(--color-accent)",
              textDecoration: "none",
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
        <p className="auth-footer">
          ¿No tenés cuenta?
          <Link to="/register">Registrate</Link>
        </p>
      </div>
    </div>
  );
};
