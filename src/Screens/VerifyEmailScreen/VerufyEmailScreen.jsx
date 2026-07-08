import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { verifyEmail } from "../../services/authService";
import "../../theme.css";
import "../LoginScreen/LoginScreen.css";

export const VerifyEmailScreen = () => {
  const [search_params] = useSearchParams();
  const navigate = useNavigate();

  // "loading" | "success" | "error"
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function runVerification() {
      const verification_token = search_params.get("verification_token");

      if (!verification_token) {
        setStatus("error");
        setMessage("Falta el token de verificación.");
        return;
      }

      try {
        const response = await verifyEmail(verification_token);

        if (!response.ok) {
          setStatus("error");
          setMessage(response.message);
          return;
        }

        setStatus("success");
        setMessage("¡Tu cuenta fue verificada con éxito!");
      } catch (error) {
        setStatus("error");
        setMessage("Ocurrió un error al verificar tu cuenta.");
      }
    }

    runVerification();
  }, []);

  function handleGoToLogin() {
    navigate("/login", { replace: true });
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <p className="auth-eyebrow">Notas personales</p>
        <h1 className="auth-title">Verificación de cuenta</h1>

        {status === "loading" && <p>Verificando tu cuenta...</p>}

        {status === "success" && <p className="auth-success">{message}</p>}

        {status === "error" && <p className="auth-error">{message}</p>}

        {status !== "loading" && (
          <button className="auth-submit" onClick={handleGoToLogin}>
            Ir a iniciar sesión
          </button>
        )}
      </div>
    </div>
  );
};
