import Header from "../../components/Header.jsx";
import { useNavigate } from 'react-router-dom';

function Descarga() {
  const navigate = useNavigate();

  return (
    <div className="page-layout" style={{ background: '#EBEBEB', minHeight: '100vh' }}>
      <Header />

      <main className="page-content" style={{ background: '#EBEBEB' }}>

        {/* ── HERO SECTION ── */}
        <section style={{ background: '#EBEBEB', padding: '3.5rem 3rem 2.5rem' }}>
          <div style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'flex',
            gap: '3rem',
            alignItems: 'center',
          }}>

            {/* Texto izquierdo */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: '#6c757d',
                marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem'
              }}>
                🚀 PLATAFORMA OFICIAL
              </p>

              <h1 style={{
                fontSize: '3rem', fontWeight: 800, lineHeight: 1.12,
                color: '#1a1a1a', marginBottom: '1rem'
              }}>
                Descarga<br />nuestra<br />aplicación
              </h1>

              <p style={{ fontSize: '1rem', color: '#555', marginBottom: '2rem', maxWidth: '500px' }}>
                Nuestra aplicación ofrece la mejor experiencia con acceso fácil y rápido desde tu computadora.
              </p>

              {/* Botones */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <button style={{
                  background: '#8C7354', color: 'white', border: 'none',
                  borderRadius: '6px', padding: '0.65rem 1.4rem',
                  fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  <i className="bi bi-download"></i> Descargar ahora
                </button>
                <button onClick={() => navigate("/guide")}style={{
                  background: 'white', color: '#8C7354',
                  border: '1px solid #ffffff', borderRadius: '6px',
                  padding: '0.65rem 1.4rem', fontWeight: 600,
                  fontSize: '1rem', cursor: 'pointer'
                }}>
                  Guía de instalación
                </button>
              </div>

              {/* Plataformas */}
              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: '#888' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="bi bi-display"></i> WINDOWS
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="bi bi-apple"></i> MACOS
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <i className="bi bi-ubuntu"></i> LINUX
                </span>
              </div>
            </div>

            {/* Card amarilla derecha */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {/* Card principal amarilla */}
              <div style={{
                background: '#FFF5AC',
                borderRadius: '16px',
                padding: '2.5rem 2rem 2rem',
                width: '400px',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                border: '15px solid #ffffff',
              }}>
                {/* Icono */}
                <div style={{
                  width: '56px', height: '56px',
                  background: '#8C7354', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem', boxShadow: '0 4px 12px rgba(107,79,16,0.35)'
                }}>
                  <i className="bi bi-arrow-down-circle-fill" style={{ color: 'white', fontSize: '1.4rem' }}></i>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.9rem', color: '#1a1a1a', marginBottom: '0.15rem' }}>
                  Comfía Desktop
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a1a1a', marginBottom: '0.75rem' }}>
                  v2.4
                </div>
                <div style={{ fontSize: '1rem', color: '#6c757d', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                  Optimizado para alto rendimiento y seguridad financiera.
                </div>

                {/* Línea separadora */}
                <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '0 0 0.75rem' }} />

                <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  PREPARADO PARA SU ENTORNO
                </div>
              </div>

              {/* Badge 100% seguro — flotando abajo-derecha */}
              <div style={{
                position: 'absolute', bottom: '-18px', right: '-18px',
                background: 'white', borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                textAlign: 'center', zIndex: 2, minWidth: '80px'
              }}>
                <i className="bi bi-shield-check" style={{ fontSize: '1.25rem', color: '#6c757d', display: 'block', marginBottom: '0.2rem' }}></i>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  100% SEGURO
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ background: '#EBEBEB', padding: '2.5rem 3rem 3rem' }}>
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <div className="row g-3">
              {[
                { icon: 'bi-lightning-charge', title: 'Máxima Velocidad', desc: 'Carga tus datos financieros un 40% más rápido que en la versión web convencional.' },
                { icon: 'bi-arrow-repeat',      title: 'Sincronización Total', desc: 'Tus datos se mantienen actualizados en todos tus dispositivos de forma instantánea.' },
                { icon: 'bi-key',               title: 'Acceso Biométrico', desc: 'Utiliza TouchID o FaceID de tu computadora para un acceso seguro y sin contraseñas.' },
              ].map((f, i) => (
                <div key={i} className="col-md-4">
                  <div style={{
                    background: 'white', borderRadius: '10px',
                    padding: '1.5rem', border: '1px solid #e0e0e0',
                    height: '100%'
                  }}>
                    {/* Icono en círculo gris claro */}
                    <div style={{
                      width: '36px', height: '36px',
                      background: '#f0f0ed', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '0.9rem'
                    }}>
                      <i className={`bi ${f.icon}`} style={{ fontSize: '1.25rem', color: '#6c757d' }}></i>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.4rem', color: '#1a1a1a' }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: '1rem', color: '#6c757d', lineHeight: 1.5 }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

       {/* FOOTER */}
      <footer className="about-footer">
        <p>© 2026 COMFÍA Gestión de Créditos. Todos los derechos reservados.</p>

        <div className="about-footer-links">
          {["Privacidad", "Términos y Condiciones", "Legales", "Cookies"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default Descarga