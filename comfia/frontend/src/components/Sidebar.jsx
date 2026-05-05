import { Link, useLocation, useNavigate } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname

  const user = JSON.parse(localStorage.getItem('comfia_user') || '{"name":"Admin User","role":"Administrador"}')
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'AU'

  const handleLogout = () => {
    localStorage.removeItem('comfia_user')
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="brand">COMFÍA</div>
        <div className="brand-sub">Sistema de Crédito</div>
      </div>

      <nav>
        <Link to="/creditos" className={`nav-item ${path.startsWith('/creditos') ? 'active' : ''}`}>
          <i className="bi bi-credit-card-2-front"></i>
          Gestión de Créditos
        </Link>
        <Link to="/usuarios" className={`nav-item ${path.startsWith('/usuarios') ? 'active' : ''}`}>
          <i className="bi bi-people"></i>
          Gestión de Usuarios
        </Link>
        <Link to="/notificaciones" className={`nav-item ${path === '/notificaciones' ? 'active' : ''}`}>
          <i className="bi bi-bell"></i>
          Notificaciones
        </Link>
        <Link to="/configuracion" className={`nav-item ${path === '/configuracion' ? 'active' : ''}`}>
          <i className="bi bi-gear"></i>
          Configuración
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{initials}</div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">Sesión activa</div>
          </div>
        </div>
        <button onClick={handleLogout} className="nav-item" style={{padding:'0.5rem 0', fontSize:'0.82rem'}}>
          <i className="bi bi-box-arrow-right"></i>
          Salir
        </button>
      </div>
    </aside>
  )
}

export default Sidebar