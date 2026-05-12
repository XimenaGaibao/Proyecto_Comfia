import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: "80px", ...style }}
  >
    {name}
  </span>
);

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#F3F4F6",
      fontFamily: "Inter, Poppins, sans-serif"
    }}>

      {user && (
        <div style={{
          width: "260px",
          background: "#FFF5AC",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}>
          <div style={{ padding: "28px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", background: "#8C7354", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>C</span>
              </div>
              <div>
                <span style={{ color: "#8C7354", fontWeight: "bold", fontSize: "1.5rem" }}>COMFÍA</span>
                <p style={{ fontSize: "0.9rem", color: "#6B7280", marginTop: "2px" }}>Sistema de Crédito</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        textAlign: "center"
      }}>
        {/* Icono de error */}
        <div style={{
          width: "120px",
          height: "120px",
          background: "#FEE2E2",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px"
        }}>
          <MaterialIcon name="error" style={{ fontSize: "64px", color: "#EF4444" }} />
        </div>

        {/* Número de error */}
        <h1 style={{
          fontSize: "6rem",
          fontWeight: 800,
          color: "#1F2937",
          marginBottom: "16px",
          letterSpacing: "4px"
        }}>
          404
        </h1>

        {/* Título */}
        <h2 style={{
          fontSize: "3rem",
          fontWeight: 700,
          color: "#1F2937",
          marginBottom: "16px"
        }}>
          Página no encontrada
        </h2>

        {/* Descripción */}
        <p style={{
          fontSize: "1.5rem",
          color: "#6B7280",
          maxWidth: "500px",
          marginBottom: "32px",
          lineHeight: 1.6
        }}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
          Verifica la URL o regresa al inicio.
        </p>

        {/* Botones */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              padding: "12px 24px",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#4B5563",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#F9FAFB"}
            onMouseLeave={(e) => e.currentTarget.style.background = "white"}
          >
            <MaterialIcon name="arrow_back" style={{ fontSize: "20px" }} />
            Volver atrás
          </button>
          <button
            onClick={() => navigate(user ? "/dashboard" : "/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#8C7354",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px 28px",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#6B5740"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#8C7354"}
          >
            <MaterialIcon name="home" style={{ fontSize: "20px" }} />
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;