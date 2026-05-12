import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import RegistroExitosoModal from '../../components/RegistroExitoso'; 

export default function Register() {
  const navigate = useNavigate();
  
  // 2. Agregar este estado para controlar el modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [form, setForm] = useState({
    name: "", cc: "", email: "", phone: "", country: "", password: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const fontFamily = "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // 3. Crear una función para manejar el registro exitoso
  const handleRegisterSuccess = () => {
    // Aquí puedes agregar la lógica de registro si la tienes
    setShowSuccessModal(true);
  };

  return (
    <div style={{ 
      backgroundColor: "#F3F4F6",
      minHeight: "100vh",
      display: "flex", 
      flexDirection: "column",
      margin: 0,        
      padding: 0,       
      fontFamily: fontFamily
    }}>
      {/* NAVBAR - Pegado completamente arriba */}
      <nav style={{
        backgroundColor: "#ffffff",
        padding: "16px 80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        margin: 0,           
        borderRadius: 0,    
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        {/* LOGO - Izquierda */}
        <Link 
          to="/" 
          onClick={() => navigate("/")} 
          style={{
            color: "#8C7354",
            fontSize: "1.4rem",
            fontWeight: "bold",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          COMFÍA
        </Link>

        {/* Regresar - Derecha */}
        <Link 
          to="/login" 
          onClick={() => navigate("/login")}
          style={{
            color: "#8C7354",
            background: "transparent",
            border: "1.5px solid #FFFFFF",
            padding: "8px 24px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            textDecoration: "none"
          }}
        >
          ← Regresar
        </Link>
      </nav>

      {/* Contenido - Tarjeta centrada */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: "40px 20px"
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
            fontSize: "0.9rem", 
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
              fontSize: "0.8rem", 
              fontWeight: 700, 
              color: "#4B5563", 
              marginBottom: 8, 
              textTransform: "uppercase", 
              letterSpacing: "0.05em",
              fontFamily: fontFamily
            }}>
              NOMBRE COMPLETO
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={form.name}
              onChange={set("name")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
            />
          </div>

          {/* Cédula */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ 
              display: "block", 
              fontSize: "0.8rem", 
              fontWeight: 700, 
              color: "#4B5563", 
              marginBottom: 8, 
              textTransform: "uppercase", 
              letterSpacing: "0.05em",
              fontFamily: fontFamily
            }}>
              CÉDULA DE CIUDADANÍA (CC)
            </label>
            <input
              type="text"
              placeholder="Número de identificación"
              value={form.cc}
              onChange={set("cc")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
            />
          </div>

          {/* Correo */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ 
              display: "block", 
              fontSize: "0.8rem", 
              fontWeight: 700, 
              color: "#4B5563", 
              marginBottom: 8, 
              textTransform: "uppercase", 
              letterSpacing: "0.05em",
              fontFamily: fontFamily
            }}>
              CORREO ELECTRÓNICO
            </label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={set("email")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
            />
          </div>

          {/* Teléfono */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ 
              display: "block", 
              fontSize: "0.8rem", 
              fontWeight: 700, 
              color: "#4B5563", 
              marginBottom: 8, 
              textTransform: "uppercase", 
              letterSpacing: "0.05em",
              fontFamily: fontFamily
            }}>
              TELÉFONO
            </label>
            <input
              type="tel"
              placeholder="+57 300 000 0000"
              value={form.phone}
              onChange={set("phone")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
            />
          </div>

          {/* País */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ 
              display: "block", 
              fontSize: "0.8rem", 
              fontWeight: 700, 
              color: "#4B5563", 
              marginBottom: 8, 
              textTransform: "uppercase", 
              letterSpacing: "0.05em",
              fontFamily: fontFamily
            }}>
              PAÍS
            </label>
            <select
              value={form.country}
              onChange={set("country")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                color: form.country ? "#1F2937" : "#6B7280",
                outline: "none",
                cursor: "pointer",
                fontFamily: fontFamily
              }}
            >
              <option value="">Seleccione su país</option>
              <option>Colombia</option>
              <option>México</option>
              <option>Argentina</option>
              <option>Chile</option>
            </select>
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: "block", 
              fontSize: "0.8rem", 
              fontWeight: 700, 
              color: "#4B5563", 
              marginBottom: 8, 
              textTransform: "uppercase", 
              letterSpacing: "0.05em",
              fontFamily: fontFamily
            }}>
              CONTRASEÑA
            </label>
            <input
              type="password"
              placeholder="Crea una contraseña segura"
              value={form.password}
              onChange={set("password")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                background: "#FFF5AC",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: fontFamily
              }}
            />
          </div>

          {/* Botón Registrarse*/}
          <button
            onClick={handleRegisterSuccess}  // ✅ Cambiar esto
            style={{ 
              width: "100%", 
              padding: "14px", 
              fontSize: "1rem", 
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
            fontSize: "0.9rem", 
            color: "#6B7280", 
            marginTop: 24,
            marginBottom: 0,
            fontFamily: fontFamily
          }}>
            ¿Ya tienes una cuenta?{" "}
            <span 
              onClick={() => navigate("/login")}
              style={{ 
                color: "#8C7354", 
                fontWeight: 700, 
                cursor: "pointer"
              }}
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

   
      {showSuccessModal && (
        <RegistroExitosoModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
}