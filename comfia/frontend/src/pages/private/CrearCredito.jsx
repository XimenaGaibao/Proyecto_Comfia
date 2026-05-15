import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/styles.css";
import { showSuccess, showError, showWarning } from "../../Alerts";
import { CreditService } from "../../Services/CreditService";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: "22px", ...style }}
  >
    {name}
  </span>
);

const CrearCredito = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    clientName: "",
    identification: "",
    amount: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formatear moneda colombiana
  const formatCurrency = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Manejar cambio del monto
  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, amount: rawValue });
    if (touched.amount) validateField("amount", rawValue);
  };

  // Validar campos
  const validateField = (name, value) => {
    switch (name) {
      case "clientName": {
        if (!value.trim()) return "El nombre del cliente es obligatorio";
        if (value.trim().length < 3)
          return "El nombre debe tener al menos 3 caracteres";
        return "";
      }
      case "identification": {
        if (!value.trim()) return "El número de identificación es obligatorio";
        if (!/^\d+$/.test(value)) return "Solo se permiten números";
        if (value.length < 6)
          return "La identificación debe tener al menos 6 dígitos";
        return "";
      }
      case "amount": {
        if (!value) return "El valor del crédito es obligatorio";
        const amountNum = parseInt(value, 10);
        if (amountNum <= 0) return "El valor debe ser mayor a 0";
        if (amountNum < 100000) return "El valor mínimo es $100,000 COP";
        return "";
      }
      case "startDate": {
  if (!value) return "La fecha de inicio es obligatoria";
  const startDate = new Date(value);
  const today = new Date();
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  if (startDate < today) return "La fecha de inicio no puede ser anterior a hoy";
  return "";
}
      case "endDate": {
        if (!value) return "La fecha límite es obligatoria";
        const endDate = new Date(value);
        const start = new Date(formData.startDate);
        if (endDate <= start)
          return "La fecha límite debe ser posterior a la fecha de inicio";
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showWarning("Por favor completa todos los campos correctamente");
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos para el backend
      const creditData = {
        nombre_cliente: formData.clientName,
        documento_cliente: formData.identification,
        monto: parseFloat(formData.amount),
        interes: 0,
        plazo: 12,
        estado: "pendiente",
        tipo: "personal",
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        monto_pendiente: parseFloat(formData.amount),
        monto_pagado: 0,
        creado_por: user?.id || 1,
      };

      const response = await CreditService.create(creditData);

      console.log("Crédito registrado:", response);
      showSuccess("¡Crédito registrado exitosamente!");

      setTimeout(() => {
        handleCancel();
        navigate("/creditos");
      }, 2000);
    } catch (error) {
      console.error("Error al registrar el crédito:", error);
      const message =
        error.response?.data?.message ||
        "Ocurrió un error al registrar el crédito";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // limpia todos los campos
  const handleCancel = () => {
    setFormData({
      clientName: "",
      identification: "",
      amount: "",
      startDate: "",
      endDate: "",
    });
    setTouched({});
    setErrors({});
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#FFF5AC",
        fontFamily: "Inter, Poppins, sans-serif",
      }}
    >
      {/* HEADER BLANCO */}
      <header
        style={{
          background: "white",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          onClick={() => navigate("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "#8C7354",
              borderRadius: "10px",
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
          <span
            style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#8C7354" }}
          >
            COMFÍA
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
              style={{ fontSize: "22px", color: "#4B5563" }}
            />
          </button>

          <button
            onClick={() => navigate("/perfil")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
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
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        {/* Tarjeta del formulario */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "white",
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{ padding: "24px 32px", borderBottom: "1px solid #F0F0F0" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#1F2937",
                  }}
                >
                  Registrar Crédito
                </h1>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#6B7280",
                    marginTop: "4px",
                  }}
                >
                  Complete la información detallada para procesar la solicitud
                  de crédito.
                </p>
              </div>
              <button
                onClick={() => navigate("/creditos")}
                style={{
                  padding: "8px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
              >
                <MaterialIcon name="close" style={{ color: "#6B7280" }} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Nombre del cliente */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#4B5563",
                    marginBottom: "8px",
                  }}
                >
                  <MaterialIcon
                    name="person"
                    style={{ fontSize: "18px", color: "#8C7354" }}
                  />
                  Nombre del cliente
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: Juan Pérez"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${errors.clientName && touched.clientName ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    outline: "none",
                    transition: "all 0.2s",
                    background: "#f7f7f7",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8C7354")}
                />
                {errors.clientName && touched.clientName && (
                  <p
                    style={{
                      color: "#EF4444",
                      fontSize: "0.7rem",
                      marginTop: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <MaterialIcon name="error" style={{ fontSize: "14px" }} />{" "}
                    {errors.clientName}
                  </p>
                )}
              </div>

              {/* CC */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#4B5563",
                    marginBottom: "8px",
                  }}
                >
                  <MaterialIcon
                    name="credit_card"
                    style={{ fontSize: "18px", color: "#8C7354" }}
                  />
                  CC (Número de identificación)
                </label>
                <input
                  type="text"
                  name="identification"
                  value={formData.identification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="000.000.000"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${errors.identification && touched.identification ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    outline: "none",
                    background: "#f7f7f7",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8C7354")}
                />
                {errors.identification && touched.identification && (
                  <p
                    style={{
                      color: "#EF4444",
                      fontSize: "0.7rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.identification}
                  </p>
                )}
              </div>

              {/* Valor del crédito */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#4B5563",
                    marginBottom: "8px",
                  }}
                >
                  <MaterialIcon
                    name="attach_money"
                    style={{ fontSize: "18px", color: "#8C7354" }}
                  />
                  Valor del crédito
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={
                      formData.amount ? formatCurrency(formData.amount) : ""
                    }
                    onChange={handleAmountChange}
                    onBlur={handleBlur}
                    placeholder="$ 0.00"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: `1px solid ${errors.amount && touched.amount ? "#EF4444" : "#E5E7EB"}`,
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      outline: "none",
                      background: "#f7f7f7",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8C7354")}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9CA3AF",
                      fontSize: "0.7rem",
                    }}
                  >
                    COP
                  </span>
                </div>
                {errors.amount && touched.amount && (
                  <p
                    style={{
                      color: "#EF4444",
                      fontSize: "0.7rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* Fechas */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#4B5563",
                      marginBottom: "8px",
                    }}
                  >
                    <MaterialIcon
                      name="calendar_today"
                      style={{ fontSize: "18px", color: "#8C7354" }}
                    />
                    Fecha inicio
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: `1px solid ${errors.startDate && touched.startDate ? "#EF4444" : "#E5E7EB"}`,
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      outline: "none",
                      background: "#f7f7f7",
                    }}
                  />
                  {errors.startDate && touched.startDate && (
                    <p
                      style={{
                        color: "#EF4444",
                        fontSize: "0.7rem",
                        marginTop: "4px",
                      }}
                    >
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#4B5563",
                      marginBottom: "8px",
                    }}
                  >
                    <MaterialIcon
                      name="event"
                      style={{ fontSize: "18px", color: "#8C7354" }}
                    />
                    Fecha límite
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: `1px solid ${errors.endDate && touched.endDate ? "#EF4444" : "#E5E7EB"}`,
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      outline: "none",
                      background: "#f7f7f7",
                    }}
                  />
                  {errors.endDate && touched.endDate && (
                    <p
                      style={{
                        color: "#EF4444",
                        fontSize: "0.7rem",
                        marginTop: "4px",
                      }}
                    >
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Nota informativa */}
              <div
                style={{
                  background: "#FEF3C7",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  border: "1px solid #FDE68A",
                  marginTop: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "#92400E",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      background: "#F59E0B",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    !
                  </span>
                  Asegúrese de verificar toda la documentación antes de proceder
                  con el registro digital.
                </p>
              </div>

              {/* Botones */}
              <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    background: "#8C7354",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting)
                      e.currentTarget.style.background = "#6B5740";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting)
                      e.currentTarget.style.background = "#8C7354";
                  }}
                >
                  {isSubmitting ? (
                    <>Procesando...</>
                  ) : (
                    <>
                      <MaterialIcon
                        name="check_circle"
                        style={{ fontSize: "18px" }}
                      />
                      Registrar Solicitud
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    flex: 1,
                    background: "white",
                    border: "2px solid #E5E7EB",
                    color: "#6B7280",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                    e.currentTarget.style.borderColor = "#D1D5DB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearCredito;
