import { C, font } from "../styles/tokens";
import { Btn } from "../components/UI";
import "../styles/styles.css";

export default function Home({ onNav }) {
  return (
    <div
      className="page"
      style={{
        "--goldDark": C.goldDark,
        "--gold": C.gold,
        "--goldLight": C.goldLight,
        "--white": C.white,
        "--gray50": C.gray50,
        "--gray700": C.gray700,
        "--gray500": C.gray500,
        "--gray300": C.gray300,
        "--cream": C.cream,
        "--creamDark": C.creamDark,
        "--font": font,
      }}
    >
      {/* HERO */}
      <div className="hero-wrapper">
      <div className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdcoRUSWBkdNw59Jruz020xAaza7aU8lWepakhNU4qyfIVhh_uewiHWoQfsCJUiASVVbE4HEcZMK8uaSVcOSZ6F7ByNdvRfjuYGSzuO_Ou96v248cmoR_uiuEx15FS7RE7Isqab2APQOwlRzQrmaQMH6WjZ9gMdElOgktmi2NAPneENLhPjVXcx7TpRVIGkvDpg7kIq0gvC4ERUvPJpzaR4CgDIq2WmRhLvnOz9lIXtzcn_N0fg1pvUHoSyQZKBN-gTdyowJw6xpzp')" }}
        />


        <div className="hero-content">
          <span className="hero-badge">Seguridad y Confianza</span>

          <h1 className="hero-title">
            Servicio de almacenamiento de prestamos
          </h1>

          <p className="hero-text">
            Porque todos merecemos guardar información importante de manera eficiente y segura.
          </p>

          <div className="hero-buttons">
            <Btn onClick={() => onNav("login")} className="btn-primary">
              Iniciar Sesión
            </Btn>

            <Btn
              variant="outline"
              onClick={() => onNav("register")}
              className="btn-outline "
            >
              Registrarse
            </Btn>
          </div>
        </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <p className="features-subtitle">¿Por qué elegir COMFÍA?</p>

        <h2 className="features-title">
          Nuestros Servicios de Clase Mundial
        </h2>

        <div className="features-grid">
          {[
            {
              icon: "🔒",
              title: "Seguridad Bancaria",
              desc: "Tus datos están protegidos con encriptación de grado militar y la más alta tecnología en ciberseguridad.",
            },
            {
              icon: "⚡",
              title: "Máxima Eficiencia",
              desc: "Organiza flujos de trabajo completos y guarda información en segundos con nuestra interfaz optimizada.",
            },
            {
              icon: "📱",
              title: "Acceso Multiplataforma",
              desc: "Consulta tus documentos y estados de cuenta desde cualquier dispositivo, en cualquier lugar.",
            },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-text">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta">
        <h2 className="cta-title">
          ¿Listo para digitalizar tus finanzas?
        </h2>

        <p className="cta-text">
          Únete a miles de usuarios y empresas que ya confían en la infraestructura de COMFÍA.
        </p>

        <Btn onClick={() => onNav("contact")} className="btn-primary">
          Contáctanos
        </Btn>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <div className="footer-brand">COMFÍA</div>
          <p className="footer-text">
            Soluciones modernas para el almacenamiento y gestión de activos financieros digitales.
          </p>
        </div>

        {[
          { title: "Producto", items: ["Características", "Seguridad", "Descargas"] },
          { title: "Compañía", items: ["Sobre Nosotros", "Blog", "Contacto"] },
          { title: "Legal", items: ["Privacidad", "Términos", "Cookies"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="footer-col-title">{col.title}</h4>
            {col.items.map((i) => (
              <p key={i} className="footer-link">{i}</p>
            ))}
          </div>
        ))}
      </footer>

      <div className="copyright">
        © 2026 COMFÍA Gestión de Créditos. Todos los derechos reservados.
      </div>
    </div>
  );
}