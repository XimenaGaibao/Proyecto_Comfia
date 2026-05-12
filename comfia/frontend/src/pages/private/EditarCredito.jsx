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

const EditarCredito = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  //const [isEditing, setIsEditing] = useState(false);

  // Datos del crédito
  const [formData, setFormData] = useState({
    clientName: "Carlos Rodriguez",
    document: "1.023.456.789",
    amount: "5,000,000",
    status: "Aprobado",
    startDate: "12/10/2023",
    endDate: "14/10/2024",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Crédito actualizado:", formData);
    navigate("/creditos");
  };

  const handleCancel = () => {
    navigate("/creditos");
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
      active: true,
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
      <div style={{ flex: 1, padding: "40px", width: "100%" }}>

        <div style={{ marginBottom: "8px" }}>
          <span style={{ fontSize: "0.95rem", color: "#9CA3AF", letterSpacing: "0.5px" }}>
            CRÉDITOS &gt; EDITAR
          </span>
        </div>

        {/* Título */}
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1F2937", marginBottom: "32px" }}>
          Editar Crédito
        </h1>

        {/* Card Amarilla */}
        <div style={{
          background: "#FFF5AC",
          borderRadius: "16px",
          overflow: "hidden",
          borderTop: "4px solid #8C7354",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          width: "auto",
          alignItems: "center",
        }}>
          <div style={{ padding: "32px" }}>
            {/* INFORMACIÓN DEL CRÉDITO */}
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#8C7354",
                letterSpacing: "1px",
                marginBottom: "24px",
                paddingBottom: "8px",
                borderBottom: "1px solid #E5E0A0"
              }}>
                <MaterialIcon name="person" style={{ fontSize: "25px" }}  />
                INFORMACIÓN DEL CRÉDITO
              </h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px"
                  }}>
                    
                    NOMBRE DEL CLIENTE
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px"
                  }}>
                    CÉDULA DE CIUDADANÍA (CC)
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
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* DETALLES FINANCIEROS */}
            <div style={{ marginBottom: "0" }}>
              <h2 style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#8C7354",
                letterSpacing: "1px",
                marginBottom: "24px",
                paddingBottom: "8px",
                borderBottom: "1px solid #E5E0A0"
              }}>
                <MaterialIcon name="payments" style={{ fontSize: "25px" }}  />
                DETALLES FINANCIEROS
              </h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px"
                  }}>
                    
                    VALOR DEL CRÉDITO
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6B7280",
                      fontSize: "0.9rem"
                    }}>$</span>
                    <input
                      type="text"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px 16px 12px 32px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                        fontSize: "0.9rem",
                        background: "white",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px"
                  }}>
                    ESTADO DEL CRÉDITO
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      background: "white",
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="Aprobado">Aprobado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En revisión">En revisión</option>
                    <option value="Rechazado">Rechazado</option>
                    <option value="Pagado">Pagado</option>
                  </select>
                </div>
                
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px"
                  }}>
                    FECHA INICIO
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px"
                  }}>
                    FECHA LÍMITE
                  </label>
                  <input
                    type="text"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            padding: "20px 32px",
            background: "white",
            borderTop: "1px solid #E5E0A0"
          }}>
            <button
              onClick={handleCancel}
              style={{
                background: "transparent",
                border: "none",
                color: "#6B7280",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: "pointer",
                padding: "10px 20px",
                borderRadius: "8px",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Cancelar
            </button>
            
            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#8C7354",
                color: "white",
                border: "none",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#6B5740"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#8C7354"}
            >
              <MaterialIcon name="save" style={{ fontSize: "18px" }} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCredito;