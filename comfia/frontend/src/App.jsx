// src/App.jsx
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


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>  {/* ✅ Envolver TODO con AuthProvider */}
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/descarga" element={<Descarga />} />
          <Route path="/guide" element={<Guide />} />
          
          {/* Rutas privadas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/creditos" element={<ListaCreditos />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;