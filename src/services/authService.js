import ENVIRONMENT from "../config/environment";

export async function login(email, password) {
  try {
    const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al hacer el login");
  }
}
//el error  CORS Cross Origin Resourse Sharing de la consulta salta cuando el origen de la consulta difiere de a donde se consulta
//ej: si consulto desde localhost:5173 y tengo ladireccion en el localhost:8080

export async function register(name, email, password) {
  try {
    const response_http = await fetch(
      `${ENVIRONMENT.URL_API}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      },
    );
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al registrar el usuario");
  }
}

export async function verifyEmail(verification_token) {
  try {
    const response_http = await fetch(
      `${ENVIRONMENT.URL_API}/api/auth/verify-email?verification_token=${verification_token}`,
      {
        method: "GET",
      },
    );
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al verificar el email");
  }
}

export async function forgotPassword(email) {
  try {
    const response_http = await fetch(
      `${ENVIRONMENT.URL_API}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al solicitar el restablecimiento");
  }
}

export async function resetPassword(reset_token, password) {
  try {
    const response_http = await fetch(
      `${ENVIRONMENT.URL_API}/api/auth/reset-password?reset_token=${reset_token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      },
    );
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al restablecer la contraseña");
  }
}
