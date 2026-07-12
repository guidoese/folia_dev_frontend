import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { resetPassword } from "../../services/authService";
import { ThemeToggle } from "../../components/ThemeToggle";
import "../../theme.css";
import "../LoginScreen/LoginScreen.css";

export const ResetPasswordScreen = () => {
  const [search_params] = useSearchParams();
  const navigate = useNavigate();
  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");

  const initial_form_state = {
    password: "",
    confirm_password: "",
  };

  async function onSubmit(formData) {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      // Validación de contraseñas coincidentes — se hace en el front
      // antes de enviar cualquier cosa al backend
      if (formData.password !== formData.confirm_password) {
        setErrorMessage("Las contraseñas no coinciden");
        return;
      }

      const reset_token = search_params.get("reset_token");

      if (!reset_token) {
        setErrorMessage("El enlace de restablecimiento es inválido.");
        return;
      }

      const response = await resetPassword(reset_token, formData.password);

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      setSuccessMessage("¡Contraseña actualizada con éxito!");
      setTimeout(() => navigate("/login", { replace: true }), 2000);
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
        <h1 className="auth-title">Nueva contraseña</h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-ink-soft)",
            marginTop: 0,
            marginBottom: "1.5rem",
          }}
        >
          Elegí una contraseña nueva para tu cuenta. Debe tener al menos 6
          caracteres.
        </p>

        {error_message && <p className="auth-error">{error_message}</p>}
        {success_message && <p className="auth-success">{success_message}</p>}

        {!success_message && (
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="password">Nueva contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="confirm_password">Repetir contraseña</label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formState.confirm_password}
                onChange={handleChange}
              />
            </div>
            <button className="auth-submit" type="submit">
              Guardar contraseña
            </button>
          </form>
        )}

        {success_message && (
          <p className="auth-footer">Te redirigimos al inicio de sesión...</p>
        )}
      </div>
    </div>
  );
};
