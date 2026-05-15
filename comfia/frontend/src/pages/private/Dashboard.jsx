import { useState, useEffect } from "react";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreditService } from "../../Services/CreditService";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalCredits: 0,
    totalAmount: 0,
    activeCredits: 0,
    pendingCredits: 0,
    clients: 0
  });

  const loadStats = async () => {
    try {
      const data = await CreditService.getStats();
      
      // Procesar estadísticas
      const totalCredits = data.total?.total || 0;
      const totalAmount = data.total?.total_monto || 0;
      
      // Procesar créditos por estado
      let active = 0, pending = 0;
      if (data.byStatus && Array.isArray(data.byStatus)) {
        data.byStatus.forEach(item => {
          const estado = item.estado?.toLowerCase() || '';
          if (estado === 'aprobado' || estado === 'activo') active = item.count;
          else if (estado === 'pendiente') pending = item.count;
        });
      }
      
      setDashboardStats({
        totalCredits,
        totalAmount,
        activeCredits: active,
        pendingCredits: pending,
        clients: 0  
      });
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentCredits = async () => {
    try {
      const data = await CreditService.getAll();
      // Puedes usar los datos para algo si lo deseas
      console.log("Créditos recientes:", data.slice(0, 4));
    } catch (error) {
      console.error("Error al cargar créditos recientes:", error);
    }
  };

  // Cargar estadísticas desde el backend
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStats();
    loadRecentCredits();
  }, []);

  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Stats financieras con datos reales
  const stats = [
    { title: 'Créditos Activos', value: dashboardStats.activeCredits.toString(), icon: '💰', color: '#8C7354', change: '+12%' },
    { title: 'Total Prestado', value: `$${(dashboardStats.totalAmount / 1000000).toFixed(1)}M`, icon: '💵', color: '#10B981', change: '+8%' },
    { title: 'Clientes', value: dashboardStats.clients.toString(), icon: '👥', color: '#3B82F6', change: '+5%' },
    { title: 'Tasa de Pago', value: dashboardStats.totalCredits > 0 ? `${Math.round((dashboardStats.activeCredits / dashboardStats.totalCredits) * 100)}%` : '0%', icon: '📊', color: '#F59E0B', change: '+2%' },
  ];

  // Menú principal con Material Symbols
  const menuItems = [
    {
      title: 'Gestión de Créditos',
      description: 'Solicitudes, aprobaciones y estados',
      icon: 'payments',
      path: '/creditos'
    },
    {
      title: 'Gestión de Usuarios',
      description: 'Control de accesos y perfiles',
      icon: 'group',
      path: '/usuarios'
    },
    {
      title: 'Contacto Programador',
      description: 'Soporte técnico y desarrollo',
      icon: 'terminal',
      path: '/contacto'
    },
    {
      title: 'Sistemas Compatibles',
      description: 'Integraciones y plataformas',
      icon: 'devices',
      path: '/guide'
    }
  ];

  if (loading) {
    return (
      <div style={{ 
        background: '#8C7354',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: '3px solid #E5E7EB', borderTopColor: '#FFF5AC', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px auto' }}></div>
          <p style={{ color: 'white' }}>Cargando estadísticas...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#8C7354',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        gap: '0',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        borderRadius: '24px',
        overflow: 'hidden'
      }}>
        
        {/* COLUMNA IZQUIERDA */}
        <div style={{
          flex: '1',
          background: '#FFF5AC',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(140,115,84,0) 70%)'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <div style={{
              width: '96px',
              height: '96px',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <span className="material-symbols-outlined" style={{ color: '#8C7354', fontSize: '48px' }}>
                wb_sunny
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#8C7354', letterSpacing: '-0.5px' }}>
              COMFÍA
            </h1>
            <p style={{ color: '#8C7354', fontSize: '0.8rem', marginTop: '4px', letterSpacing: '2px' }}>
              Administración
            </p>
          </div>

          
          
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#8C7354', fontSize: '0.8rem', marginTop: '60px' }}>
            © 2026 COMFÍA Systems v2.4
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div style={{
          flex: '1.4',
          background: 'white',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1F2937' }}>Menú Principal</h2>
            <p style={{ color: '#6B7280', fontSize: '1.3rem', marginTop: '4px' }}>
              Bienvenido al sistema de gestión estratégica
            </p>
          </div>

          {/* Menú con Material Symbols */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: '2px solid #F3F4F6',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8C7354';
                  e.currentTarget.style.backgroundColor = '#8C735408';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#F3F4F6';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#8C735410',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8C7354';
                    const icon = e.currentTarget.querySelector('.material-symbols-outlined');
                    if (icon) icon.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#8C735410';
                    const icon = e.currentTarget.querySelector('.material-symbols-outlined');
                    if (icon) icon.style.color = '#8C7354';
                  }}>
                    <span className="material-symbols-outlined" style={{ color: '#8C7354', fontSize: '28px' }}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, color: '#1F2937', fontSize: '1.3rem' }}>{item.title}</h3>
                    <p style={{ fontSize: ' 1.2rem', color: '#6B7280', marginTop: '2px' }}>{item.description}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: '#D1D5DB', fontSize: '20px' }}>
                  chevron_right
                </span>
              </div>
            ))}
          </div>

          {/* Stats con datos reales */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '24px'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                background: '#F9FAFB',
                borderRadius: '12px',
                padding: '12px',
                border: '1px solid #F3F4F6'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '20px' }}>{stat.icon}</span>
                  <span style={{ fontSize: '12px', color: '#10B981', background: '#E8F5E9', padding: '2px 6px', borderRadius: '20px' }}>
                    {stat.change}
                  </span>
                </div>
                <div style={{ fontSize: '30px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '18px', color: '#6B7280' }}>{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Usuario y Salir */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #F3F4F6',
            marginTop: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#8C7354',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '20px' }}>{user?.name || 'Admin User'}</p>
                <p style={{ fontSize: '18px', color: '#10B981' }}>Sesión activa</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: '#8C7354',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;