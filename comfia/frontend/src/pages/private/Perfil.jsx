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

const Perfil = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Datos del perfil
  const profile = {
    name: "Juan Perez",
    email: "juan.perez@comfia.com",
    location: "Medellín, Colombia",
    document: "1.024.558.291",
    phone: "+57 312 445 9082",
    role: "Administrador",
    credit: 2400000,
    creditChange: "+12%",
    lastLogin: "Hoy a las 16:08",
    device: 'MacBook Pro 16"',
    browser: "Safari / macOS Ventura",
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
      active: false,
    },
    {
      name: "Configuración",
      path: "/configuracion",
      icon: "settings",
      active: false,
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
      <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
        {/* 1. ENCABEZADO DEL PERFIL */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginBottom: "48px",
            alignItems: "flex-start",
          }}
        >
          {/* Avatar con círculos decorativos */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "rgba(140,106,61,0.05)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "rgba(140,106,61,0.03)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
              }}
            ></div>

            <div
              style={{
                width: "150px",
                height: "150px",
                background: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "2px solid #F0F0F0",
                position: "relative",
                zIndex: 1,
              }}
            >
              <span
                style={{ fontSize: "48px", fontWeight: 500, color: "#8C6A3D" }}
              >
                JP
              </span>
            </div>
          </div>

          {/* Badges, Nombre, Rol y Botón */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <span
                style={{
                  background: "#D1FAE5",
                  color: "#10B981",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                CUENTA ACTIVA
              </span>
              <span
                style={{
                  background: "#F3EDE5",
                  color: "#8C6A3D",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                VERIFICADA
              </span>
            </div>

            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#1F2937",
                marginBottom: "6px",
              }}
            >
              {profile.name}
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "#8C6A3D",
                fontWeight: 500,
                marginBottom: "28px",
              }}
            >
              {profile.role}
            </p>

            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: "#8C6A3D",
                color: "white",
                border: "none",
                padding: "12px 32px",
                borderRadius: "30px",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <MaterialIcon name="edit" style={{ fontSize: "18px" }} /> Editar
              Perfil
            </button>
          </div>
        </div>

        {/* 2. TARJETA DE CRÉDITO - A LA IZQUIERDA */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "280px",
              height: "160px",
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                color: "#6B7280",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              CRÉDITO
            </p>
            <p
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "#1F2937",
                marginBottom: "8px",
              }}
            >
              ${(profile.credit / 1000000).toFixed(1)}M
            </p>
            <p
              style={{ fontSize: "0.75rem", color: "#10B981", fontWeight: 600 }}
            >
              ↗ {profile.creditChange} this month
            </p>
          </div>
        </div>

        {/* 3. TARJETAS INFORMACIÓN - MÁS ANCHAS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "48px",
            alignItems: "stretch",
          }}
        >
          {/* Tarjeta: Información Personal */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "36px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              minHeight: "380px",
            }}
          >
            <h3
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#9CA3AF",
                letterSpacing: "1.5px",
                marginBottom: "32px",
              }}
            >
              INFORMACIÓN PERSONAL
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
              }}
            >
              {/* Columna 1 */}
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.5px",
                    marginBottom: "10px",
                  }}
                >
                  NOMBRE COMPLETO
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#1F2937",
                    marginBottom: "32px",
                  }}
                >
                  {profile.name}
                </p>

                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.5px",
                    marginBottom: "10px",
                  }}
                >
                  CORREO ELECTRÓNICO
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#1F2937",
                    marginBottom: "32px",
                  }}
                >
                  {profile.email}
                </p>

                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.5px",
                    marginBottom: "10px",
                  }}
                >
                  LUGAR
                </p>
                <p style={{ fontSize: "1rem", color: "#1F2937" }}>
                  {profile.location}
                </p>
              </div>

              {/* Columna 2 */}
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.5px",
                    marginBottom: "10px",
                  }}
                >
                  IDENTIFICACIÓN (CC)
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#1F2937",
                    marginBottom: "32px",
                  }}
                >
                  {profile.document}
                </p>

                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#9CA3AF",
                    letterSpacing: "0.5px",
                    marginBottom: "10px",
                  }}
                >
                  NÚMERO DE TELÉFONO
                </p>
                <p style={{ fontSize: "1rem", color: "#1F2937" }}>
                  {profile.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta: Acceso a la Cuenta */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "36px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              borderLeft: "4px solid #8C6A3D",
              minHeight: "380px",
            }}
          >
            <h3
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#9CA3AF",
                letterSpacing: "1.5px",
                marginBottom: "32px",
              }}
            >
              ACCESO A LA CUENTA
            </h3>

            <div style={{ marginBottom: "32px" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  letterSpacing: "0.5px",
                  marginBottom: "10px",
                }}
              >
                LAST LOGIN
              </p>
              <p
                style={{ fontSize: "1rem", fontWeight: 500, color: "#1F2937" }}
              >
                {profile.lastLogin}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  letterSpacing: "0.5px",
                  marginBottom: "14px",
                }}
              >
                DEVICE TRUSTED
              </p>
              <div
                style={{
                  background: "#F0F7FF",
                  borderRadius: "14px",
                  padding: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "#E8F0FE",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcon
                    name="computer"
                    style={{ fontSize: "24px", color: "#8C6A3D" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#1F2937",
                    }}
                  >
                    {profile.device}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6B7280",
                      marginTop: "6px",
                    }}
                  >
                    {profile.browser}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SECCIÓN INFERIOR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "32px",
            borderTop: "1px solid #E5E7EB",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <h4
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#1F2937",
                marginBottom: "6px",
              }}
            >
              Privacidad y Visibilidad
            </h4>
            <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>
              Ajusta la forma en que se muestra tu información a otros analistas
              de crédito en el directorio.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 28px",
              background: "#FEE2E2",
              border: "none",
              borderRadius: "30px",
              color: "#DC2626",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FECACA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FEE2E2")}
          >
            <MaterialIcon name="logout" style={{ fontSize: "16px" }} /> Salir de
            la cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
