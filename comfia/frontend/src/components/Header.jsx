import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const path = location.pathname

  return (
    <nav className="comfia-navbar">
      <Link to="/" className="comfia-logo">COMFÍA</Link>

      <ul className="nav-links">
        <li><Link to="/sobre-nosotros" className={path === '/sobre-nosotros' ? 'active' : ''}>Sobre Nosotros</Link></li>
        <li><Link to="/contacto" className={path === '/contacto' ? 'active' : ''}>Contactanos</Link></li>
        <li><Link to="/descarga" className={path === '/descarga' ? 'active' : ''}>Descargar</Link></li>
      </ul>

      <div className="nav-actions">
        <Link to="/login" className="btn-comfia-outline">INICIAR SESIÓN</Link>
        <Link to="/register" className="btn-comfia-primary">REGISTRARSE</Link>
      </div>
    </nav>
  )
}

export default Header