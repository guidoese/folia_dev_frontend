import ENVIRONMENT from "../config/environment";

export async function getNotes(token) {
  try {
    const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al obtener las notas");
  }
}

export async function createNote(token, titulo, contenido) {
  try {
    const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo, contenido }),
    });
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al crear la nota");
  }
}

export async function updateNote(token, id, titulo, contenido) {
  try {
    const response_http = await fetch(
      `${ENVIRONMENT.URL_API}/api/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, contenido }),
      },
    );
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al actualizar la nota");
  }
}

export async function deleteNote(token, id) {
  try {
    const response_http = await fetch(
      `${ENVIRONMENT.URL_API}/api/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const response = await response_http.json();
    return response;
  } catch (error) {
    throw new Error("Error al eliminar la nota");
  }
}
