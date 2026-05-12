// src/pages/private/CrearUsuario.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import '../../styles/styles.css';
import { showSuccess, showError, showWarning } from "../../Alerts";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span className="material-symbols-outlined" style={{ fontSize: "22px", ...style }}>
    {name}
  </span>
);

const CrearUsuario = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "",
    phone: "",
    role: "Visualizador",
    status: "Activo",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Opciones para selects
  const roleOptions = [
    { value: "Administrador", label: "Administrador" },
    { value: "Editor", label: "Editor" },
    { value: "Visualizador", label: "Visualizador" },
  ];

  const statusOptions = [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" },
  ];

  // Validar campos
  const validateField = (name, value) => {
    switch (name) {
      case "name": {
        if (!value.trim()) return "El nombre completo es obligatorio";
        if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
        return "";
      }
      case "email": {
        if (!value.trim()) return "El correo electrónico es obligatorio";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Ingrese un correo electrónico válido";
        return "";
      }
      case "document": {
        if (!value.trim()) return "El número de identificación es obligatorio";
        if (!/^\d+$/.test(value)) return "Solo se permiten números";
        if (value.length < 6) return "La identificación debe tener al menos 6 dígitos";
        if (value.length > 15) return "La identificación no puede tener más de 15 dígitos";
        return "";
      }
      case "phone": {
        if (!value.trim()) return "El número de teléfono es obligatorio";
        if (!/^\d+$/.test(value)) return "Solo se permiten números";
        if (value.length < 7) return "El teléfono debe tener al menos 7 dígitos";
        if (value.length > 15) return "El teléfono no puede tener más de 15 dígitos";
        return "";
      }
      case "role": {
        if (!value) return "El rol es obligatorio";
        return "";
      }
      case "status": {
        if (!value) return "El estado es obligatorio";
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
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Usuario registrado:", formData);
      
      showSuccess("¡Usuario registrado exitosamente!");
      
      setTimeout(() => {
        handleCancel();
        navigate("/usuarios");
      }, 2000);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      showError(error.message || "Ocurrió un error al registrar el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Limpia todos los campos
  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      document: "",
      phone: "",
      role: "Visualizador",
      status: "Activo",
    });
    setTouched({});
    setErrors({});
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#FFF5AC", fontFamily: "Inter, Poppins, sans-serif" }}>
      
      {/* HEADER BLANCO */}
      <header style={{
        background: "white",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div onClick={() => navigate("/dashboard")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{ width: "36px", height: "36px", background: "#8C7354", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>C</span>
          </div>
          <span style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#8C7354" }}>COMFÍA</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button onClick={() => navigate("/notificaciones")} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            <MaterialIcon name="notifications_none" style={{ fontSize: "24px", color: "#4B5563" }} />
          </button>

          <button onClick={() => navigate("/perfil")} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "36px", height: "36px", background: "#8C7354", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "20px" }}>
              {user?.name?.charAt(0) || "A"}
            </div>
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        
        {/* Tarjeta del formulario */}
        <div style={{ width: "100%", maxWidth: "700px", background: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          
          <div style={{ padding: "24px 32px", borderBottom: "1px solid #F0F0F0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1F2937" }}>Registrar Usuario</h1>
                <p style={{ fontSize: "1.2rem", color: "#6B7280", marginTop: "4px" }}>Complete la información para crear un nuevo usuario en el sistema.</p>
              </div>
              <button onClick={() => navigate("/usuarios")} style={{ padding: "8px", background: "transparent", border: "none", cursor: "pointer", borderRadius: "8px" }}>
                <MaterialIcon name="close" style={{ color: "#6B7280", fontSize: "20px" }} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* Nombre completo */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "#4B5563", marginBottom: "8px" }}>
                  <MaterialIcon name="person" style={{ fontSize: "22px", color: "#8C7354" }} />
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: Juan Pérez"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${errors.name && touched.name ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "1.2rem",
                    outline: "none",
                    transition: "all 0.2s",
                    background: "#f7f7f7"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8C7354"}
                />
                {errors.name && touched.name && (
                  <p style={{ color: "#EF4444", fontSize: "1rem", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MaterialIcon name="error" style={{ fontSize: "16px" }} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Correo electrónico */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "#4B5563", marginBottom: "8px" }}>
                  <MaterialIcon name="mail" style={{ fontSize: "22px", color: "#8C7354" }} />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ejemplo@correo.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${errors.email && touched.email ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "1.2rem",
                    outline: "none",
                    background: "#f7f7f7"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8C7354"}
                />
                {errors.email && touched.email && (
                  <p style={{ color: "#EF4444", fontSize: "1rem", marginTop: "4px" }}>{errors.email}</p>
                )}
              </div>

              {/* Número de identificación */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "#4B5563", marginBottom: "8px" }}>
                  <MaterialIcon name="credit_card" style={{ fontSize: "22px", color: "#8C7354" }} />
                  Número de identificación (CC)
                </label>
                <input
                  type="text"
                  name="document"
                  value={formData.document}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="000.000.000"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${errors.document && touched.document ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "1.2rem",
                    outline: "none",
                    background: "#f7f7f7"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8C7354"}
                />
                {errors.document && touched.document && (
                  <p style={{ color: "#EF4444", fontSize: "1rem", marginTop: "4px" }}>{errors.document}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "#4B5563", marginBottom: "8px" }}>
                  <MaterialIcon name="phone" style={{ fontSize: "22px", color: "#8C7354" }} />
                  Número de teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="300 000 0000"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${errors.phone && touched.phone ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "1.2rem",
                    outline: "none",
                    background: "#f7f7f7"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8C7354"}
                />
                {errors.phone && touched.phone && (
                  <p style={{ color: "#EF4444", fontSize: "1rem", marginTop: "4px" }}>{errors.phone}</p>
                )}
              </div>

              {/* Rol y Estado en grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "#4B5563", marginBottom: "8px" }}>
                    <MaterialIcon name="badge" style={{ fontSize: "22px", color: "#8C7354" }} />
                    Rol
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: `1px solid ${errors.role && touched.role ? "#EF4444" : "#E5E7EB"}`,
                      borderRadius: "12px",
                      fontSize: "1.2rem",
                      background: "white",
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    {roleOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {errors.role && touched.role && (
                    <p style={{ color: "#EF4444", fontSize: "1rem", marginTop: "4px" }}>{errors.role}</p>
                  )}
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600, color: "#4B5563", marginBottom: "8px" }}>
                    <MaterialIcon name="check_circle" style={{ fontSize: "22px", color: "#8C7354" }} />
                    Estado
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: `1px solid ${errors.status && touched.status ? "#EF4444" : "#E5E7EB"}`,
                      borderRadius: "12px",
                      fontSize: "1.2rem",
                      background: "white",
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {errors.status && touched.status && (
                    <p style={{ color: "#EF4444", fontSize: "1rem", marginTop: "4px" }}>{errors.status}</p>
                  )}
                </div>
              </div>

              {/* Nota informativa */}
              <div style={{ background: "#FEF3C7", borderRadius: "12px", padding: "12px 16px", border: "1px solid #FDE68A", marginTop: "8px" }}>
                <p style={{ fontSize: "1rem", color: "#92400E", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "18px", height: "18px", background: "#F59E0B", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", fontWeight: "bold" }}>!</span>
                  Al crear un usuario, se enviará un correo electrónico con sus credenciales de acceso.
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
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#6B5740" }}
                  onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#8C7354" }}
                >
                  {isSubmitting ? (
                    <>Procesando...</>
                  ) : (
                    <>
                      <MaterialIcon name="person_add" style={{ fontSize: "22px" }} />
                      Registrar Usuario
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
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.borderColor = "#D1D5DB" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#E5E7EB" }}
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

export default CrearUsuario;