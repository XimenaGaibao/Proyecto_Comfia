import { C, font } from "../styles/tokens";
import { Card } from "../components/UI";
import "../styles/styles.css";

export default function About() {
  return (
    <div
      className="about-page"
      style={{
        "--gold": C.gold,
        "--goldDark": C.goldDark,
        "--gray50": C.gray50,
        "--gray700": C.gray700,
        "--gray500": C.gray500,
        "--gray300": C.gray300,
        "--gray100": C.gray100,
        "--white": C.white,
        "--cream": C.cream,
        "--font": font,
      }}
    >
      <div className="about-container">


        <h1 className="about-title">Sobre Nosotros</h1>

        <p className="about-intro">
          Contamos con integridad financiera para ofrecer soluciones de software que mejoran instituciones.
        </p>

        <div className="about-grid">

          {/* IMAGEN */}
          <div className="about-image">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpm9GRvpn-BoEWY_zEfediEoVfnRB0nrYaS77lhYv_IreFGAhr-8LIE07vt8yPhpFT0MlzOORGPj7GLXgWlGk-F0L-BNWJ_H-J6WSY-wYdnnf7YSwHFlx-MZ-ALvmFuohiIRv9TcgS6QzcD4RWMiNc9QbP_QHQGfmgIlvT7F4v5UFrojLyG11HZ3W74HAy5bBiKw1zNOoi1IoQnzl3AZ4rWv4RtXxT0k19KFHuzBH6HSnJPuZhQv2YPD8In-ppOmf5mk_VWvXEXSR-"
            />
          </div>

          {/* CARD */}
          <Card className="about-card">
            <div className="about-card-badge">
              <span>📋</span>
              <span>Misión & Legado</span>
            </div>

            <h2 className="about-card-title">Nuestra historia</h2>

            <p className="about-card-text">
              Somos una empresa dedicada a ofrecer software de calidad de forma rápida y eficiente.
            </p>

            <p className="about-card-text">
              Comprometidos con apoyar a nuestros clientes en la gestión de créditos, brindando herramientas que mejoran su operación diaria y fortalecen la relación con sus comunidades.
            </p>
          </Card>
        </div>

        {/* VALUES */}
        <h3 className="about-values-title">Nuestros Valores</h3>

        <div className="about-values-grid">
          {[
            { icon: "🎯", title: "Precisión", desc: "Cada crédito registrado con exactitud y trazabilidad total." },
            { icon: "🤝", title: "Confianza", desc: "Relaciones duraderas basadas en transparencia y honestidad." },
            { icon: "🚀", title: "Innovación", desc: "Tecnología moderna al servicio del comercio local." },
          ].map((v) => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h4 className="value-title">{v.title}</h4>
              <p className="value-text">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

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
  );
}
