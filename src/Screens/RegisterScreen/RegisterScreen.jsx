import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import { register } from "../../services/authService";
import { ThemeToggle } from "../../components/ThemeToggle";
import "../../theme.css";
import "../LoginScreen/LoginScreen.css";

export const RegisterScreen = () => {
  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const initial_form_state = {
    nombre: "",
    email: "",
    password: "",
  };

  async function onSubmit(formData) {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await register(
        formData.nombre,
        formData.email,
        formData.password,
      );

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      setSuccessMessage(
        "¡Cuenta creada! Revisá tu email y confirmá tu dirección antes de iniciar sesión.",
      );
    } catch (error) {
      setErrorMessage("Ocurrió un error al registrarte. Intentá de nuevo.");
    }
  }

  const { formState, handleChange, handleSubmit } = useForm(
    initial_form_state,
    onSubmit,
  );

  return (
    <div className="auth-screen">
      <ThemeToggle />

      <div className="auth-card">
        <p className="auth-eyebrow">Notas personales</p>
        <h1 className="auth-title">Crear cuenta</h1>

        {error_message && <p className="auth-error">{error_message}</p>}
        {success_message && <p className="auth-success">{success_message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formState.nombre}
              onChange={handleChange}
            />
          </div>
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
          <button className="auth-submit">Crear cuenta</button>
        </form>

        <p className="auth-footer">
          {success_message ? (
            <Link to="/login">Ir a iniciar sesión →</Link>
          ) : (
            <>
              ¿Ya tenés cuenta?
              <Link to="/login">Iniciar sesión</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
