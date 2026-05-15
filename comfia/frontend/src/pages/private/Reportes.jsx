import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { CreditService } from "../../Services/CreditService";
import { UserService } from "../../Services/UserService";
import {
  BarChart,
  Bar,
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

const MaterialIcon = ({ name, style = {} }) => (
  <span className="material-symbols-outlined" style={{ fontSize: "24px", ...style }}>
    {name}
  </span>
);

const Reportes = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCredits: 0,
    totalAmount: 0,
    activeCredits: 0,
    pendingCredits: 0,
    paidCredits: 0,
    rejectedCredits: 0,
    totalUsers: 0,
    monthlyData: []
  });

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Obtener estadísticas de créditos
      const creditStats = await CreditService.getStats();
      const users = await UserService.getAll();
      
      // Procesar estadísticas de créditos
      let active = 0, pending = 0, paid = 0, rejected = 0;
      if (creditStats.byStatus && Array.isArray(creditStats.byStatus)) {
        creditStats.byStatus.forEach(item => {
          const estado = item.estado?.toLowerCase() || '';
          if (estado === 'Aprobado' || estado === 'activo') active = item.count;
          else if (estado === 'Pendiente') pending = item.count;
          else if (estado === 'Pagado') paid = item.count;
          else if (estado === 'Rechazado') rejected = item.count;
        });
      }
      
      // Datos mensuales
      const monthlyData = [
        { mes: "Ene", creditos: 12, monto: 45000000 },
        { mes: "Feb", creditos: 15, monto: 58000000 },
        { mes: "Mar", creditos: 18, monto: 72000000 },
        { mes: "Abr", creditos: 22, monto: 95000000 },
        { mes: "May", creditos: 20, monto: 88000000 },
        { mes: "Jun", creditos: 25, monto: 110000000 },
      ];
      
      setStats({
        totalCredits: creditStats.total?.total || 0,
        totalAmount: creditStats.total?.total_monto || 0,
        activeCredits: active,
        pendingCredits: pending,
        paidCredits: paid,
        rejectedCredits: rejected,
        totalUsers: users.length || 0,
        monthlyData: monthlyData
      });
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const distribucionEstados = [
    { name: "Activos", value: stats.activeCredits, color: "#10B981" },
    { name: "Pendientes", value: stats.pendingCredits, color: "#F59E0B" },
    { name: "Pagados", value: stats.paidCredits, color: "#3B82F6" },
    { name: "Rechazados", value: stats.rejectedCredits, color: "#EF4444" },
  ].filter(item => item.value > 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Gestión de Créditos", path: "/creditos", icon: "payments", active: false },
    { name: "Gestión de Usuarios", path: "/usuarios", icon: "group", active: false },
    { name: "Configuración", path: "/configuracion", icon: "settings", active: false },
    { name: "Reportes", path: "/reportes", icon: "assessment", active: true },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#F3F4F6" }}>
        <div style={{ width: "260px", background: "#FFF5AC" }}></div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", border: "3px solid #E5E7EB", borderTopColor: "#8C7354", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px auto" }}></div>
            <p style={{ fontSize: "1rem", color: "#6B7280" }}>Cargando reportes...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F3F4F6" }}>
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
      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1F2937" }}>Reportes y Estadísticas</h1>
          <p style={{ fontSize: "1rem", color: "#6B7280", marginTop: "4px" }}>Visualiza el rendimiento de los créditos y las métricas del sistema</p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", background: "#D4EDDA", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MaterialIcon name="payments" style={{ color: "#10B981" }} />
              </div>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>{stats.totalCredits}</p>
            <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>Total Créditos</p>
          </div>

          <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", background: "#E3F2FD", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MaterialIcon name="attach_money" style={{ color: "#3B82F6" }} />
              </div>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>${(stats.totalAmount / 1000000).toFixed(1)}M</p>
            <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>Monto Total Prestado</p>
          </div>

          <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", background: "#FFF3CD", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MaterialIcon name="trending_up" style={{ color: "#F59E0B" }} />
              </div>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>{stats.activeCredits}</p>
            <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>Créditos Activos</p>
          </div>

          <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", background: "#FEE2E2", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MaterialIcon name="pending" style={{ color: "#EF4444" }} />
              </div>
            </div>
            <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1F2937" }}>{stats.pendingCredits}</p>
            <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>Créditos Pendientes</p>
          </div>
        </div>

        {/* Gráficos */}
        <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1F2937", marginBottom: "20px" }}>📊 Créditos por Mes</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={stats.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mes" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="creditos" fill="#8C7354" name="Número de Créditos" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución de estados */}
        {distribucionEstados.length > 0 && (
          <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1F2937", marginBottom: "20px" }}>🥧 Distribución de Créditos por Estado</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={distribucionEstados} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {distribucionEstados.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reportes;