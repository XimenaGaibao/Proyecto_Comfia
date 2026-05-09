import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { C, font } from "../../styles/tokens";
import { Btn } from "../../components/UI";
import "../../styles/styles.css";
import { useNavigate } from 'react-router-dom';


export default function Home({ onNav }) {
  const navigate = useNavigate();

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
      {/* HEADER */}
      <Header onNav={onNav} />

      <div className="hero-wrapper">
      <div className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdcoRUSWBkdNw59Jruz020xAaza7aU8lWepakhNU4qyfIVhh_uewiHWoQfsCJUiASVVbE4HEcZMK8uaSVcOSZ6F7ByNdvRfjuYGSzuO_Ou96v248cmoR_uiuEx15FS7RE7Isqab2APQOwlRzQrmaQMH6WjZ9gMdElOgktmi2NAPneENLhPjVXcx7TpRVIGkvDpg7kIq0gvC4ERUvPJpzaR4CgDIq2WmRhLvnOz9lIXtzcn_N0fg1pvUHoSyQZKBN-gTdyowJw6xpzp')" }}
        />


        <div className="hero-content">
          <span className="hero-badge">Seguridad y Confianza</span>

          <h1 className="hero-title">
            Servicio de almacenamiento <br />de prestamos
          </h1>

          <p className="hero-text">
            Porque todos merecemos guardar información importante de manera eficiente y segura.
          </p>

          <div className="hero-buttons">
            <Btn onClick={() => navigate("/login")} className="btn-primary">
              INICIAR SESIÓN
            </Btn>

            <Btn
              variant="outline"
              onClick={() => navigate("/register")}
              className="btn-outline "
            >
              REGISTRARSE
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

        <Btn onClick={() => navigate("/contacto")} className="btn-primary">
          CONTÁCTANOS
        </Btn>
      </div>


      {/* FOOTER */}
      <Footer />
    </div>
  );
}