import { Link, useLocation } from 'react-router-dom';
import '../styles/styles.css';

function Header({ onNav }) {  
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="comfia-navbar">
      {/* LOGO */}
      <Link to="/" className="comfia-logo" onClick={() => onNav("home")}>
        COMFÍA
      </Link>

      <ul className="nav-links">
        <li>
          <Link 
            to="/sobre-nosotros" 
            className={path === '/sobre-nosotros' ? 'active' : ''}
            onClick={() => onNav("about")}
          >
            Sobre Nosotros
          </Link>
        </li>
        <li>
          <Link 
            to="/contacto" 
            className={path === '/contacto' ? 'active' : ''}
            onClick={() => onNav("contact")}
          >
            Contactanos
          </Link>
        </li>
        <li>
          <Link 
            to="/descarga" 
            className={path === '/descarga' ? 'active' : ''}
            onClick={() => onNav("download")}
          >
            Descargar
          </Link>
        </li>
      </ul>

      <div className="nav-actions">
        <Link to="/login" className="btn-comfia-outline" onClick={() => onNav("login")}>
          INICIAR SESIÓN
        </Link>
        <Link to="/register" className="btn-comfia-primary" onClick={() => onNav("register")}>
          REGISTRARSE
        </Link>
      </div>
    </nav>
  );
}

export default Header;