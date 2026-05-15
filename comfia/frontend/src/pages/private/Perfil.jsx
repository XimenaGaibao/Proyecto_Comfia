import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { showSuccess, showInfo, showError } from "../../Alerts";
import { UserService } from "../../Services/UserService";

const MaterialIcon = ({ name, style = {} }) => (
  <span className="material-symbols-outlined" style={{ fontSize: "24px", ...style }}>
    {name}
  </span>
);

const Perfil = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    document: "",
    phone: "",
    role: "",
    credit: 2400000,
    creditChange: "+12%",
    lastLogin: "",
    device: "",
    browser: ""
  });

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await UserService.getProfile();
      
      setProfile({
        name: data.nombre || "",
        email: data.email || "",
        location: data.direccion || "Medellín, Colombia",
        document: data.documento || "",
        phone: data.telefono || "",
        role: data.rol === "admin" ? "Administrador" : data.rol === "trabajador" ? "Trabajador" : "Cliente",
        credit: 2400000,
        creditChange: "+12%",
        lastLogin: new Date().toLocaleString(),
        device: 'MacBook Pro 16"',
        browser: "Chrome / macOS",
      });
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      showError("Error al cargar los datos del perfil");
    } finally {
      setLoading(false);
    }
  };


  // Cargar perfil desde el backend
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfile();
  }, []);

  
  const handleSaveChanges = async () => {
    try {
      await UserService.updateProfile({
        nombre: profile.name,
        email: profile.email,
        documento: profile.document,
        telefono: profile.phone,
        direccion: profile.location
      });
      
      showSuccess("Cambios guardados correctamente");
      setIsEditing(false);
      loadProfile(); // Recargar datos actualizados
    } catch (error) {
      console.error("Error al guardar:", error);
      showError(error.response?.data?.message || "Error al guardar los cambios");
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    showInfo("Modo edición activado", "Editar Perfil");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Gestión de Créditos", path: "/creditos", icon: "payments", active: false },
    { name: "Gestión de Usuarios", path: "/usuarios", icon: "group", active: false },
    { name: "Configuración", path: "/configuracion", icon: "settings", active: false },
    { name: "Reportes", path: "/reportes", icon: "assessment", active: false },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#F7F7F7" }}>
        <div style={{ width: "260px", background: "#FFF5AC" }}></div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", border: "3px solid #E5E7EB", borderTopColor: "#8C7354", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px auto" }}></div>
            <p style={{ fontSize: "1rem", color: "#6B7280" }}>Cargando perfil...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F7F7F7", fontFamily: "Inter, Poppins, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "260px", background: "#FFF5AC", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
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

        <div style={{ padding: "20px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div onClick={() => navigate("/perfil")} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", cursor: "pointer", borderRadius: "10px", padding: "4px 8px" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#E8E0A0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <div style={{ width: "36px", height: "36px", background: "#8C7354", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "20px" }}>
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p style={{ color: "#8C7354", fontSize: "1.3rem", fontWeight: 600 }}>{user?.name || "Admin User"}</p>
              <p style={{ color: "#9CA3AF", fontSize: "1rem" }}>Administrador</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "transparent", border: "1px solid #E5E7EB", borderRadius: "10px", color: "#6B7280", fontSize: "0.95rem", cursor: "pointer" }}>
            <MaterialIcon name="logout" style={{ fontSize: "20px" }} /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
        {/* Encabezado */}
        <div style={{ display: "flex", gap: "48px", marginBottom: "48px", alignItems: "flex-start" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(140,106,61,0.05)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0 }}></div>
            <div style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(140,106,61,0.03)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0 }}></div>
            <div style={{ width: "150px", height: "150px", background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: "2px solid #F0F0F0", position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "56px", fontWeight: 500, color: "#8C6A3D" }}>{profile.name.charAt(0) || "U"}</span>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <span style={{ background: "#D1FAE5", color: "#10B981", padding: "5px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600 }}>CUENTA ACTIVA</span>
              <span style={{ background: "#F3EDE5", color: "#8C6A3D", padding: "5px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600 }}>VERIFICADA</span>
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#1F2937", marginBottom: "6px" }}>{profile.name}</h1>
            <p style={{ fontSize: "1.1rem", color: "#8C6A3D", fontWeight: 500, marginBottom: "28px" }}>{profile.role}</p>

            {!isEditing ? (
              <button onClick={handleEditProfile} style={{ background: "#8C6A3D", color: "white", border: "none", padding: "12px 32px", borderRadius: "30px", fontSize: "1rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                <MaterialIcon name="edit" style={{ fontSize: "20px" }} /> Editar Perfil
              </button>
            ) : (
              <button onClick={handleSaveChanges} style={{ background: "#8C6A3D", color: "white", border: "none", padding: "12px 32px", borderRadius: "30px", fontSize: "1rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                <MaterialIcon name="save" style={{ fontSize: "20px" }} /> Guardar Cambios
              </button>
            )}
          </div>
        </div>

        {/* Tarjeta de crédito */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "48px" }}>
          <div style={{ width: "300px", height: "170px", background: "white", borderRadius: "20px", padding: "24px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: "0.85rem", color: "#6B7280", letterSpacing: "1px", marginBottom: "8px" }}>CRÉDITO</p>
            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#1F2937", marginBottom: "8px" }}>${(profile.credit / 1000000).toFixed(1)}M</p>
            <p style={{ fontSize: "0.85rem", color: "#10B981", fontWeight: 600 }}>↗ {profile.creditChange} this month</p>
          </div>
        </div>

        {/* Información Personal y Acceso a la Cuenta */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "48px", alignItems: "stretch" }}>
          {/* Información Personal */}
          <div style={{ background: "white", borderRadius: "20px", padding: "36px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", minHeight: "400px" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "1.5px", marginBottom: "32px" }}>INFORMACIÓN PERSONAL</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: "10px" }}>NOMBRE COMPLETO</p>
                {isEditing ? (
                  <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "1.1rem", marginBottom: "32px" }} />
                ) : (
                  <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "#1F2937", marginBottom: "32px" }}>{profile.name}</p>
                )}
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: "10px" }}>CORREO ELECTRÓNICO</p>
                {isEditing ? (
                  <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "1.1rem", marginBottom: "32px" }} />
                ) : (
                  <p style={{ fontSize: "1.1rem", color: "#1F2937", marginBottom: "32px" }}>{profile.email}</p>
                )}
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: "10px" }}>LUGAR</p>
                {isEditing ? (
                  <input type="text" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "1.1rem" }} />
                ) : (
                  <p style={{ fontSize: "1.1rem", color: "#1F2937" }}>{profile.location}</p>
                )}
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: "10px" }}>IDENTIFICACIÓN (CC)</p>
                {isEditing ? (
                  <input type="text" value={profile.document} onChange={(e) => setProfile({ ...profile, document: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "1.1rem", marginBottom: "32px" }} />
                ) : (
                  <p style={{ fontSize: "1.1rem", color: "#1F2937", marginBottom: "32px" }}>{profile.document}</p>
                )}
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: "10px" }}>NÚMERO DE TELÉFONO</p>
                {isEditing ? (
                  <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "1.1rem" }} />
                ) : (
                  <p style={{ fontSize: "1.1rem", color: "#1F2937" }}>{profile.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Acceso a la Cuenta */}
          <div style={{ background: "white", borderRadius: "20px", padding: "36px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", borderLeft: "4px solid #8C6A3D", minHeight: "400px" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "1.5px", marginBottom: "32px" }}>ACCESO A LA CUENTA</h3>
            <div style={{ marginBottom: "32px" }}>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: "10px" }}>LAST LOGIN</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "#1F2937" }}>{profile.lastLogin}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: "14px" }}>DEVICE TRUSTED</p>
              <div style={{ background: "#F0F7FF", borderRadius: "14px", padding: "18px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", background: "#E8F0FE", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MaterialIcon name="computer" style={{ fontSize: "26px", color: "#8C6A3D" }} />
                </div>
                <div>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1F2937" }}>{profile.device}</p>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "6px" }}>{profile.browser}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Inferior */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "32px", borderTop: "1px solid #E5E7EB", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#1F2937", marginBottom: "6px" }}>Privacidad y Visibilidad</h4>
            <p style={{ fontSize: "0.9rem", color: "#6B7280" }}>Ajusta la forma en que se muestra tu información a otros analistas de crédito en el directorio.</p>
          </div>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 28px", background: "#FEE2E2", border: "none", borderRadius: "30px", color: "#DC2626", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FECACA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FEE2E2")}>
            <MaterialIcon name="logout" style={{ fontSize: "18px" }} /> Salir de la cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;