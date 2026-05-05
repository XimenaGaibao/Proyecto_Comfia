import { C, font, fontSans } from "../styles/tokens";

export const Btn = ({ children, variant = "primary", onClick, style = {}, disabled }) => {
  const base = {
    padding: "12px 28px", borderRadius: "8px", fontFamily: fontSans,
    fontWeight: 600, fontSize: "0.875rem", cursor: disabled ? "not-allowed" : "pointer",
    border: "none", transition: "all .2s", letterSpacing: "0.02em",
    opacity: disabled ? 0.6 : 1,
  };
  const variants = {
    primary: { background: C.gold, color: C.white, boxShadow: `0 2px 8px ${C.gold}55` },
    outline: { background: "transparent", color: C.gold, border: `2px solid ${C.gold}` },
    ghost: { background: "transparent", color: C.gray500, border: `1px solid ${C.gray100}` },
    danger: { background: C.red, color: C.white },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export const Input = ({ label, type = "text", placeholder, value, onChange, error, icon }) => (
  <div style={{ marginBottom: "18px" }}>
    {label && (
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.gray500, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {icon && <span style={{ marginRight: 6 }}>{icon}</span>}{label}
      </label>
    )}
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{
        width: "100%", padding: "12px 16px", borderRadius: "8px",
        border: `1.5px solid ${error ? C.red : C.gray100}`,
        background: C.white, fontSize: "0.9rem", color: C.gray700,
        outline: "none", transition: "border .2s",
      }}
    />
    {error && <p style={{ color: C.red, fontSize: "0.75rem", marginTop: 4 }}>{error}</p>}
  </div>
);

export const Tag = ({ children, color = "green" }) => {
  const colors = {
    green: { bg: C.greenLight, text: C.green },
    orange: { bg: C.orangeLight, text: C.orange },
    blue: { bg: C.blueLight, text: C.blue },
    red: { bg: "#FFEBEE", text: C.red },
  };
  return (
    <span style={{
      padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 700,
      background: colors[color].bg, color: colors[color].text, letterSpacing: "0.04em",
    }}>
      {children}
    </span>
  );
};

export function Card({ children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}
export const Navbar = ({ onNav, current }) => (
  <nav style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 48px", height: "64px", background: C.white,
    borderBottom: `1px solid ${C.gray100}`, position: "sticky", top: 0, zIndex: 100,
    boxShadow: "0 1px 8px rgba(139,111,71,0.07)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onNav("home")}>
      <div style={{ width: 32, height: 32, background: C.gold, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: C.white, fontWeight: 900, fontSize: 14 }}>C</span>
      </div>
      <span style={{ fontFamily: font, fontSize: "1.25rem", fontWeight: 700, color: C.goldDark, letterSpacing: "0.03em" }}>COMFÍA</span>
    </div>
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      {["home", "about", "contact"].map((p) => (
        <span key={p} onClick={() => onNav(p)} style={{
          cursor: "pointer", fontSize: "0.875rem",
          fontWeight: current === p ? 700 : 400,
          color: current === p ? C.gold : C.gray500,
          borderBottom: current === p ? `2px solid ${C.gold}` : "2px solid transparent",
          paddingBottom: 2, transition: "all .2s",
        }}>
          {p === "home" ? "Inicio" : p === "about" ? "Sobre Nosotros" : "Contactanos"}
        </span>
      ))}
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      <Btn variant="ghost" onClick={() => onNav("login")} style={{ padding: "9px 20px" }}>Iniciar Sesión</Btn>
      <Btn onClick={() => onNav("register")} style={{ padding: "9px 20px" }}>Registrarse</Btn>
    </div>
  </nav>
);
