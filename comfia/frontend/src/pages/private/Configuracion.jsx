import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: "22px", ...style }}
  >
    {name}
  </span>
);

const Configuracion = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Estados
  const [theme, setTheme] = useState("claro");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Datos del perfil
  const [profile, setProfile] = useState({
    name: "Ximena Gaibao",
    email: "ejemplo@comfia.com",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveChanges = () => {
    alert("Cambios guardados correctamente");
  };

  const handleUpdatePassword = () => {
    if (currentPassword && newPassword) {
      alert("Contraseña actualizada correctamente");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      alert("Por favor completa ambos campos");
    }
  };

  const handleDeactivateAccount = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas desactivar tu cuenta? Esta acción es irreversible.",
      )
    ) {
      alert("Cuenta desactivada");
      logout();
      navigate("/login");
    }
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
      active: true,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F7F7F7",
        fontFamily: "Inter, Poppins, sans-serif",
      }}
    >
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
          {/* ✅ Envuelve el avatar y nombre en un div clickeable */}
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
      <div style={{ flex: 1, padding: "32px 40px", overflowY: "auto" }}>
        {/* Encabezado */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1F2937" }}>
            Configuración
          </h1>
          <button
            onClick={() => navigate("/notificaciones")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <MaterialIcon
              name="notifications_none"
              style={{ color: "#6B7280", fontSize: "24px" }}
            />
          </button>
        </div>

        <hr style={{ marginBottom: "32px", borderColor: "#F0F0F0" }} />

        {/*Información del Perfil*/}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#1F2937",
                }}
              >
                Información del Perfil
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#6B7280",
                  marginTop: "4px",
                }}
              >
                Gestiona tus datos personales y visibilidad pública.
              </p>
            </div>
            <button
              onClick={handleSaveChanges}
              style={{
                background: "#8C7354",
                color: "white",
                border: "none",
                padding: "8px 20px",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Guardar Cambios
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
            }}
          >
            {/* Columna Izquierda - Campos */}
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  NOMBRE COMPLETO
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    background: "#F9FAFB",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  CORREO ELECTRÓNICO
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    background: "#F9FAFB",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div
              style={{
                background: "#F4ECA6",
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "#8C6A3D",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "3px solid white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "36px",
                      fontWeight: 500,
                      color: "white",
                    }}
                  >
                    XG
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    background: "#8C6A3D",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                    cursor: "pointer",
                  }}
                >
                  <MaterialIcon
                    name="photo_camera"
                    style={{ fontSize: "14px", color: "white" }}
                  />
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#8C6A3D",
                  marginBottom: "4px",
                }}
              >
                Cambiar Foto de Perfil
              </p>
              <p style={{ fontSize: "0.7rem", color: "#6B7280" }}>
                JPG, PNG, GIF • Máx 2MB
              </p>
            </div>
          </div>
        </div>

        {/*Seguridad */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1F2937" }}
            >
              Seguridad
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#6B7280",
                marginTop: "4px",
              }}
            >
              Protege tu cuenta con contraseñas seguras.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "20px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  letterSpacing: "0.5px",
                  marginBottom: "8px",
                }}
              >
                CONTRASEÑA
              </p>
              <p style={{ fontSize: "0.89rem", color: "#6B7280" }}>
                Actualiza tu contraseña periódicamente para mantener tu cuenta
                segura.
              </p>
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña Actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  marginBottom: "12px",
                  outline: "none",
                }}
              />
              <input
                type="password"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <button
            onClick={handleUpdatePassword}
            style={{
              background: "transparent",
              border: "1px solid #8C6A3D",
              color: "#8C6A3D",
              padding: "8px 20px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            ACTUALIZAR CONTRASEÑA
          </button>

          <hr style={{ marginTop: "20px", borderColor: "#F0F0F0" }} />
        </div>

        {/* Apariencia*/}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#9CA3AF",
              letterSpacing: "1px",
              marginBottom: "16px",
            }}
          >
            APARIENCIA
          </h2>

          <div style={{ display: "flex", gap: "16px" }}>
            <div
              onClick={() => setTheme("claro")}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                border:
                  theme === "claro" ? "2px solid #8C6A3D" : "1px solid #E5E7EB",
                borderRadius: "12px",
                background: theme === "claro" ? "#F9FAFB" : "white",
                cursor: "pointer",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <MaterialIcon name="light_mode" style={{ color: "#F59E0B" }} />
                <span style={{ fontSize: "0.85rem", color: "#1F2937" }}>
                  Modo Claro
                </span>
              </div>
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border:
                    theme === "claro"
                      ? "5px solid #8C6A3D"
                      : "1px solid #D1D5DB",
                  background: theme === "claro" ? "#8C6A3D" : "transparent",
                }}
              ></div>
            </div>

            <div
              onClick={() => setTheme("oscuro")}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                border:
                  theme === "oscuro"
                    ? "2px solid #8C6A3D"
                    : "1px solid #E5E7EB",
                borderRadius: "12px",
                background: theme === "oscuro" ? "#F9FAFB" : "white",
                cursor: "pointer",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <MaterialIcon name="dark_mode" style={{ color: "#1F2937" }} />
                <span style={{ fontSize: "0.85rem", color: "#1F2937" }}>
                  Modo Oscuro
                </span>
              </div>
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border:
                    theme === "oscuro"
                      ? "5px solid #8C6A3D"
                      : "1px solid #D1D5DB",
                  background: theme === "oscuro" ? "#8C6A3D" : "transparent",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/*DESACTIVAR */}
        <div
          style={{
            background: "#FEF2F2",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #FEE2E2",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#DC2626",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                Ten en cuenta que estas acciones son irreversibles
              </p>
              <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                y pueden afectar el acceso a tus datos.
              </p>
            </div>
            <button
              onClick={handleDeactivateAccount}
              style={{
                background: "#EF4444",
                color: "white",
                border: "none",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#DC2626")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#EF4444")
              }
            >
              DESACTIVAR CUENTA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
