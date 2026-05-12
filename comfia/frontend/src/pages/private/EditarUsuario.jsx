import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: "24px", ...style }}
  >
    {name}
  </span>
);

const ActualizarUsuario = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "Juan Perez",
    document: "1.092.384.551",
    email: "juan.perez@comfia.com",
    phone: "+57 310 456 7890",
    creditLimit: "5,000,000",
  });

  const [accountStatus, setAccountStatus] = useState("Activa");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario actualizado:", formData);
    // Aquí iría la llamada a la API
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Gestión de Créditos",
      path: "/creditos",
      icon: "payments",
      active: false,
    },
    {
      name: "Gestión de Usuarios",
      path: "/usuarios",
      icon: "group",
      active: true,
    },
    {
      name: "Configuración",
      path: "/configuracion",
      icon: "settings",
      active: false,
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F3F4F6" }}>
      {/* MENÚ LATERAL IZQUIERDO */}
      <div
        style={{
          width: "260px",
          background: "#FFF5AC",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "28px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "#8C7354",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
              >
                C
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#8C7354",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                COMFÍA
              </span>
              <p
                style={{
                  fontSize: "0.6rem",
                  color: "#6B7280",
                  marginTop: "2px",
                }}
              >
                Sistema de Crédito
              </p>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav style={{ flex: 1, padding: "20px 12px" }}>
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 16px",
                marginBottom: "4px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s",
                background: item.active ? "#8C7354" : "transparent",
                color: item.active ? "white" : "#6B7280",
              }}
            >
              <MaterialIcon
                name={item.icon}
                style={{ color: item.active ? "white" : "#6B7280" }}
              />
              <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                {item.name}
              </span>
            </div>
          ))}
        </nav>

        {/* Usuario y cerrar sesión */}
        <div
          style={{ padding: "20px", borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div
            onClick={() => navigate("/perfil")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              cursor: "pointer",
              borderRadius: "10px",
              padding: "4px 8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#E8E0A0")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "#8C7354",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p
                style={{ color: "#8C7354", fontSize: "1rem", fontWeight: 600 }}
              >
                {user?.name || "Admin User"}
              </p>
              <p style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                Administrador
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              background: "transparent",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              color: "#6B7280",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            <MaterialIcon name="logout" style={{ fontSize: "18px" }} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto", width: "50%" }}>
        {/* Encabezado */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1F2937" }}>
            Actualizar Usuario
          </h1>
          <button
            onClick={() => navigate("/usuarios")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              color: "#6B7280",
              fontSize: "0.9rem",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <MaterialIcon name="arrow_back" style={{ fontSize: "18px" }} />
            Regresar
          </button>
        </div>

        {/* Layout de 2 columnas */}
        <div style={{ display: "flex", gap: "32px" }}>
          {/* COLUMNA IZQUIERDA - Más ancha */}
          <div style={{ flex: "2", display: "flex", flexDirection: "column", gap: "32px" }}>
            
            {/* Card 1: Información Personal */}
            <div
              style={{
                background: "#FFF5AC",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#8C7354",
                  letterSpacing: "1px",
                  marginBottom: "24px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #E5E0A0",
                }}
              >
                INFORMACIÓN PERSONAL
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "8px",
                    }}
                  >
                    NOMBRE
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      background: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8C7354")}
                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "8px",
                    }}
                  >
                    CC (IDENTIFICACIÓN)
                  </label>
                  <input
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      background: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8C7354")}
                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "8px",
                    }}
                  >
                    CORREO ELECTRÓNICO
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      background: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8C7354")}
                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.85px",
                      marginBottom: "8px",
                    }}
                  >
                    TELÉFONO
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      background: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8C7354")}
                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Financiamiento */}
            <div
              style={{
                background: "#FFF5AC",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#8C7354",
                  letterSpacing: "1px",
                  marginBottom: "24px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #E5E0A0",
                }}
              >
                FINANCIAMIENTO
              </h2>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.85px",
                    marginBottom: "8px",
                  }}
                >
                  VALOR (LÍMITE DE CRÉDITO)
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6B7280",
                      fontSize: "0.9rem",
                    }}
                  >
                    $
                  </span>
                  <input
                    type="text"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 36px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      background: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8C7354")}
                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                  />
                </div>
              </div>
            </div>

            {/* Botón Actualizar */}
            <button
              onClick={handleSubmit}
              style={{
                width: "fit-content",
                background: "#8C7354",
                color: "white",
                border: "none",
                padding: "12px 32px",
                borderRadius: "16px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
                marginTop: "8px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#6B5740")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#8C7354")}
            >
              <MaterialIcon name="person" style={{ fontSize: "18px" }} />
              Actualizar Usuario
            </button>
          </div>

          {/* COLUMNA DERECHA - Más angosta */}
          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "40px" }}>
            
            {/* Card 1: Perfil Usuario */}
            <div
              style={{
                background: "#FFF5AC",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "#8C7354",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px auto",
                  }}
                >
                  <span style={{ color: "white", fontWeight: "bold", fontSize: "32px" }}>
                    {formData.name.charAt(0)}
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "0",
                    width: "14px",
                    height: "14px",
                    background: "#10B981",
                    borderRadius: "50%",
                    border: "2px solid ",
                    borderColor: "#FFF5AC",
                  }}
                ></div>
              </div>

              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#1F2937",
                  marginBottom: "16px",
                }}
              >
                {formData.name}
              </h3>

              <div
                style={{
                  height: "1px",
                  background: "#E5E0A0",
                  marginBottom: "16px",
                }}
              ></div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#1F2937",
                      marginBottom: "4px",
                    }}
                  >
                    142
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    CRÉDITO
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#1F2937",
                      marginBottom: "4px",
                    }}
                  >
                    4.8
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    PUNTAJE
                  </p>
                </div>
              </div>
            </div>

             {/* Card: ESTADO CUENTA con indicadores visuales */}
            <div
              style={{
                background: "#FFF5AC",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#8C7354",
                  letterSpacing: "1px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #E5E0A0",
                  paddingBottom: "8px",
                }}
              >
                ESTADO CUENTA
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Opción Activa - Círculo verde con check */}
                <div
                  onClick={() => setAccountStatus("Activa")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: accountStatus === "Activa" ? "#10B981" : "#E5E7EB",
                      border: accountStatus === "Activa" ? "none" : "1px solid #D1D5DB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    {accountStatus === "Activa" && (
                      <MaterialIcon name="check" style={{ fontSize: "14px", color: "white" }} />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      color: accountStatus === "Activa" ? "#10B981" : "#6B7280",
                      fontWeight: accountStatus === "Activa" ? 600 : 400,
                    }}
                  >
                    Activa
                  </span>
                </div>

                {/* Opción Inactiva - Círculo gris con X roja */}
                <div
                  onClick={() => setAccountStatus("Inactiva")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: accountStatus === "Inactiva" ? "#EF4444" : "#E5E7EB",
                      border: accountStatus === "Inactiva" ? "none" : "1px solid #D1D5DB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    {accountStatus === "Inactiva" && (
                      <MaterialIcon name="close" style={{ fontSize: "14px", color: "white" }} />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      color: accountStatus === "Inactiva" ? "#EF4444" : "#6B7280",
                      fontWeight: accountStatus === "Inactiva" ? 600 : 400,
                    }}
                  >
                    Inactiva
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualizarUsuario;