import React, { useState } from "react";
import { Link } from "react-router";
import useForm from "../../hooks/useForm";
import { forgotPassword } from "../../services/authService";
import { ThemeToggle } from "../../components/ThemeToggle";
import "../../theme.css";
import "../LoginScreen/LoginScreen.css";

export const ForgotPasswordScreen = () => {
  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");

  const initial_form_state = { email: "" };

  async function onSubmit(formData) {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await forgotPassword(formData.email);

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      // Siempre mostramos el mismo mensaje para no revelar si el email existe
      setSuccessMessage(
        "Si el email está registrado, vas a recibir un enlace en tu casilla. Revisá también la carpeta de spam.",
      );
    } catch (error) {
      setErrorMessage("Ocurrió un error. Intentá de nuevo.");
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
        <p className="auth-eyebrow">Folia</p>
        <h1 className="auth-title">Olvidé mi contraseña</h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-ink-soft)",
            marginTop: 0,
            marginBottom: "1.5rem",
          }}
        >
          Ingresá tu email y te mandamos un enlace para crear una nueva
          contraseña.
        </p>

        {error_message && <p className="auth-error">{error_message}</p>}
        {success_message && <p className="auth-success">{success_message}</p>}

        {!success_message && (
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
            <button className="auth-submit" type="submit">
              Enviar enlace
            </button>
          </form>
        )}

        <p className="auth-footer">
          <Link to="/login">← Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  );
};
