import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../context/AuthContext";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../../services/notes.service";
import { deleteAccount } from "../../services/authService";
import { ThemeToggle } from "../../components/ThemeToggle";
import "../../theme.css";
import "./HomeScreen.css";

export const HomeScreen = () => {
  const { token, logout } = useAuth();

  const [notes, setNotes] = useState([]);
  const [editing_note_id, setEditingNoteId] = useState(null);
  const [error_message, setErrorMessage] = useState("");

  // Estado del modal de eliminar cuenta
  const [show_delete_modal, setShowDeleteModal] = useState(false);
  const [delete_password, setDeletePassword] = useState("");
  const [delete_error, setDeleteError] = useState("");
  const [delete_loading, setDeleteLoading] = useState(false);

  const initial_form_state = {
    titulo: "",
    contenido: "",
  };

  async function onSubmit(formData) {
    try {
      setErrorMessage("");

      if (!formData.titulo) {
        setErrorMessage("El título es obligatorio");
        return;
      }

      let response;

      if (editing_note_id) {
        response = await updateNote(
          token,
          editing_note_id,
          formData.titulo,
          formData.contenido,
        );
      } else {
        response = await createNote(token, formData.titulo, formData.contenido);
      }

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      resetForm();
      setEditingNoteId(null);
      cargarNotas();
    } catch (error) {
      setErrorMessage("Ocurrió un error al guardar la nota");
    }
  }

  const { formState, handleChange, handleSubmit, resetForm } = useForm(
    initial_form_state,
    onSubmit,
  );

  async function cargarNotas() {
    try {
      const response = await getNotes(token);

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      setNotes(response.data);
    } catch (error) {
      setErrorMessage("Ocurrió un error al cargar las notas");
    }
  }

  useEffect(() => {
    cargarNotas();
  }, []);

  function handleEditClick(note) {
    setEditingNoteId(note._id);
    handleChange({ target: { name: "titulo", value: note.titulo } });
    handleChange({ target: { name: "contenido", value: note.contenido } });
  }

  function handleCancelEdit() {
    setEditingNoteId(null);
    resetForm();
  }

  async function handleDeleteClick(note_id) {
    try {
      const response = await deleteNote(token, note_id);

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      cargarNotas();
    } catch (error) {
      setErrorMessage("Ocurrió un error al eliminar la nota");
    }
  }

  // --- Modal de eliminar cuenta ---

  function handleOpenDeleteModal() {
    setDeletePassword("");
    setDeleteError("");
    setShowDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setDeletePassword("");
    setDeleteError("");
  }

  async function handleDeleteAccount() {
    try {
      setDeleteError("");

      if (!delete_password) {
        setDeleteError("Ingresá tu contraseña para confirmar");
        return;
      }

      setDeleteLoading(true);
      const response = await deleteAccount(token, delete_password);
      setDeleteLoading(false);

      if (!response.ok) {
        setDeleteError(response.message);
        return;
      }

      // Cerramos sesión y redirigimos al login
      logout();
    } catch (error) {
      setDeleteLoading(false);
      setDeleteError("Ocurrió un error al eliminar la cuenta");
    }
  }

  return (
    <div className="notes-screen">
      {/* Toggle flotante — visible solo en desktop */}
      <ThemeToggle className="theme-toggle--floating" />

      <header className="notes-header">
        <div>
          <p className="notes-eyebrow">Tu espacio</p>
          <h1 className="notes-title">Mis notas</h1>
        </div>
        <div className="notes-header-actions">
          <button className="notes-logout" onClick={logout} type="button">
            Cerrar sesión
          </button>
          <button
            className="notes-delete-account"
            onClick={handleOpenDeleteModal}
            type="button"
          >
            Eliminar cuenta
          </button>
          {/* Toggle integrado al header — visible solo en móvil */}
          <ThemeToggle className="theme-toggle--header" />
        </div>
      </header>

      {error_message && <p className="notes-error">{error_message}</p>}

      <form className="note-form" onSubmit={handleSubmit}>
        <h2 className="note-form-title">
          {editing_note_id ? "Editar nota" : "Nueva nota"}
        </h2>

        <div className="note-field">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={formState.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="note-field">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            name="contenido"
            value={formState.contenido}
            onChange={handleChange}
          />
        </div>

        <div className="note-form-actions">
          <button className="note-submit" type="submit">
            {editing_note_id ? "Guardar cambios" : "Crear nota"}
          </button>
          {editing_note_id && (
            <button
              className="note-cancel"
              type="button"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {notes.length === 0 && (
        <p className="notes-empty">
          Todavía no escribiste ninguna nota. Usá el formulario de arriba para
          crear la primera.
        </p>
      )}

      <ul className="notes-grid">
        {notes.map((note) => (
          <li className="note-card" key={note._id}>
            <h3 className="note-card-title">{note.titulo}</h3>
            <p className="note-card-content">{note.contenido}</p>
            <div className="note-card-actions">
              <button
                className="note-edit-btn"
                type="button"
                onClick={() => handleEditClick(note)}
              >
                Editar
              </button>
              <button
                className="note-delete-btn"
                type="button"
                onClick={() => handleDeleteClick(note._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de eliminar cuenta */}
      {show_delete_modal && (
        <div className="modal-overlay" onClick={handleCloseDeleteModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Eliminar cuenta</h2>
            <p className="modal-description">
              Esta acción es permanente. Se eliminarán tu cuenta y todas tus
              notas. Ingresá tu contraseña para confirmar.
            </p>

            {delete_error && <p className="modal-error">{delete_error}</p>}

            <div className="note-field">
              <label htmlFor="delete_password">Contraseña</label>
              <input
                id="delete_password"
                name="delete_password"
                type="password"
                value={delete_password}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                type="button"
                onClick={handleCloseDeleteModal}
              >
                Cancelar
              </button>
              <button
                className="modal-confirm-delete"
                type="button"
                onClick={handleDeleteAccount}
                disabled={delete_loading}
              >
                {delete_loading ? "Eliminando..." : "Eliminar cuenta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
