import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { showConfirm, showSuccess, showError } from "../../Alerts";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: "22px", ...style }}
  >
    {name}
  </span>
);

const ListaUsuarios = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Estados
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Función para obtener iniciales del nombre
  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Datos simulados de usuarios
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@comfia.com",
      role: "Administrador",
      status: "Activo",
    },
    {
      id: 2,
      name: "Ximena Gaibao",
      email: "x.gaibao@comfia.com",
      role: "Editor",
      status: "Activo",
    },
    {
      id: 3,
      name: "Sol Rojas",
      email: "sol.rojas@comfia.com",
      role: "Administrador",
      status: "Inactivo",
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana.martinez@comfia.com",
      role: "Visualizador",
      status: "Activo",
    },
  ]);

  // Filtrar usuarios
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Lógica de paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Cambiar de página
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Cerrar sesión
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Ítems del menú lateral
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
      active: true,
    },
    {
      name: "Configuración",
      path: "/configuracion",
      icon: "settings",
      active: false,
    },
    { name: "Reportes", path: "/reportes", icon: "assessment", active: false },
  ];

  // Estilos según el rol
  const getRoleStyle = (role) => {
    switch (role) {
      case "Administrador":
        return { color: "#10B981", bg: "#D4EDDA" };
      case "Editor":
        return { color: "#3B82F6", bg: "#E3F2FD" };
      case "Visualizador":
        return { color: "#F59E0B", bg: "#FFF3CD" };
      default:
        return { color: "#6B7280", bg: "#F3F4F6" };
    }
  };

  // Estilos según el estado
  const getStatusStyle = (status) => {
    switch (status) {
      case "Activo":
        return { color: "#10B981", bg: "#D4EDDA" };
      case "Inactivo":
        return { color: "#6B7280", bg: "#F3F4F6" };
      default:
        return { color: "#6B7280", bg: "#F3F4F6" };
    }
  };

  //eliminar usuario
  const handleDelete = async (id, name) => {
    const result = await showConfirm(
      `¿Estás seguro de eliminar al usuario "${name}"? Esta acción no se puede deshacer`,
      "Confirmar Eliminación Usuarios",
      "Eliminar",
      "Cancelar"
    );
    
    if (result.isConfirmed) {
      try {
        setUsers(users.filter(u => u.id !== id));
        showSuccess(`Usuario "${name}" eliminado correctamente`);
        if (paginatedUsers.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        showError(error.message || "Ocurrió un error al eliminar el usuario");
      }
    }
  };

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
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p
                style={{ color: "#8C7354", fontSize: "1.3rem", fontWeight: 600 }}
              >
                {user?.name || "Admin User"}
              </p>
              <p style={{ color: "#9CA3AF", fontSize: "1rem" }}>
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
            <MaterialIcon name="logout" style={{ fontSize: "20px" }} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
        {/* Título */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1F2937" }}>
            Gestión de Usuarios
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#6B7280", marginTop: "4px" }}>
            Administre los roles, permisos y estados de los usuarios del sistema central.
          </p>
        </div>

        {/* BARRA DE HERRAMIENTAS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Grupo izquierdo: Buscador + Notificaciones */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flex: 1,
            }}
          >
            {/* Buscador */}
            <div
              style={{ position: "relative", width: "100%", maxWidth: "350px" }}
            >
              <MaterialIcon
                name="search"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                  fontSize: "20px",
                }}
              />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 40px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  fontSize: "22px",
                  outline: "none",
                  background: "white",
                  paddingRight: searchTerm ? "35px" : "12px",
                }}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9CA3AF",
                  }}
                >
                  <MaterialIcon name="close" style={{ fontSize: "20px" }} />
                </button>
              )}
            </div>
            {/* Botón Notificaciones */}
            <button
              onClick={() => navigate("/notificaciones")}
              style={{
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <MaterialIcon
                name="notifications"
                style={{ fontSize: "20px", color: "#4B5563" }}
              />
              <span style={{ fontSize: "22px", color: "#4B5563" }}>
                Notificaciones
              </span>
            </button>
          </div>

          {/* Grupo derecho: Botones */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/usuarios/nuevo")}
              style={{
                background: "#8C7354",
                color: "white",
                border: "none",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "22px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <MaterialIcon name="add" style={{ fontSize: "20px" }} />
              Registrar usuario
            </button>
            <button
              style={{
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "22px",
                fontWeight: 500,
                color: "#4B5563",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <MaterialIcon name="refresh" style={{ fontSize: "20px" }} />
              Actualizar usuarios
            </button>
          </div>
        </div>

        {/* TABLA DE USUARIOS */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #E5E7EB",
            marginTop: "16px",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "#F9FAFB",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#6B7280",
                    }}
                  >
                    USUARIO
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#6B7280",
                    }}
                  >
                    CORREO ELECTRÓNICO
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#6B7280",
                    }}
                  >
                    ROL
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#6B7280",
                    }}
                  >
                    ESTADO
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#6B7280",
                    }}
                  >
                    ACCIONES
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => {
                  const roleStyle = getRoleStyle(user.role);
                  const statusStyle = getStatusStyle(user.status);
                  return (
                    <tr
                      key={user.id}
                      style={{ borderBottom: "1px solid #F3F4F6" }}
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          color: "#1F2937",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              background: "#F4ECA6",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              fontSize: "16px",
                              color: "#8C7354",
                            }}
                          >
                            {getInitials(user.name)}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "1.2rem",
                          color: "#6B7280",
                        }}
                      >
                        {user.email}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "1.2rem",
                            fontWeight: 600,
                            background: roleStyle.bg,
                            color: roleStyle.color,
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            color: statusStyle.color,
                          }}
                        >
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: statusStyle.color,
                              display: "inline-block",
                            }}
                          ></span>
                          {user.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            onClick={() =>
                              navigate(`/usuarios/editar/${user.id}`)
                            }
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#8C7354",
                            }}
                          >
                            <MaterialIcon
                              name="edit"
                              style={{ fontSize: "26px" }}
                            />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(user.id, user.name)
                            }
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#EF4444",
                            }}
                          >
                            <MaterialIcon
                              name="delete"
                              style={{ fontSize: "26px" }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Paginación */}
            {totalPages > 0 && (
              <div
                style={{
                  padding: "14px 20px",
                  borderTop: "1px solid #F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "1.3rem", color: "#9CA3AF" }}>
                  Mostrando {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, filteredUsers.length)} de{" "}
                  {filteredUsers.length} usuarios
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "6px",
                      background: "white",
                      fontSize: "1rem",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      color: currentPage === 1 ? "#D1D5DB" : "#4B5563",
                    }}
                  >
                    Anterior
                  </button>
                  {Array.from(
                    { length: Math.min(totalPages, 10) },
                    (_, i) => i + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        background: currentPage === page ? "#8C6A3D" : "white",
                        color: currentPage === page ? "white" : "#4B5563",
                        fontSize: "1rem",
                        fontWeight: currentPage === page ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "6px",
                      background: "white",
                      fontSize: "1rem",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                      color: currentPage === totalPages ? "#D1D5DB" : "#4B5563",
                    }}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaUsuarios;