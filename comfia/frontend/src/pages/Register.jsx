import { useState } from "react";

export default function Register({ onNav }) {
  const [form, setForm] = useState({
    name: "", cc: "", email: "", phone: "", country: "", password: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });


  const fontFamily = "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  return (
    <div style={{ 
      backgroundColor: "#F3F4F6",
      minHeight: "100vh",
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center",
      padding: "20px",
      fontFamily: fontFamily
    }}>
      
      {/* TARJETA BLANCA */}
      <div style={{
        backgroundColor: "#ffffff",    
        borderRadius: "12px",           
        padding: "40px",               
        maxWidth: "500px",              
        width: "100%",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => onNav("home")}>
            <div style={{ width: 32, height: 32, background: "#8C7354", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 14, fontFamily: fontFamily }}>C</span>
            </div>
            <span style={{ fontFamily: fontFamily, fontWeight: 700, color: "#1C1916", fontSize: "1.1rem" }}>COMFÍA</span>
          </div>
          <span onClick={() => onNav("home")} style={{ fontSize: "0.85rem", color: "#6B7280", cursor: "pointer", fontFamily: fontFamily }}>
            ← Regresar
          </span>
        </div>

        {/* Título */}
        <h2 style={{ 
          fontFamily: fontFamily, 
          fontSize: "1.75rem", 
          color: "#1F2937", 
          marginBottom: 8,
          fontWeight: 700
        }}>
          Registrar Usuario
        </h2>
        <p style={{ 
          color: "#6B7280", 
          fontSize: "0.875rem", 
          marginBottom: 32,
          lineHeight: 1.5,
          fontFamily: fontFamily
        }}>
          Crea tu cuenta en COMFÍA para comenzar a gestionar tus finanzas con seguridad.
        </p>

        {/* Nombre Completo */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block", 
            fontSize: "0.75rem", 
            fontWeight: 700, 
            color: "#4B5563", 
            marginBottom: 8, 
            textTransform: "uppercase", 
            letterSpacing: "0.05em",
            fontFamily: fontFamily
          }}>
            NOMBRE COMPLETO
          </label>
          <div style={{ position: "relative" }}>
            <span style={{ 
              position: "absolute", 
              left: 12, 
              top: "50%", 
              transform: "translateY(-50%)",
              fontSize: "1rem"
            }}>
     
            </span>
            <input
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={form.name}
              onChange={set("name")}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                transition: "border-color 0.2s",
                fontFamily: fontFamily
              }}
              onFocus={(e) => e.target.style.borderColor = "#8C7354"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>
        </div>

        {/* Cédula */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block", 
            fontSize: "0.75rem", 
            fontWeight: 700, 
            color: "#4B5563", 
            marginBottom: 8, 
            textTransform: "uppercase", 
            letterSpacing: "0.05em",
            fontFamily: fontFamily
          }}>
            CÉDULA DE CIUDADANÍA (CC)
          </label>
          <div style={{ position: "relative" }}>
            <span style={{ 
              position: "absolute", 
              left: 12, 
              top: "50%", 
              transform: "translateY(-50%)",
              fontSize: "1rem"
            }}>
         
            </span>
            <input
              type="text"
              placeholder="Número de identificación"
              value={form.cc}
              onChange={set("cc")}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
              onFocus={(e) => e.target.style.borderColor = "#8C7354"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>
        </div>

        {/* Correo */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block", 
            fontSize: "0.75rem", 
            fontWeight: 700, 
            color: "#4B5563", 
            marginBottom: 8, 
            textTransform: "uppercase", 
            letterSpacing: "0.05em",
            fontFamily: fontFamily
          }}>
            CORREO ELECTRÓNICO
          </label>
          <div style={{ position: "relative" }}>
            <span style={{ 
              position: "absolute", 
              left: 12, 
              top: "50%", 
              transform: "translateY(-50%)",
              fontSize: "1rem"
            }}>
            
            </span>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={set("email")}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
              onFocus={(e) => e.target.style.borderColor = "#8C7354"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>
        </div>

        {/* Teléfono */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block", 
            fontSize: "0.75rem", 
            fontWeight: 700, 
            color: "#4B5563", 
            marginBottom: 8, 
            textTransform: "uppercase", 
            letterSpacing: "0.05em",
            fontFamily: fontFamily
          }}>
            TELÉFONO
          </label>
          <div style={{ position: "relative" }}>
            <span style={{ 
              position: "absolute", 
              left: 12, 
              top: "50%", 
              transform: "translateY(-50%)",
              fontSize: "1rem"
            }}>
  
            </span>
            <input
              type="tel"
              placeholder="+57 300 000 0000"
              value={form.phone}
              onChange={set("phone")}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
              onFocus={(e) => e.target.style.borderColor = "#8C7354"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>
        </div>

        {/* País */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block", 
            fontSize: "0.75rem", 
            fontWeight: 700, 
            color: "#4B5563", 
            marginBottom: 8, 
            textTransform: "uppercase", 
            letterSpacing: "0.05em",
            fontFamily: fontFamily
          }}>
            PAÍS
          </label>
          <div style={{ position: "relative" }}>
            <span style={{ 
              position: "absolute", 
              left: 12, 
              top: "50%", 
              transform: "translateY(-50%)",
              fontSize: "1rem",
              zIndex: 1
            }}>

            </span>
            <select
              value={form.country}
              onChange={set("country")}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                color: form.country ? "#1F2937" : "#9CA3AF",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                fontFamily: fontFamily
              }}
              onFocus={(e) => e.target.style.borderColor = "#8C7354"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            >
              <option value="">Seleccione su país</option>
              <option>Colombia</option>
              <option>México</option>
              <option>Argentina</option>
              <option>Chile</option>
            </select>
            <span style={{ 
              position: "absolute", 
              right: 12, 
              top: "50%", 
              transform: "translateY(-50%)",
              fontSize: "0.8rem",
              color: "#6B7280",
              pointerEvents: "none"
            }}>
              ▼
            </span>
          </div>
        </div>

        {/* Contraseña */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ 
            display: "block", 
            fontSize: "0.75rem", 
            fontWeight: 700, 
            color: "#4B5563", 
            marginBottom: 8, 
            textTransform: "uppercase", 
            letterSpacing: "0.05em",
            fontFamily: fontFamily
          }}>
            CONTRASEÑA
          </label>
          <div style={{ position: "relative" }}>
            <span style={{ 
              position: "absolute", 
              left: 12, 
              top: "50%", 
              transform: "translateY(-50%)",
              fontSize: "1rem"
            }}>

            </span>
            <input
              type="password"
              placeholder="Crea una contraseña segura"
              value={form.password}
              onChange={set("password")}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
              onFocus={(e) => e.target.style.borderColor = "#8C7354"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>
        </div>

        {/* Botón Registrarse */}
        <button
          onClick={() => onNav("login")}
          style={{ 
            width: "100%", 
            padding: "14px", 
            fontSize: "0.95rem", 
            borderRadius: 8, 
            marginTop: 8,
            fontWeight: 600,
            backgroundColor: "#8C7354",
            color: "#FFF5AC",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
            fontFamily: fontFamily
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#6B5740"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#8C7354"}
        >
          Registrarse →
        </button>

        {/* Link Iniciar Sesión */}
        <p style={{ 
          textAlign: "center", 
          fontSize: "0.875rem", 
          color: "#6B7280", 
          marginTop: 24,
          marginBottom: 0,
          fontFamily: fontFamily
        }}>
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => onNav("login")} style={{ 
            color: "#8C7354", 
            fontWeight: 700, 
            cursor: "pointer",
            textDecoration: "underline",
            textDecorationColor: "transparent",
            transition: "text-decoration-color 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.textDecorationColor = "#8C7354"}
          onMouseLeave={(e) => e.target.style.textDecorationColor = "transparent"}
          >
            Inicia Sesión
          </span>
        </p>

        {/* Footer Copyright */}
        <p style={{ 
          textAlign: "center", 
          fontSize: "0.7rem", 
          color: "#9CA3AF", 
          marginTop: 32,
          marginBottom: 0,
          fontFamily: fontFamily
        }}>
          © 2026 COMFÍA. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}