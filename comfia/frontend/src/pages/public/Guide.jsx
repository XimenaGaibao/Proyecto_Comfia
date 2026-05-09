import { useState } from "react";
import "../../styles/styles.css";
import Header from "../../components/Header.jsx";

function Guide() {
  const [tab, setTab] = useState("escritorio");

  return (
    <div className="page-layout">
      <Header />
      <main className="page-content" style={{ background: "white" }}>
        {/* Guía de instalación */}
        <div style={{ padding: "3rem", maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Guía de Instalación
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#6c757d",
              fontSize: "1.1rem",
              marginBottom: "3rem",
            }}
          >
            Sigue estos sencillos pasos para configurar COMFÍA en todos tus
            dispositivos y comenzar a gestionar tus créditos con precisión
            profesional.
          </p>

          <div
            style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
          >
            {/* Selector de plataforma */}
            <div style={{ width: "380px", flexShrink: 0 }}>
              <div
                style={{
                  background: "#FFF5AC",
                  borderRadius: "12px",
                  padding: "1.2rem",
                  border: "1px solid #eee",
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#6c757d",
                    marginBottom: "1rem",
                  }}
                >
                  PLATAFORMAS DISPONIBLES
                </p>
                {[
                  {
                    id: "escritorio",
                    icon: "bi-display",
                    label: "Escritorio (Windows/Mac)",
                  },
                  { id: "web", icon: "bi-globe", label: "Acceso Web Directo" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setTab(p.id)}
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      borderRadius: "8px",
                      border: "none",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      marginBottom: "0.5rem",
                      background: tab === p.id ? "#FEFAE0" : "transparent",
                      color: tab === p.id ? "#8B6914" : "#1a1a1a",
                      boxShadow:
                        tab === p.id ? "inset 0 0 0 1px #E0D5B0" : "none",
                    }}
                  >
                    <i className={`bi ${p.icon}`} style={{ fontSize: "1.2rem" }}></i> {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pasos */}
            <div style={{ flex: 1 }}>
              {tab === "escritorio" && (
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "1.3rem" }}>
                    Instalación en Escritorio
                  </h4>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#6c757d",
                      marginBottom: "2rem",
                    }}
                  >
                    Versión 2.4.0 • Recomendado para analistas de crédito
                  </p>

                  {[
                    {
                      n: 1,
                      title: "Descargar el Instalador",
                      desc: "Accede a nuestro portal de descargas y selecciona la versión compatible.",
                      extra: (
                        <div
                          style={{
                            background: "#fafafa",
                            border: "1px solid #eee",
                            borderRadius: "8px",
                            padding: "0.8rem 1rem",
                            marginTop: "0.8rem",
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "1rem",
                          }}
                        >
                          <span>
                            <i
                              className="bi bi-file-earmark"
                              style={{ marginRight: "0.5rem" }}
                            ></i>
                            COMFIA_Setup_v2.4.exe
                          </span>
                          <a
                            href="#"
                            style={{ color: "#8B6914", fontWeight: 600 }}
                          >
                            Descargar (142MB)
                          </a>
                        </div>
                      ),
                    },
                    {
                      n: 2,
                      title: "Ejecutar y Autorizar",
                      desc: 'Abre el archivo descargado. Si aparece una advertencia de seguridad, haz clic en "Más información" y luego en "Ejecutar".',
                      extra: (
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBTFAo2bq-bPlmfePY99YCWAYv1p3ok9Ge7Bq94ozmH2OK_ygks1MbUMLSWEv-S6ANno87hBYayIt6m-V3ssiwyEWzjWS2RJWvWfLGfAoenDunat8B1bwGO11yxXbTvK__AHgcYk3QGnoxYVciseAzIS-VlHVB8_5eRmBduI9sgttObDjrSvBsTIWWWe4g6RS9zbP9EaceHVcfw8pTF0Zo1JXLob9XlqPWWUa3hXRL3EFkNJUwqOFJC5P7hWUJVN3nno2qg_Ux2Orp"
                          alt="Instalación COMFÍA"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            objectPosition: "center 35%",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            marginTop: "1rem"
                          }}
                        />
                      ),
                    },
                    {
                      n: 3,
                      title: "Iniciar Sesión",
                      desc: "Una vez completada la instalación, la aplicación se abrirá automáticamente.",
                      extra: (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "#d4edda",
                            color: "#155724",
                            padding: "0.4rem 0.8rem",
                            borderRadius: "20px",
                            fontSize: "1rem",
                            fontWeight: 700,
                            marginTop: "1rem",
                          }}
                        >
                          <i className="bi bi-check-circle-fill"></i>VERIFICADO POR SEGURIDAD
                        </div>
                      ),
                    },
                  ].map((s) => (
                    <div
                      key={s.n}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#8B6914",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "1rem",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        {s.n}
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            marginBottom: "0.3rem",
                          }}
                        >
                          {s.title}
                        </div>
                        <div style={{ fontSize: "1rem", color: "#6c757d" }}>
                          {s.desc}
                        </div>
                        {s.extra}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Pestaña Web */}
              {tab === "web" && (
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: "1.3rem", fontSize: "1.2rem" }}>
                    Acceso Web Directo
                  </h4>
                  <p style={{ fontSize: "1.1rem", color: "#6c757d" }}>
                    Accede a COMFÍA directamente desde tu navegador sin
                    necesidad de instalar nada.
                  </p>
                  <p style={{ fontSize: "1.1rem", color: "#6c757d", marginTop: "0.8rem" }}>
                    URL: <strong>https://app.comfia.com</strong>
                  </p>
                  <p style={{ fontSize: "1.1rem", color: "#6c757d" }}>
                    Compatible con Chrome, Firefox, Edge y Safari.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ - 3 COLUMNAS */}
        <div
          style={{
            background: "#fafafa",
            padding: "3rem",
            borderTop: "1px solid #eee",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h3
              style={{
                textAlign: "center",
                fontWeight: 700,
                marginBottom: "2.5rem",
                fontSize: "1.8rem"
              }}
            >
              Preguntas Frecuentes
            </h3>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "2rem",
              alignItems: "start"
            }}>
              {[
                {
                  q: "¿Requisitos de hardware?",
                  a: "Mínimo 4GB de RAM y un procesador de 64 bits. Espacio en disco requerido: 400MB.",
                },
                {
                  q: "¿Actualizaciones automáticas?",
                  a: "Sí. COMFÍA se actualiza en segundo plano cada vez que se inicia la aplicación.",
                },
                {
                  q: "¿Uso sin conexión?",
                  a: "La aplicación permite lectura de datos offline, pero requiere conexión para sincronizar cambios.",
                },
              ].map((f, i) => (
                <div key={i} style={{ 
                  padding: "1rem",
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      marginBottom: "0.5rem",
                      color: "#1a1a1a"
                    }}
                  >
                    {f.q}
                  </div>
                  <div style={{ fontSize: "1.2rem", color: "#6c757d", lineHeight: 1.5 }}>
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

     {/* FOOTER */}
      <footer className="guide-footer">
        <p>© 2026 COMFÍA Gestión de Créditos. Todos los derechos reservados.</p>

        <div className="about-footer-links">
          {["Privacidad", "Términos y Condiciones", "Legales", "Cookies"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default Guide;