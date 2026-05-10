// src/components/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Sidebar = ({ isOpen = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/creditos', icon: '💰', label: 'Créditos' },
    { path: '/creditos/nuevo', icon: '✨', label: 'Nuevo Crédito' },
    { path: '/reportes', icon: '📈', label: 'Reportes' },
    { path: '/perfil', icon: '👤', label: 'Perfil' },
    { path: '/configuracion', icon: '⚙️', label: 'Configuración' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ path: '/usuarios', icon: '👥', label: 'Usuarios' });
  }

  if (!isOpen) {
    return (
      <div style={{
        width: '70px',
        background: '#1C1916',
        color: 'white',
        transition: 'width 0.3s',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#8C7354',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontWeight: 'bold'
          }}>C</div>
        </div>
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                justifyContent: 'center',
                padding: '12px',
                color: isActive ? '#FFF5AC' : '#9CA3AF',
                textDecoration: 'none',
                fontSize: '1.2rem',
                transition: 'all 0.2s'
              })}
              title={item.label}
            >
              {item.icon}
            </NavLink>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div style={{
      width: '260px',
      background: '#1C1916',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s'
    }}>
      {/* Logo */}
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#8C7354',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>C</div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>COMFÍA</span>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav style={{ flex: 1, padding: '20px 0' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              color: isActive ? '#FFF5AC' : '#9CA3AF',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              background: isActive ? 'rgba(255,245,172,0.1)' : 'transparent',
              borderLeft: isActive ? '3px solid #FFF5AC' : '3px solid transparent'
            })}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer del sidebar */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{user?.name || 'Usuario'}</div>
          <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>{user?.email}</div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '8px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            color: '#9CA3AF',
            cursor: 'pointer',
            fontSize: '0.8rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.color = '#FFF5AC';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#9CA3AF';
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;