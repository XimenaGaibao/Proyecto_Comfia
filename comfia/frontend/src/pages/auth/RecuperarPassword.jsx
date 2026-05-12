import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { showSuccess, showError, showWarning } from "../../Alerts";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span className="material-symbols-outlined" style={{ fontSize: "24px", ...style }}>
    {name}
  </span>
);

const RecuperarPassword = () => {
  const navigate = useNavigate();


  // Estados
  const [step, setStep] = useState(1); // 1: email, 2: reset password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const fontFamily = "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // Validar email
  const validateEmail = (value) => {
    if (!value.trim()) return "El correo electrónico es obligatorio";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Ingrese un correo electrónico válido";
    return "";
  };

  // Validar nueva contraseña
  const validatePassword = (value) => {
    if (!value) return "La contraseña es obligatoria";
    if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres";
    return "";
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Confirme su contraseña";
    if (value !== newPassword) return "Las contraseñas no coinciden";
    return "";
  };

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    const error = validateEmail(email);
    setErrors({ ...errors, email: error });
  };

  const handlePasswordBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    let error = "";
    if (field === "newPassword") {
      error = validatePassword(newPassword);
    } else if (field === "confirmPassword") {
      error = validateConfirmPassword(confirmPassword);
    }
    setErrors({ ...errors, [field]: error });
  };

  // Enviar correo de recuperación
  const handleSendCode = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      setTouched({ email: true });
      showWarning(emailError);
      return;
    }

    setIsLoading(true);

    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Código enviado a:", email);
      showSuccess(`Se ha enviado un código de verificación a ${email}`);
      setStep(2);
    } catch (error) {
      console.error("Error al enviar código:", error);
      showError(error.message || "Error al enviar el código. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Restablecer contraseña
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const passwordError = validatePassword(newPassword);
    const confirmError = validateConfirmPassword(confirmPassword);
    
    if (passwordError || confirmError) {
      setErrors({
        ...errors,
        newPassword: passwordError,
        confirmPassword: confirmError
      });
      setTouched({ ...touched, newPassword: true, confirmPassword: true });
      showWarning("Por favor verifique los campos");
      return;
    }

    if (!code.trim()) {
      showWarning("Por favor ingrese el código de verificación");
      return;
    }

    setIsLoading(true);

    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Contraseña restablecida para:", email);
      showSuccess("¡Contraseña restablecida exitosamente!");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      showError(error.message || "Error al restablecer la contraseña. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#F3F4F6",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: fontFamily
    }}>
      
      {/* Tarjeta principal */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "40px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}>
        
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "60px",
            height: "60px",
            background: "#8C7354",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px auto"
          }}>
            <span style={{ color: "white", fontWeight: "bold", fontSize: "28px" }}>C</span>
          </div>
          <h1 style={{ 
            fontSize: "1.8rem", 
            fontWeight: 700, 
            color: "#1F2937", 
            marginBottom: "8px" 
          }}>
            {step === 1 ? "Recuperar Contraseña" : "Restablecer Contraseña"}
          </h1>
          <p style={{ 
            fontSize: "0.9rem", 
            color: "#6B7280", 
            lineHeight: 1.5 
          }}>
            {step === 1 
              ? "Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña"
              : "Ingresa el código de verificación y tu nueva contraseña"
            }
          </p>
        </div>

        {/* Paso 1: Solicitar correo */}
        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#4B5563",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                CORREO ELECTRÓNICO
              </label>
              <div style={{ position: "relative" }}>
                <MaterialIcon
                  name="mail"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9CA3AF",
                    fontSize: "20px"
                  }}
                />
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 48px",
                    border: `1px solid ${errors.email && touched.email ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8C7354"}
                />
              </div>
              {errors.email && touched.email && (
                <p style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "6px" }}>
                  {errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                background: "#8C7354",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = "#6B5740" }}
              onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.background = "#8C7354" }}
            >
              {isLoading ? (
                <>Enviando...</>
              ) : (
                <>
                  <MaterialIcon name="send" style={{ fontSize: "18px" }} />
                  Enviar código
                </>
              )}
            </button>
          </form>
        )}

        {/* Paso 2: Restablecer contraseña */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            {/* Código de verificación */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#4B5563",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                CÓDIGO DE VERIFICACIÓN
              </label>
              <div style={{ position: "relative" }}>
                <MaterialIcon
                  name="verified"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9CA3AF",
                    fontSize: "20px"
                  }}
                />
                <input
                  type="text"
                  placeholder="Ingresa el código de 6 dígitos"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 48px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8C7354"}
                  onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>
              <p style={{ fontSize: "0.7rem", color: "#9CA3AF", marginTop: "6px" }}>
                Revisa tu correo electrónico
              </p>
            </div>

            {/* Nueva contraseña */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#4B5563",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                NUEVA CONTRASEÑA
              </label>
              <div style={{ position: "relative" }}>
                <MaterialIcon
                  name="lock"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9CA3AF",
                    fontSize: "20px"
                  }}
                />
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={() => handlePasswordBlur("newPassword")}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 48px",
                    border: `1px solid ${errors.newPassword && touched.newPassword ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8C7354"}
                />
              </div>
              {errors.newPassword && touched.newPassword && (
                <p style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "6px" }}>
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#4B5563",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                CONFIRMAR CONTRASEÑA
              </label>
              <div style={{ position: "relative" }}>
                <MaterialIcon
                  name="lock"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9CA3AF",
                    fontSize: "20px"
                  }}
                />
                <input
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => handlePasswordBlur("confirmPassword")}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 48px",
                    border: `1px solid ${errors.confirmPassword && touched.confirmPassword ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "1rem",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8C7354"}
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "6px" }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                background: "#8C7354",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = "#6B5740" }}
              onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.background = "#8C7354" }}
            >
              {isLoading ? (
                <>Procesando...</>
              ) : (
                <>
                  <MaterialIcon name="check_circle" style={{ fontSize: "18px" }} />
                  Restablecer contraseña
                </>
              )}
            </button>
          </form>
        )}

        {/* Enlace para volver al login */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link
            to="/login"
            style={{
              fontSize: "0.85rem",
              color: "#8C7354",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <MaterialIcon name="arrow_back" style={{ fontSize: "16px" }} />
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPassword;