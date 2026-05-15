import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { showSuccess, showError, showWarning } from "../../Alerts";
import { CreditService } from "../../Services/CreditService";

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
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Datos del crédito
  const [formData, setFormData] = useState({
    clientName: "",
    document: "",
    amount: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const loadCredit = async () => {
    try {
      setLoading(true);
      const data = await CreditService.getById(id);
      
      // Formatear fechas para el input date (YYYY-MM-DD)
      const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };
      
      setFormData({
        clientName: data.nombre_cliente,
        document: data.documento_cliente,
        amount: data.monto,
        status: data.estado,
        startDate: formatDateForInput(data.fecha_inicio),
        endDate: formatDateForInput(data.fecha_fin),
      });
    } catch (error) {
      console.error("Error al cargar crédito:", error);
      showError("Error al cargar los datos del crédito");
      navigate("/creditos");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos del crédito desde el backend
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCredit();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.clientName || !formData.document || !formData.amount) {
      showWarning("Por favor completa todos los campos obligatorios");
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        nombre_cliente: formData.clientName,
        documento_cliente: formData.document,
        monto: parseFloat(formData.amount),
        estado: formData.status,
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate || null,
      };

      await CreditService.update(id, updateData);
      showSuccess("Crédito actualizado correctamente");
      navigate("/creditos");
    } catch (error) {
      console.error("Error al actualizar crédito:", error);
      const message = error.response?.data?.message || "Ocurrió un error al actualizar el crédito";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
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
    { name: "Reportes", path: "/reportes", icon: "assessment", active: false },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#F3F4F6" }}>
        <div style={{ width: "260px", background: "#FFF5AC" }}></div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", border: "3px solid #E5E7EB", borderTopColor: "#8C7354", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px auto" }}></div>
            <p style={{ fontSize: "1rem", color: "#6B7280" }}>Cargando crédito...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

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
                fontSize: "20px",
              }}
            >
              {user?.nombre?.charAt(0) || user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p
                style={{ color: "#8C7354", fontSize: "1.3rem", fontWeight: 600 }}
              >
                {user?.nombre || user?.name || "Usuario"}
              </p>
              <p style={{ color: "#9CA3AF", fontSize: "1rem" }}>
                {user?.rol || "Visualizador"}
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
      <div style={{ flex: 1, padding: "40px", width: "100%" }}>

        <div style={{ marginBottom: "8px" }}>
          <span style={{ fontSize: "1.2rem", color: "#9CA3AF", letterSpacing: "0.5px" }}>
            CRÉDITOS &gt; EDITAR
          </span>
        </div>

        {/* Título */}
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1F2937", marginBottom: "32px" }}>
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
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#8C7354",
                letterSpacing: "1px",
                marginBottom: "24px",
                paddingBottom: "8px",
                borderBottom: "1px solid #E5E0A0"
              }}>
                <MaterialIcon name="person" style={{ fontSize: "28px" }} />
                INFORMACIÓN DEL CRÉDITO
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "1rem",
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
                      fontSize: "1.2rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "1rem",
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
                      fontSize: "1.2rem",
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
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#8C7354",
                letterSpacing: "1px",
                marginBottom: "24px",
                paddingBottom: "8px",
                borderBottom: "1px solid #E5E0A0"
              }}>
                <MaterialIcon name="payments" style={{ fontSize: "28px" }} />
                DETALLES FINANCIEROS
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "1rem",
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
                      fontSize: "1.2rem"
                    }}>$</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px 16px 12px 32px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                        fontSize: "1.2rem",
                        background: "white",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "1rem",
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
                      fontSize: "1.2rem",
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
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px"
                  }}>
                    FECHA INICIO
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "1.2rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "8px"
                  }}>
                    FECHA LÍMITE
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "1.2rem",
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
                fontSize: "1.2rem",
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
              disabled={isSubmitting}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#8C7354",
                color: "white",
                border: "none",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "1.2rem",
                fontWeight: 600,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#6B5740" }}
              onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#8C7354" }}
            >
              <MaterialIcon name="save" style={{ fontSize: "22px" }} />
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCredito;