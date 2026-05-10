import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import PublicLayout from '../Layouts/PublicLayout';
import AuthLayout from '../Layouts/AuthLayout';
import DashboardLayout from '../Layouts/DashboardLayout';

// Páginas públicas
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Guide from '../pages/public/Guide';
import Descarga from '../pages/public/Descarga';

// Páginas de autenticación
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Páginas privadas
import Dashboard from '../pages/private/Dashboard';
import ListaCreditos from '../pages/private/ListaCreditos';
import CrearCredito from '../pages/private/CrearCredito';
import EditarCredito from '../pages/private/EditarCredito';
import Perfil from '../pages/private/Perfil';
import Configuracion from '../pages/private/Configuracion';
import UsuariosLista from '../pages/private/UsuariosLista';
import Reportes from '../pages/private/Reportes';

// Páginas de error
import NotFound from '../pages/NotFound';
import Forbidden from '../pages/Forbidden';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas con layout público */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/descarga" element={<Descarga />} />
          </Route>

          {/* Rutas de autenticación */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rutas protegidas (requieren autenticación) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/creditos" element={<ListaCreditos />} />
              <Route path="/creditos/nuevo" element={<CrearCredito />} />
              <Route path="/creditos/:id/editar" element={<EditarCredito />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/configuracion" element={<Configuracion />} />
              <Route path="/reportes" element={<Reportes />} />
            </Route>
          </Route>

          {/* Rutas solo para admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/usuarios" element={<UsuariosLista />} />
            </Route>
          </Route>

          {/* Rutas de error */}
          <Route path="/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}