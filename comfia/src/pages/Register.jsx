import { useState } from "react";
import { C, font } from "../styles/tokens";
import { Btn, Input, Card } from "../components/UI";

export default function Register({ onNav }) {
  const [form, setForm] = useState({
    name: "", cc: "", email: "", phone: "", country: "", password: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div style={{ 
      backgroundColor: "#F3F4F6",
      minHeight: "100vh", // asegura que cubra todo el alto de la pantalla
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center",
      padding: "20px"
    }}>
      
      {/*TARJETA */}
      <div style={{
        backgroundColor: "#ffffff",    
        border: "1px solid #E5E7EB",   
        borderRadius: "12px",           
        padding: "40px",               
        maxWidth: "500px",              
        width: "100%",                 // responsive
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => onNav("home")}>
            <div style={{ width: 28, height: 28, background: C.gold, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: C.white, fontWeight: 900, fontSize: 12 }}>C</span>
            </div>
            <span style={{ fontFamily: font, fontWeight: 700, color: C.goldDark }}>COMFÍA</span>
          </div>
          <span onClick={() => onNav("home")} style={{ fontSize: "0.85rem", color: C.gray500, cursor: "pointer" }}>
            ← Regresar
          </span>
        </div>

        <Card>
          <h2 style={{ fontFamily: font, fontSize: "1.75rem", color: C.gray700, marginBottom: 8 }}>
            Registrar Usuario
          </h2>
          <p style={{ color: C.gray500, fontSize: "0.875rem", marginBottom: 28 }}>
            Crea tu cuenta en COMFÍA para comenzar a gestionar tus finanzas con seguridad.
          </p>

          <Input label="Nombre Completo" placeholder="Ingresa tu nombre completo" value={form.name} onChange={set("name")}  />
          <Input label="Cédula de Ciudadanía (CC)" placeholder="Número de identificación" value={form.cc} onChange={set("cc")} />
          <Input label="Correo Electrónico" type="email" placeholder="ejemplo@correo.com" value={form.email} onChange={set("email")}  />
          <Input label="Teléfono" placeholder="+57 300 000 0000" value={form.phone} onChange={set("phone")}  />

          {/* Country */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.gray500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              País
            </label>
            <select
              value={form.country}
              onChange={set("country")}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 8,
                border: `1.5px solid ${C.gray100}`, background: C.white,
                fontSize: "0.9rem", color: form.country ? C.gray700 : C.gray300,
              }}
            >
              <option value="">Seleccione su país</option>
              <option>Colombia</option>
              <option>México</option>
              <option>Argentina</option>
              <option>Chile</option>
            </select>
          </div>

          <Input label="Contraseña" type="password" placeholder="Crea una contraseña segura" value={form.password} onChange={set("password")} style={{ backgroundColor: "#FFF5AC", borderColor: "#D1D5DB" }}/>

          <Btn
            onClick={() => onNav("login")}
            style={{ width: "100%", padding: "14px", fontSize: "0.95rem", borderRadius: 10, marginTop: 4, color: "#FFF5AC" }}
          >
            Registrarse →
          </Btn>

          <p style={{ textAlign: "center", fontSize: "0.875rem", color: C.gray500, marginTop: 20 }}>
            ¿Ya tienes una cuenta?{" "}
            <span onClick={() => onNav("login")} style={{ color: C.gold, fontWeight: 700, cursor: "pointer" }}>
              Inicia Sesión
            </span>
          </p>
        </Card>

        <p style={{ textAlign: "center", fontSize: "0.72rem", color: C.gray300, marginTop: 16 }}>
          © 2026 COMFÍA. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
