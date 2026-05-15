import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { showSuccess, showError, showConfirm } from "../../Alerts";
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

const DetalleCredito = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [credit, setCredit] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  const loadCredit = async () => {
    try {
      setLoading(true);
      const data = await CreditService.getById(id);
      
      // Formatear fechas
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO');
      };
      
      setCredit({
        id: data.id,
        client: data.nombre_cliente,
        document: data.documento_cliente,
        amount: data.monto,
        date: formatDate(data.fecha_inicio),
        status: data.estado,
        type: data.tipo || "Personal",
        interest: data.interes || 0,
        term: data.plazo || 12,
        pendingAmount: data.monto_pendiente || data.monto,
        paidAmount: data.monto_pagado || 0,
        nextPayment: formatDate(data.fecha_fin),
        notes: "Cliente con buen historial crediticio. Documentación completa."
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

  

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDelete = async () => {
    const result = await showConfirm(
      `¿Estás seguro de eliminar el crédito de "${credit?.client}"? Esta acción no se puede deshacer.`,
      "Confirmar Eliminación",
      "Eliminar",
      "Cancelar"
    );
    
    if (result.isConfirmed) {
      try {
        await CreditService.delete(id);
        showSuccess("Crédito eliminado correctamente");
        setTimeout(() => navigate("/creditos"), 1500);
      } catch (error) {
        console.error("Error al eliminar el crédito:", error);
        showError(error.response?.data?.message || "Ocurrió un error al eliminar el crédito");
      }
    }
  };

  const handleRegisterPayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      showError("Por favor ingrese un monto válido");
      return;
    }
    
    const amount = parseFloat(paymentAmount);
    if (amount > credit.pendingAmount) {
      showError(`El monto no puede superar el saldo pendiente (${formatCurrency(credit.pendingAmount)})`);
      return;
    }
    
    try {
      await CreditService.addPayment(id, {
        monto: amount,
        fecha_pago: paymentDate
      });
      
      showSuccess(`Pago de ${formatCurrency(amount)} registrado correctamente`);
      await loadCredit(); // Recargar datos actualizados
      setShowPaymentModal(false);
      setPaymentAmount("");
    } catch (error) {
      console.error("Error al registrar pago:", error);
      showError(error.response?.data?.message || "Error al registrar el pago");
    }
  };

  const getStatusStyle = (status) => {
    const estado = status?.toLowerCase() || '';
    switch (estado) {
      case 'aprobado':
        return { color: "#10B981", bg: "#D4EDDA", text: "Aprobado" };
      case 'pendiente':
        return { color: "#F59E0B", bg: "#FFF3CD", text: "Pendiente" };
      case 'en_revision':
        return { color: "#3B82F6", bg: "#E3F2FD", text: "En revisión" };
      case 'rechazado':
        return { color: "#EF4444", bg: "#FEE2E2", text: "Rechazado" };
      case 'pagado':
        return { color: "#10B981", bg: "#D4EDDA", text: "Pagado" };
      default:
        return { color: "#6B7280", bg: "#F3F4F6", text: status || "Desconocido" };
    }
  };

  const getPaymentStatusStyle = (status) => {
    if (status === "Pagado") {
      return { color: "#10B981", bg: "#D4EDDA" };
    }
    return { color: "#F59E0B", bg: "#FFF3CD" };
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Gestión de Créditos", path: "/creditos", icon: "payments", active: true },
    { name: "Gestión de Usuarios", path: "/usuarios", icon: "group", active: false },
    { name: "Configuración", path: "/configuracion", icon: "settings", active: false },
    { name: "Reportes", path: "/reportes", icon: "assessment", active: false },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#F3F4F6" }}>
        <div style={{ width: "260px", background: "#FFF5AC" }}></div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", border: "3px solid #E5E7EB", borderTopColor: "#8C7354", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px auto" }}></div>
            <p style={{ fontSize: "1rem", color: "#6B7280" }}>Cargando información del crédito...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyle(credit?.status);
  const paymentHistory = [
    { id: 1, date: "15/11/2023", amount: 425000, status: "Pagado" },
    { id: 2, date: "15/12/2023", amount: 425000, status: "Pagado" },
    { id: 3, date: "15/01/2024", amount: 425000, status: "Pagado" },
    { id: 4, date: "15/02/2024", amount: 425000, status: "Pendiente" },
    { id: 5, date: "15/03/2024", amount: 425000, status: "Pendiente" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F3F4F6" }}>
      
      {/* MENÚ LATERAL IZQUIERDO */}
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
              <p style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "2px" }}>Sistema de Crédito</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "20px 12px" }}>
          {menuItems.map((item) => (
            <div key={item.name} onClick={() => navigate(item.path)} style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", marginBottom: "4px",
              borderRadius: "10px", cursor: "pointer", background: item.active ? "#8C7354" : "transparent",
              color: item.active ? "white" : "#6B7280"
            }}>
              <MaterialIcon name={item.icon} style={{ color: item.active ? "white" : "#6B7280" }} />
              <span style={{ fontSize: "1.4rem", fontWeight: 500 }}>{item.name}</span>
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
                style={{
                  color: "#8C7354",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}
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
      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        
        {/* Encabezado */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#1F2937" }}>Detalle del Crédito</h1>
            <p style={{ fontSize: "1rem", color: "#6B7280", marginTop: "4px" }}>Información completa del crédito #{credit?.id}</p>
          </div>
          <button onClick={() => navigate("/creditos")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "8px 16px", fontSize: "1rem", cursor: "pointer" }}>
            <MaterialIcon name="arrow_back" style={{ fontSize: "20px" }} /> Volver
          </button>
        </div>

        {/* Información del Crédito */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
          
          {/* Card izquierda - Información General */}
          <div style={{ background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#8C7354", marginBottom: "24px", paddingBottom: "12px", borderBottom: "2px solid #F4ECA6" }}>
              <MaterialIcon name="info" style={{ fontSize: "22px", marginRight: "8px", verticalAlign: "middle" }} />
              Información General
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>CLIENTE</p>
                <p style={{ fontSize: "1.2rem", fontWeight: 500, color: "#1F2937", marginBottom: "20px" }}>{credit?.client}</p>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>CÉDULA</p>
                <p style={{ fontSize: "1.2rem", color: "#1F2937", marginBottom: "20px" }}>{credit?.document}</p>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>FECHA SOLICITUD</p>
                <p style={{ fontSize: "1.2rem", color: "#1F2937" }}>{credit?.date}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>TIPO</p>
                <p style={{ fontSize: "1.2rem", fontWeight: 500, color: "#1F2937", marginBottom: "20px" }}>{credit?.type}</p>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>ESTADO</p>
                <p style={{ marginBottom: "20px" }}>
                  <span style={{ padding: "5px 14px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: 600, background: statusStyle.bg, color: statusStyle.color }}>
                    {statusStyle.text}
                  </span>
                </p>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>PRÓXIMO PAGO</p>
                <p style={{ fontSize: "1.2rem", color: "#1F2937" }}>{credit?.nextPayment}</p>
              </div>
            </div>
          </div>

          {/* Card derecha - Detalles Financieros */}
          <div style={{ background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#8C7354", marginBottom: "24px", paddingBottom: "12px", borderBottom: "2px solid #F4ECA6" }}>
              <MaterialIcon name="payments" style={{ fontSize: "22px", marginRight: "8px", verticalAlign: "middle" }} />
              Detalles Financieros
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>MONTO TOTAL</p>
                <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>{formatCurrency(credit?.amount)}</p>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>SALDO PENDIENTE</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 600, color: "#EF4444", marginBottom: "20px" }}>{formatCurrency(credit?.pendingAmount)}</p>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>TASA INTERÉS</p>
                <p style={{ fontSize: "1.2rem", color: "#1F2937" }}>{credit?.interest}% anual</p>
              </div>
              <div>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>TOTAL PAGADO</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 600, color: "#10B981", marginBottom: "20px" }}>{formatCurrency(credit?.paidAmount)}</p>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>PLAZO</p>
                <p style={{ fontSize: "1.2rem", color: "#1F2937", marginBottom: "20px" }}>{credit?.term} meses</p>
                <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "6px" }}>VALOR CUOTA</p>
                <p style={{ fontSize: "1.2rem", color: "#1F2937" }}>{formatCurrency(Math.round(credit?.amount / credit?.term))}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Historial de Pagos */}
        <div style={{ background: "white", borderRadius: "20px", padding: "28px", marginBottom: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#8C7354" }}>
              <MaterialIcon name="history" style={{ fontSize: "22px", marginRight: "8px", verticalAlign: "middle" }} />
              Historial de Pagos
            </h2>
            {credit?.status !== "Pagado" && credit?.pendingAmount > 0 && (
              <button onClick={() => setShowPaymentModal(true)} style={{ background: "#8C7354", color: "white", border: "none", padding: "8px 20px", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                <MaterialIcon name="add" style={{ fontSize: "18px" }} /> Registrar Pago
              </button>
            )}
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                  <th style={{ padding: "14px", textAlign: "left", fontSize: "0.9rem", color: "#6B7280", fontWeight: 600 }}>#</th>
                  <th style={{ padding: "14px", textAlign: "left", fontSize: "0.9rem", color: "#6B7280", fontWeight: 600 }}>FECHA</th>
                  <th style={{ padding: "14px", textAlign: "left", fontSize: "0.9rem", color: "#6B7280", fontWeight: 600 }}>MONTO</th>
                  <th style={{ padding: "14px", textAlign: "left", fontSize: "0.9rem", color: "#6B7280", fontWeight: 600 }}>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => {
                  const paymentStyle = getPaymentStatusStyle(payment.status);
                  return (
                    <tr key={payment.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      <td style={{ padding: "12px", fontSize: "1rem", color: "#1F2937" }}>{index + 1}</td>
                      <td style={{ padding: "12px", fontSize: "1rem", color: "#6B7280" }}>{payment.date}</td>
                      <td style={{ padding: "12px", fontSize: "1rem", fontWeight: 500, color: "#1F2937" }}>{formatCurrency(payment.amount)}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ padding: "3px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, background: paymentStyle.bg, color: paymentStyle.color }}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notas Adicionales */}
        <div style={{ background: "#FFF9E6", borderRadius: "20px", padding: "24px", marginBottom: "24px", border: "1px solid #FDE68A" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#8C7354", marginBottom: "12px" }}>
            <MaterialIcon name="description" style={{ fontSize: "20px", marginRight: "8px", verticalAlign: "middle" }} />
            Notas Adicionales
          </h3>
          <p style={{ fontSize: "1rem", color: "#6B7280", lineHeight: 1.5 }}>{credit?.notes}</p>
        </div>

        {/* Botones de Acción */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
          <button onClick={() => navigate(`/creditos/editar/${credit?.id}`)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid #8C7354", color: "#8C7354", padding: "10px 24px", borderRadius: "8px", fontSize: "1rem", fontWeight: 500, cursor: "pointer" }}>
            <MaterialIcon name="edit" style={{ fontSize: "20px" }} /> Editar Crédito
          </button>
          <button onClick={handleDelete} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#EF4444", color: "white", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>
            <MaterialIcon name="delete" style={{ fontSize: "20px" }} /> Eliminar Crédito
          </button>
        </div>
      </div>

      {/* Modal de Registrar Pago */}
      {showPaymentModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setShowPaymentModal(false)}>
          <div style={{ background: "white", borderRadius: "20px", width: "480px", maxWidth: "90%", padding: "32px", boxShadow: "0 20px 35px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1F2937", marginBottom: "24px" }}>Registrar Pago</h2>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#4B5563", marginBottom: "8px" }}>MONTO DEL PAGO</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7280", fontSize: "1rem" }}>$</span>
                <input type="number" placeholder="0" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} style={{ width: "100%", padding: "12px 16px 12px 32px", border: "1px solid #E5E7EB", borderRadius: "10px", fontSize: "1.1rem", outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#8C7354"} onBlur={(e) => e.target.style.borderColor = "#E5E7EB"} />
              </div>
              <p style={{ fontSize: "0.8rem", color: "#6B7280", marginTop: "4px" }}>Saldo pendiente: {formatCurrency(credit?.pendingAmount)}</p>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#4B5563", marginBottom: "8px" }}>FECHA DEL PAGO</label>
              <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "1px solid #E5E7EB", borderRadius: "10px", fontSize: "1.1rem", outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowPaymentModal(false)} style={{ padding: "10px 20px", background: "white", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "0.95rem", cursor: "pointer" }}>Cancelar</button>
              <button onClick={handleRegisterPayment} style={{ padding: "10px 24px", background: "#8C7354", color: "white", border: "none", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer" }}>Registrar Pago</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleCredito;