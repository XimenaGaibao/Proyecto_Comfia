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

const Notificaciones = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("HOY");

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
      active: false,
    },
    {
      name: "Configuración",
      path: "/configuracion",
      icon: "settings",
      active: false,
    },
    { name: "Reportes", path: "/reportes", icon: "assessment", active: false },
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
                style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
              >
                C
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#8C7354",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                COMFÍA
              </span>
              <p
                style={{
                  fontSize: "0.85rem",
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
              <span style={{ fontSize: "1.4rem", fontWeight: 500 }}>
                {item.name}
              </span>
            </div>
          ))}
        </nav>

        {/* Usuario y cerrar sesión */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid rgba(0,0,0,0.05)",
          }}
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
                fontSize: "20px",
              }}
            >
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p
                style={{ color: "#8C7354", fontSize: "1.3rem", fontWeight: 600 }}
              >
                {user?.name || "Admin User"}
              </p>
              <p style={{ color: "#9CA3AF", fontSize: "1rem" }}>
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
            <MaterialIcon name="logout" style={{ fontSize: "20px" }} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* HEADER SUPERIOR */}
        <div
          style={{
            background: "white",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#1F2937",
              margin: 0,
            }}
          >
            Notificaciones
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Buscador */}
            <div style={{ position: "relative" }}>
              <MaterialIcon
                name="search"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                  fontSize: "22px",
                }}
              />
              <input
                type="text"
                placeholder="Buscar actividad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "8px 12px 8px 40px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "20px",
                  fontSize: "1.1rem",
                  width: "220px",
                  outline: "none",
                  background: "#F9FAFB",
                }}
              />
            </div>

            {/* Icono campana roja */}
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#FEE2E2",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <MaterialIcon
                name="notifications"
                style={{ fontSize: "22px", color: "#EF4444" }}
              />
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div style={{ padding: "32px 40px", overflowY: "auto" }}>
          {/* Título */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#1F2937",
                margin: 0,
              }}
            >
              Centro de Notificaciones
            </h1>

            {/* Filtros */}
            <div style={{ display: "flex", gap: "12px" }}>
              {["HOY", "AYER", "SEMANA"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    fontSize: "1rem",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    background: filter === item ? "white" : "transparent",
                    color: filter === item ? "#1F2937" : "#6B7280",
                    boxShadow:
                      filter === item ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* NOTIFICACIONES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Card 1 - Nuevo crédito registrado */}
            <div
              style={{
                background: "#FFF9E6",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid #FDE68A",
              }}
            >
              <div style={{ display: "flex", gap: "14px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#FEF3C7",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcon
                    name="description"
                    style={{ fontSize: "22px", color: "#F59E0B" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#1F2937",
                        margin: 0,
                      }}
                    >
                      Nuevo crédito registrado
                    </h3>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "#9CA3AF",
                        background: "#F3F4F6",
                        padding: "2px 10px",
                        borderRadius: "12px",
                      }}
                    >
                      HACE 5 MIN
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#6B7280",
                      marginBottom: "12px",
                      lineHeight: 1.4,
                    }}
                  >
                    Se ha completado la solicitud #PR-902 para el cliente
                    "XXXXX", por un monto de $400,000
                  </p>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#8C7354",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      VER DETALLES
                    </button>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#6B7280",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      MARCAR COMO LEÍDA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Usuario actualizado */}
            <div
              style={{
                background: "#FFF9E6",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid #FDE68A",
              }}
            >
              <div style={{ display: "flex", gap: "14px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#EFF6FF",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcon
                    name="person"
                    style={{ fontSize: "22px", color: "#3B82F6" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#1F2937",
                        margin: 0,
                      }}
                    >
                      Usuario actualizado
                    </h3>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "#9CA3AF",
                        background: "#F3F4F6",
                        padding: "2px 10px",
                        borderRadius: "12px",
                      }}
                    >
                      HACE 10 HORAS
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#6B7280",
                      marginBottom: "12px",
                      lineHeight: 1.4,
                    }}
                  >
                    El perfil del usuario "Juan Perez" ha sido modificado.
                  </p>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#8C7354",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      REVISAR
                    </button>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#6B7280",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      MARCAR COMO LEÍDA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Alerta de seguridad */}
            <div
              style={{
                background: "#FFF9E6",
                borderRadius: "16px",
                padding: "20px",
                borderLeft: "3px solid #EF4444",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", gap: "14px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#FEE2E2",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcon
                    name="security"
                    style={{ fontSize: "22px", color: "#EF4444" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "#1F2937",
                          margin: 0,
                        }}
                      >
                        Alerta de seguridad
                      </h3>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#EF4444",
                          background: "#FEE2E2",
                          padding: "2px 10px",
                          borderRadius: "12px",
                        }}
                      >
                        CRÍTICO
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "#9CA3AF",
                        background: "#F3F4F6",
                        padding: "2px 10px",
                        borderRadius: "12px",
                      }}
                    >
                      HACE 2 HORAS
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#6B7280",
                      marginBottom: "12px",
                      lineHeight: 1.4,
                    }}
                  >
                    Múltiples intentos fallidos de inicio de sesión detectados
                    desde una IP no reconocida en Medellín, CO.
                  </p>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <button
                      style={{
                        background: "#EF4444",
                        border: "none",
                        color: "white",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        padding: "6px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      BLOQUEAR ACCESO
                    </button>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#6B7280",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      IGNORAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notificaciones;