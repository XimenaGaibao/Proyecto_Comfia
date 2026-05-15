import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { UserService } from "../../Services/UserService";
import {
  showSuccess,
  showError,
  showWarning,
  showDeactivateAccountModal,
} from "../../Alerts";

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
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("comfia_theme");
    return savedTheme || "claro";
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Datos del perfil
  const [profile, setProfile] = useState({
    name: "Ximena Gaibao",
    email: "ejemplo@comfia.com",
  });

  // Aplicar tema al body cuando cambie
  useEffect(() => {
    localStorage.setItem("comfia_theme", theme);
    if (theme === "oscuro") {
      document.body.style.backgroundColor = "#0F172A";
      document.body.style.color = "#E2E8F0";
    } else {
      document.body.style.backgroundColor = "#F7F7F7";
      document.body.style.color = "#1F2937";
    }
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveChanges = () => {
    showSuccess("Cambios guardados correctamente");
  };

  // Actualizar contraseña
  const handleUpdatePassword = async () => {
  if (!currentPassword || !newPassword) {
    showWarning("Por favor completa ambos campos");
    return;
  }

  if (newPassword !== confirmPassword) {
    showError("Las contraseñas nuevas no coinciden");
    return;
  }

  if (newPassword.length < 6) {
    showWarning("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  try {
    await UserService.changePassword({
      currentPassword,
      newPassword
    });
    
    showSuccess("Contraseña actualizada correctamente");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    showError(error.response?.data?.message || "Error al cambiar la contraseña");
  }
};

  //desactivar cuenta
  const handleDeactivateAccount = async () => {
    const result = await showDeactivateAccountModal();

    if (result.isConfirmed) {
      showSuccess("Cuenta desactivada correctamente");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
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
    { name: "Reportes", 
      path: "/reportes", 
      icon: "assessment", 
      active: false },
  ];

  // Estilos dinámicos según el tema
  const getBgColor = () => (theme === "oscuro" ? "#0F172A" : "#F7F7F7");
  const getCardBgColor = () => (theme === "oscuro" ? "#1E293B" : "white");
  const getSidebarBg = () => (theme === "oscuro" ? "#1E293B" : "#FFF5AC");
  const getTextColor = () => (theme === "oscuro" ? "#F1F5F9" : "#1F2937");
  const getSecondaryTextColor = () =>
    theme === "oscuro" ? "#94A3B8" : "#6B7280";
  const getBorderColor = () => (theme === "oscuro" ? "#334155" : "#F0F0F0");
  const getInputBgColor = () => (theme === "oscuro" ? "#0F172A" : "#F9FAFB");
  const getInputBorderColor = () =>
    theme === "oscuro" ? "#475569" : "#E5E7EB";
  const getButtonHover = () => (theme === "oscuro" ? "#6B5740" : "#6B5740");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: getBgColor(),
        fontFamily: "Inter, Poppins, sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      {/* MENÚ LATERAL IZQUIERDO */}
      <div
        style={{
          width: "260px",
          background: getSidebarBg(),
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "28px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            cursor: "pointer",
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
                color: item.active
                  ? "white"
                  : theme === "oscuro"
                    ? "#94A3B8"
                    : "#6B7280",
              }}
            >
              <MaterialIcon
                name={item.icon}
                style={{
                  color: item.active
                    ? "white"
                    : theme === "oscuro"
                      ? "#94A3B8"
                      : "#6B7280",
                }}
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
            borderTop: `1px solid ${theme === "oscuro" ? "#334155" : "rgba(0,0,0,0.05)"}`,
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                theme === "oscuro" ? "#334155" : "#E8E0A0")
            }
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
                style={{
                  color: theme === "oscuro" ? "white" : "#8C7354",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}
              >
                {user?.name || "Admin User"}
              </p>
              <p
                style={{
                  color: theme === "oscuro" ? "#94A3B8" : "#9CA3AF",
                  fontSize: "1rem",
                }}
              >
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
              border: `1px solid ${theme === "oscuro" ? "#475569" : "#E5E7EB"}`,
              borderRadius: "10px",
              color: theme === "oscuro" ? "#94A3B8" : "#6B7280",
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
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: getTextColor(),
            }}
          >
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                theme === "oscuro" ? "#334155" : "#F3F4F6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <MaterialIcon
              name="notifications_none"
              style={{
                color: theme === "oscuro" ? "#94A3B8" : "#6B7280",
                fontSize: "24px",
              }}
            />
          </button>
        </div>

        <hr style={{ marginBottom: "32px", borderColor: getBorderColor() }} />

        {/* Información del Perfil */}
        <div
          style={{
            background: getCardBgColor(),
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: `1px solid ${getBorderColor()}`,
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
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: getTextColor(),
                }}
              >
                Información del Perfil
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: getSecondaryTextColor(),
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
                fontSize: "1rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = getButtonHover())
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#8C7354")
              }
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
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "1rem",
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
                    border: `1px solid ${getInputBorderColor()}`,
                    borderRadius: "10px",
                    fontSize: "1.2rem",
                    background: getInputBgColor(),
                    outline: "none",
                    color: getTextColor(),
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "1rem",
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
                    border: `1px solid ${getInputBorderColor()}`,
                    borderRadius: "10px",
                    fontSize: "1.2rem",
                    background: getInputBgColor(),
                    outline: "none",
                    color: getTextColor(),
                  }}
                />
              </div>
            </div>

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
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#8C6A3D",
                  marginBottom: "4px",
                }}
              >
                Cambiar Foto de Perfil
              </p>
              <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>
                JPG, PNG, GIF • Máx 2MB
              </p>
            </div>
          </div>
        </div>

        {/* Seguridad */}
        <div
          style={{
            background: getCardBgColor(),
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: `1px solid ${getBorderColor()}`,
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: getTextColor(),
              }}
            >
              Seguridad
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: getSecondaryTextColor(),
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
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  letterSpacing: "0.5px",
                  marginBottom: "8px",
                }}
              >
                CONTRASEÑA
              </p>
              <p
                style={{ fontSize: "1rem", color: getSecondaryTextColor() }}
              >
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
                  border: `1px solid ${getInputBorderColor()}`,
                  borderRadius: "10px",
                  fontSize: "1.2rem",
                  marginBottom: "12px",
                  outline: "none",
                  background: getInputBgColor(),
                  color: getTextColor(),
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
                  border: `1px solid ${getInputBorderColor()}`,
                  borderRadius: "10px",
                  fontSize: "1.2rem",
                  outline: "none",
                  background: getInputBgColor(),
                  color: getTextColor(),
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
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            ACTUALIZAR CONTRASEÑA
          </button>

          <hr style={{ marginTop: "20px", borderColor: getBorderColor() }} />
        </div>

        {/* Apariencia */}
        <div
          style={{
            background: getCardBgColor(),
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: `1px solid ${getBorderColor()}`,
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
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
                  theme === "claro"
                    ? "2px solid #8C6A3D"
                    : `1px solid ${getBorderColor()}`,
                borderRadius: "12px",
                background: theme === "claro" ? "#F9FAFB" : getCardBgColor(),
                cursor: "pointer",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <MaterialIcon name="light_mode" style={{ color: "#F59E0B" }} />
                <span style={{ fontSize: "1.2rem", color: getTextColor() }}>
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
                      : `1px solid ${getBorderColor()}`,
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
                    : `1px solid ${getBorderColor()}`,
                borderRadius: "12px",
                background: theme === "oscuro" ? "#334155" : getCardBgColor(),
                cursor: "pointer",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <MaterialIcon name="dark_mode" style={{ color: "#94A3B8" }} />
                <span style={{ fontSize: "1.2rem", color: getTextColor() }}>
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
                      : `1px solid ${getBorderColor()}`,
                  background: theme === "oscuro" ? "#8C6A3D" : "transparent",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* NOTIFICACIONES */}
        <div
          style={{
            background: getCardBgColor(),
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: `1px solid ${getBorderColor()}`,
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#9CA3AF",
              letterSpacing: "1px",
              marginBottom: "16px",
            }}
          >
            NOTIFICACIONES
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <MaterialIcon
                name="notifications"
                style={{ color: theme === "oscuro" ? "#94A3B8" : "#6B7280" }}
              />
              <span style={{ fontSize: "1.2rem", color: getTextColor() }}>
                Alertas de Crédito
              </span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              style={{
                width: "44px",
                height: "24px",
                background: notificationsEnabled
                  ? "#8C6A3D"
                  : theme === "oscuro"
                    ? "#475569"
                    : "#D1D5DB",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  left: notificationsEnabled ? "22px" : "2px",
                  transition: "left 0.2s",
                }}
              ></div>
            </button>
          </div>
        </div>

        {/* DESACTIVAR CUENTA */}
        <div
          style={{
            background: theme === "oscuro" ? "#1E293B" : "#FEF2F2",
            borderRadius: "16px",
            padding: "24px",
            border: `1px solid ${theme === "oscuro" ? "#334155" : "#FEE2E2"}`,
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
                  fontSize: "1.2rem",
                  color: theme === "oscuro" ? "#F87171" : "#DC2626",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                Ten en cuenta que estas acciones son irreversibles
              </p>
              <p
                style={{ fontSize: "1rem", color: getSecondaryTextColor() }}
              >
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
                fontSize: "1rem",
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