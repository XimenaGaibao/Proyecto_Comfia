import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { showConfirm, showSuccess, showError } from "../../Alerts";
import { CreditService } from "../../Services/CreditService";

// Componente de íconos (definido fuera para evitar recreaciones)
const MaterialIcon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: "20px", ...style }}
  >
    {name}
  </span>
);

const ListaCreditos = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  

  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos los estados");
  const [dateFilter, setDateFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("Cualquier monto");
  const [typeFilter, setTypeFilter] = useState("Todos los tipos");
  const [showFilters, setShowFilters] = useState(false);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Estado para datos reales
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCredits = async () => {
    try {
      setLoading(true);
      const data = await CreditService.getAll();

      const formattedCredits = data.map((credit) => ({
        id: credit.id,
        client: credit.nombre_cliente,
        document: credit.documento_cliente,
        amount: credit.monto,
        date: new Date(credit.fecha_inicio).toLocaleDateString("es-CO"),
        status: credit.estado,
        type: credit.tipo || "Personal",
      }));
      setCredits(formattedCredits);
    } catch (error) {
      console.error("Error al cargar créditos:", error);
      showError("Error al cargar los créditos");
    } finally {
      setLoading(false);
    }
  };

  // Cargar créditos desde el backend
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCredits();
  }, []);

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

  // Aplicar filtros
  const filteredCredits = credits.filter((credit) => {
    const matchesSearch =
      credit.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.document.includes(searchTerm);
    const matchesStatus =
      statusFilter === "Todos los estados" || credit.status === statusFilter;
    const matchesType =
      typeFilter === "Todos los tipos" || credit.type === typeFilter;

    let matchesAmount = true;
    if (amountFilter !== "Cualquier monto") {
      if (amountFilter === "Menos de $1M")
        matchesAmount = credit.amount < 1000000;
      else if (amountFilter === "$1M - $5M")
        matchesAmount = credit.amount >= 1000000 && credit.amount <= 5000000;
      else if (amountFilter === "$5M - $10M")
        matchesAmount = credit.amount > 5000000 && credit.amount <= 10000000;
      else if (amountFilter === "Más de $10M")
        matchesAmount = credit.amount > 10000000;
    }

    return matchesSearch && matchesStatus && matchesType && matchesAmount;
  });

  // Lógica de paginación
  const totalPages = Math.ceil(filteredCredits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCredits = filteredCredits.slice(
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

  // Función eliminar
  const handleDelete = async (id, clientName) => {
    const result = await showConfirm(
      `¿Estás seguro de eliminar el crédito de "${clientName}"? Esta acción no se puede deshacer`,
      "Confirmar Eliminación Créditos",
      "Eliminar",
      "Cancelar",
    );

    if (result.isConfirmed) {
      try {
        await CreditService.delete(id);
        showSuccess(`Crédito de "${clientName}" eliminado correctamente`);
        await loadCredits(); // Recargar lista
        if (paginatedCredits.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        showError(
          error.response?.data?.message ||
            "Ocurrió un error al eliminar el crédito",
        );
      }
    }
  };

  // Exportar a CSV
  const handleExport = () => {
    const headers = [
      "CLIENTE",
      "CC/IDENTIFICACIÓN",
      "VALOR DEL CRÉDITO",
      "FECHA INICIO",
      "ESTADO",
      "TIPO",
    ];
    const rows = filteredCredits.map((credit) => [
      credit.client,
      credit.document,
      `$${credit.amount.toLocaleString()}`,
      credit.date,
      credit.status,
      credit.type,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "creditos.csv");
    link.click();
    URL.revokeObjectURL(url);
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

  // Estilos según el estado del crédito
  const getStatusStyle = (status) => {
    switch (status) {
      case "Aprobado":
        return { color: "#10B981", bg: "#D4EDDA" };
      case "En revisión":
        return { color: "#F59E0B", bg: "#FFF3CD" };
      case "Rechazado":
        return { color: "#EF4444", bg: "#FEE2E2" };
      default:
        return { color: "#6B7280", bg: "#F3F4F6" };
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", minHeight: "100vh", background: "#F3F4F6" }}
      >
        <div style={{ width: "260px", background: "#FFF5AC" }}></div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "3px solid #E5E7EB",
                borderTopColor: "#8C7354",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px auto",
              }}
            ></div>
            <p style={{ fontSize: "1rem", color: "#6B7280" }}>
              Cargando créditos...
            </p>
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

      {/* CONTENIDO PRINCIPAL - El resto del JSX queda igual, solo cambiamos lo que usa credits */}
      <div
        style={{
          flex: 1,
          padding: "24px 32px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Título de la página */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1F2937" }}>
            Gestión de Créditos
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#6B7280", marginTop: "4px" }}>
            Administre y supervise las solicitudes de crédito de sus clientes de
            forma ágil.
          </p>
        </div>

        {/* BARRA DE HERRAMIENTAS - Igual */}
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
          {/* Buscador y botón filtros */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flex: 1,
            }}
          >
            <div style={{ position: "relative", flex: 1, maxWidth: "350px" }}>
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
                placeholder="Buscar por nombre o ID/CC"
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

            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: showFilters ? "#8C7354" : "white",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                fontSize: "22px",
                fontWeight: 500,
                color: showFilters ? "white" : "#4B5563",
                cursor: "pointer",
              }}
            >
              <MaterialIcon name="filter_list" style={{ fontSize: "18px" }} />
              Filtros
            </button>
          </div>

          {/* Botones de acción */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleExport}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "22px",
                fontWeight: 500,
                color: "#4B5563",
                cursor: "pointer",
              }}
            >
              <MaterialIcon name="download" style={{ fontSize: "20px" }} />
              Exportar
            </button>

            <button
              onClick={() => navigate("/creditos/nuevo")}
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
              Registrar crédito
            </button>
          </div>
        </div>

        {/* MODAL DE FILTROS - Igual */}
        {showFilters && (
          <div
            style={{
              position: "absolute",
              top: "180px",
              right: "32px",
              width: "300px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              zIndex: 100,
              padding: "20px",
              border: "1px solid #E5E7EB",
            }}
          >
            {/* ... contenido del modal igual ... */}
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#1F2937",
                }}
              >
                FILTROS
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Filtro Estado */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#6B7280",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                ESTADO
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "18px",
                  background: "white",
                }}
              >
                <option>Todos los estados</option>
                <option>Aprobado</option>
                <option>En revisión</option>
                <option>Rechazado</option>
                <option>Pendiente</option>
              </select>
            </div>

            {/* Filtro Fecha */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#6B7280",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                FECHA
              </label>
              <input
                type="text"
                placeholder="dd/mm/aaaa"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "18px",
                }}
              />
            </div>

            {/* Filtro Monto */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#6B7280",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                MONTO
              </label>
              <select
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "14px",
                  background: "white",
                }}
              >
                <option>Cualquier monto</option>
                <option>Menos de $1M</option>
                <option>$1M - $5M</option>
                <option>$5M - $10M</option>
                <option>Más de $10M</option>
              </select>
            </div>

            {/* Filtro Tipo */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#6B7280",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                TIPO
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "18px",
                  background: "white",
                }}
              >
                <option>Todos los tipos</option>
                <option>Personal</option>
                <option>Empresarial</option>
                <option>Vivienda</option>
                <option>Estudio</option>
              </select>
            </div>

            {/* Botones del modal */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => {
                  setStatusFilter("Todos los estados");
                  setDateFilter("");
                  setAmountFilter("Cualquier monto");
                  setTypeFilter("Todos los tipos");
                  setCurrentPage(1);
                }}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: "#F3F4F6",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                LIMPIAR
              </button>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: "#8C7354",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                APLICAR
              </button>
            </div>
          </div>
        )}

        {/* TABLA DE CRÉDITOS */}
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
                    CLIENTE
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
                    CC / IDENTIFICACIÓN
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
                    VALOR DEL CRÉDITO
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
                    FECHA INICIO
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
                {paginatedCredits.map((credit) => {
                  const statusStyle = getStatusStyle(credit.status);
                  return (
                    <tr
                      key={credit.id}
                      style={{ borderBottom: "1px solid #F3F4F6" }}
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          color: "#1F2937",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/creditos/${credit.id}`)}
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
                            {getInitials(credit.client)}
                          </div>
                          <span>{credit.client}</span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "1.2rem",
                          color: "#6B7280",
                        }}
                      >
                        {credit.document}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          color: "#8C7354",
                        }}
                      >
                        ${credit.amount.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "1.2rem",
                          color: "#6B7280",
                        }}
                      >
                        {credit.date}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "1.2rem",
                            fontWeight: 600,
                            background: statusStyle.bg,
                            color: statusStyle.color,
                          }}
                        >
                          {credit.status}
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
                              navigate(`/creditos/editar/${credit.id}`)
                            }
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#6B7280",
                            }}
                          >
                            <MaterialIcon
                              name="edit"
                              style={{ fontSize: "26px" }}
                            />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(credit.id, credit.client)
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
                          <button
                            onClick={() => navigate(`/creditos/${credit.id}`)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#6B7280",
                            }}
                            title="Ver detalle"
                          >
                            <MaterialIcon
                              name="visibility"
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
                  {Math.min(startIndex + itemsPerPage, filteredCredits.length)}{" "}
                  de {filteredCredits.length} créditos
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

export default ListaCreditos;
