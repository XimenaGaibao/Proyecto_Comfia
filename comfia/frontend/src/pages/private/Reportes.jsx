import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Componente de íconos
const MaterialIcon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: "24px", ...style }}
  >
    {name}
  </span>
);

const Reportes = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [periodo, setPeriodo] = useState("mensual");

  // Datos simulados
  const creditosPorMes = [
    { mes: "Ene", creditos: 12, monto: 45000000 },
    { mes: "Feb", creditos: 15, monto: 58000000 },
    { mes: "Mar", creditos: 18, monto: 72000000 },
    { mes: "Abr", creditos: 22, monto: 95000000 },
    { mes: "May", creditos: 20, monto: 88000000 },
    { mes: "Jun", creditos: 25, monto: 110000000 },
    { mes: "Jul", creditos: 28, monto: 125000000 },
    { mes: "Ago", creditos: 24, monto: 102000000 },
    { mes: "Sep", creditos: 30, monto: 140000000 },
    { mes: "Oct", creditos: 26, monto: 118000000 },
    { mes: "Nov", creditos: 32, monto: 155000000 },
    { mes: "Dic", creditos: 35, monto: 178000000 },
  ];

  const distribucionEstados = [
    { name: "Activos", value: 45, color: "#10B981" },
    { name: "Pendientes", value: 25, color: "#F59E0B" },
    { name: "Pagados", value: 20, color: "#3B82F6" },
    { name: "Rechazados", value: 10, color: "#EF4444" },
  ];

  const creditosSemanales = [
    { dia: "Lun", creditos: 8, monto: 25000000 },
    { dia: "Mar", creditos: 12, monto: 38000000 },
    { dia: "Mié", creditos: 10, monto: 32000000 },
    { dia: "Jue", creditos: 15, monto: 48000000 },
    { dia: "Vie", creditos: 18, monto: 56000000 },
    { dia: "Sáb", creditos: 6, monto: 18000000 },
    { dia: "Dom", creditos: 3, monto: 9000000 },
  ];

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
    {
      name: "Reportes",
      path: "/reportes",
      icon: "assessment",
      active: true,
    },
  ];

  // Calcular estadísticas
  const totalCreditos = creditosPorMes.reduce((sum, m) => sum + m.creditos, 0);
  const totalMonto = creditosPorMes.reduce((sum, m) => sum + m.monto, 0);
  const promedioMensual = Math.round(totalCreditos / 12);
  const crecimiento = ((creditosPorMes[11].creditos - creditosPorMes[0].creditos) / creditosPorMes[0].creditos * 100).toFixed(1);

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
      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {/* Título */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>
            Reportes y Estadísticas
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "4px" }}>
            Visualiza el rendimiento de los créditos y las métricas del sistema
          </p>
        </div>

        {/* Selector de período */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              background: "white",
              padding: "4px",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
            }}
          >
            {["semanal", "mensual", "anual"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                style={{
                  padding: "6px 20px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  background: periodo === p ? "#8C7354" : "transparent",
                  color: periodo === p ? "white" : "#6B7280",
                  transition: "all 0.2s",
                }}
              >
                {p === "semanal" ? "Semanal" : p === "mensual" ? "Mensual" : "Anual"}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas de estadísticas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #F3F4F6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#D4EDDA",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcon name="payments" style={{ color: "#10B981" }} />
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#10B981",
                  background: "#D4EDDA",
                  padding: "2px 8px",
                  borderRadius: "20px",
                }}
              >
                +{crecimiento}%
              </span>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>
              {totalCreditos}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>Total Créditos</p>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #F3F4F6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#E3F2FD",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcon name="attach_money" style={{ color: "#3B82F6" }} />
              </div>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>
              ${(totalMonto / 1000000).toFixed(0)}M
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>Monto Total Prestado</p>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #F3F4F6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#FFF3CD",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcon name="trending_up" style={{ color: "#F59E0B" }} />
              </div>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>
              {promedioMensual}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>Promedio Mensual</p>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #F3F4F6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#FEE2E2",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcon name="pending" style={{ color: "#EF4444" }} />
              </div>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>
              {distribucionEstados.find(s => s.name === "Pendientes")?.value}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>Créditos Pendientes</p>
          </div>
        </div>

        {/* Gráfico de barras - Créditos por mes */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #F3F4F6",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#1F2937",
              marginBottom: "20px",
            }}
          >
            📊 Créditos por Mes
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={creditosPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mes" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="creditos" fill="#8C7354" name="Número de Créditos" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de línea - Monto prestado y Distribución */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
          {/* Gráfico de línea - Monto prestado */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #F3F4F6",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1F2937",
                marginBottom: "20px",
              }}
            >
              📈 Monto Prestado por Mes
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={creditosPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="mes" stroke="#6B7280" fontSize={12} />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, "Monto"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="monto"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", r: 4 }}
                  name="Monto Prestado"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de pastel - Distribución de estados */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #F3F4F6",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1F2937",
                marginBottom: "20px",
              }}
            >
              🥧 Distribución de Créditos por Estado
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionEstados}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: "#9CA3AF", strokeWidth: 1 }}
                >
                  {distribucionEstados.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} créditos`, "Cantidad"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de créditos recientes */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #F3F4F6",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#1F2937",
              marginBottom: "20px",
            }}
          >
            📋 Últimos Créditos Registrados
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>
                    Cliente
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>
                    Monto
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>
                    Fecha
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cliente: "María González", monto: 1200000, fecha: "2024-05-15", estado: "Activo" },
                  { cliente: "Carlos Rodríguez", monto: 850000, fecha: "2024-05-14", estado: "Activo" },
                  { cliente: "Ana Martínez", monto: 2000000, fecha: "2024-05-13", estado: "Pendiente" },
                  { cliente: "Luis Fernández", monto: 500000, fecha: "2024-05-12", estado: "Pagado" },
                ].map((credito, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "12px", fontSize: "0.85rem", color: "#1F2937" }}>{credito.cliente}</td>
                    <td style={{ padding: "12px", fontSize: "0.85rem", fontWeight: 600, color: "#8C7354" }}>
                      ${credito.monto.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px", fontSize: "0.85rem", color: "#6B7280" }}>{credito.fecha}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          background:
                            credito.estado === "Activo"
                              ? "#D4EDDA"
                              : credito.estado === "Pendiente"
                              ? "#FFF3CD"
                              : "#E2E3E5",
                          color:
                            credito.estado === "Activo"
                              ? "#155724"
                              : credito.estado === "Pendiente"
                              ? "#856404"
                              : "#383D41",
                        }}
                      >
                        {credito.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;