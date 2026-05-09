import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Home from './pages/public/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import About from './pages/public/About.jsx'
import Contact from './pages/public/Contact.jsx'
import Descarga from './pages/public/Descarga.jsx';
import Guide from './pages/public/Guide.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/descarga" element={<Descarga />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App