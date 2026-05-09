import { useState } from "react";
import { font } from "../../styles/tokens";
import "../../styles/styles.css";
import Header from "../../components/Header.jsx";

export default function Contact({ onNav }) {
  const [form, setForm] = useState({
    name: "",
    comment: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.comment) {
      setSubmitted(true);
      console.log("Comentario enviado:", form);
      setTimeout(() => setSubmitted(false), 3000);
      setForm({ name: "", comment: "" });
    }
  };

  const contacts = [
    {
      name: "Sol Mariana Rojas Vargas",
      phone: "322 123 4567",
      email: "sol.rojas@comfia.com",
    },
    {
      name: "Karen Juliet Triviño Herrera",
      phone: "315 987 6543",
      email: "karen.trivino@comfia.com",
    },
    {
      name: "Valentina Zapato Bravo",
      phone: "300 456 7890",
      email: "valentina.zapato@comfia.com",
    },
  ];

  return (
    <div
      className="contact-page"
      style={{
        backgroundColor: "#F3F4F6",
        minHeight: "100vh",
        fontFamily: font,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Header onNav={onNav} />

      <div className="contact-container">
        {/* Título principal */}
        <h1 className="contact-main-title">Atención al Cliente</h1>
        <p className="contact-subtitle">
          Deja tu comentario, sugerencia o experiencia.
        </p>

        {/* Dos columnas */}
        <div className="contact-two-columns">
          {/* Columna izquierda - Card amarilla del formulario */}
          <div className="contact-form-card">
            <h2 className="contact-form-title">
              ¡Queremos escuchar tu opinión!
            </h2>
            <p className="contact-form-description">
              Tu opinión nos ayudará a mejorar cada día.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="contact-input-group">
                <label className="contact-label">NOMBRE COMPLETO</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Escribir tu nombre..."
                  value={form.name}
                  onChange={handleChange}
                  className="contact-input"
                  required
                />
              </div>

              <div className="contact-input-group">
                <label className="contact-label">COMENTARIO</label>
                <textarea
                  name="comment"
                  placeholder="¿En qué podemos mejorar?"
                  value={form.comment}
                  onChange={handleChange}
                  className="contact-textarea"
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                Enviar comentario
              </button>

              {submitted && (
                <p className="contact-success-message">
                  ¡Gracias por tu comentario!
                </p>
              )}
            </form>
          </div>

          {/* Columna derecha - Cards amarillas de contactos */}
          <div className="contact-contacts-column">
            <h2 className="contact-contacts-title">CONTACTOS</h2>
            {contacts.map((contact, index) => (
              <div key={index} className="contact-person-card">
                <h3 className="contact-person-name">{contact.name}</h3>
                <p className="contact-person-phone">{contact.phone}</p>
                <p className="contact-person-email">{contact.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <footer className="about-footer">
        <p>© 2026 COMFÍA Gestión de Créditos. Todos los derechos reservados.</p>

        <div className="about-footer-links">
          {["Privacidad", "Términos y Condiciones", "Legales", "Cookies"].map(
            (l) => (
              <span key={l}>{l}</span>
            ),
          )}
        </div>
      </footer>
    </div>
  );
}
