import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';  // ✅ Importar AuthProvider
import Home from './pages/public/Home.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import About from './pages/public/About.jsx';
import Contact from './pages/public/Contact.jsx';
import Descarga from './pages/public/Descarga.jsx';
import Guide from './pages/public/Guide.jsx';
import Dashboard from './pages/private/Dashboard.jsx';
import ListaCreditos from './pages/private/ListaCreditos';
import ListaUsuarios from './pages/private/ListaUsuarios.jsx';
import Configuracion from './pages/private/Configuracion.jsx';
import Perfil from './pages/private/Perfil.jsx';
import CrearCredito from './pages/private/CrearCredito.jsx';
import EditarCredito from './pages/private/EditarCredito.jsx';
import CrearUsuario from './pages/private/CrearUsuario.jsx';
import EditarUsuario from './pages/private/EditarUsuario.jsx';
import Notificaciones from './pages/private/Notificaciones.jsx';
import Reportes from './pages/private/Reportes.jsx';
import DetalleCredito from './pages/private/DetalleCredito.jsx';
import RecuperarPassword from './pages/auth/RecuperarPassword.jsx';
import Forbidden from './pages/Forbbiden.jsx';
import NotFound from './pages/NotFound.jsx';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>  {/* Envolver TODO con AuthProvider */}
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/descarga" element={<Descarga />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />

          {/* Rutas de error */}
          <Route path="/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />

          
          
          {/* Rutas privadas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/creditos" element={<ListaCreditos />} />
          <Route path="/usuarios" element={<ListaUsuarios />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/creditos/nuevo" element={<CrearCredito />} />
          <Route path="/creditos/editar/:id" element={<EditarCredito />} />
          <Route path="/usuarios/nuevo" element={<CrearUsuario />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/creditos/:id" element={<DetalleCredito />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;