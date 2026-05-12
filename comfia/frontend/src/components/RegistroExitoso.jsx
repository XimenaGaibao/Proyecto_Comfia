import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: "24px", ...style }}
  >
    {name}
  </span>
);

const RegistroExitosoModal = ({ onClose }) => {
  const navigate = useNavigate();

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        fontFamily: "Inter, Poppins, sans-serif",
      }}
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "24px",
          width: "420px",
          maxWidth: "90%",
          padding: "40px 32px",
          boxShadow: "0 20px 35px rgba(0, 0, 0, 0.15)",
          textAlign: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Círculo exterior gris */}
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#F3F4F6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
          }}
        >
          {/* Círculo interior beige/marrón */}
          <div
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "#8C7354",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Ícono check blanco */}
            <MaterialIcon
              name="check"
              style={{ fontSize: "32px", color: "white" }}
            />
          </div>
        </div>

        {/* Título */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1F2937",
            marginBottom: "12px",
          }}
        >
          Usuario creado con éxito
        </h2>

        {/* Descripción */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "#6B7280",
            lineHeight: 1.5,
            marginBottom: "24px",
            maxWidth: "320px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Bienvenido a COMFÍA. Explora tu panel de control para gestionar los
          procesos de crédito y los usuarios de la organización.
        </p>

        {/* Card interna - CUENTA */}
        <div
          style={{
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "32px",
            border: "1px solid #F0F0F0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "4px",
                }}
              >
                CUENTA
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#1F2937",
                }}
              >
                Admin Acceso verificado
              </p>
            </div>
            <div
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: "#E5E7EB",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcon
                name="check_circle"
                style={{ fontSize: "16px", color: "#10B981" }}
              />
            </div>
          </div>
        </div>

        {/* Botón Continuar */}
        <button
          onClick={handleContinue}
          style={{
            width: "100%",
            backgroundColor: "#8C7354",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "30px",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#6B5740")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#8C7354")}
        >
          Continuar al inicio de sesión
          <MaterialIcon name="arrow_forward" style={{ fontSize: "18px" }} />
        </button>
      </div>
    </div>
  );
};

export default RegistroExitosoModal;