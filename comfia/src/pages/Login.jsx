import { useState } from "react";
import { C, font } from "../styles/tokens";
import { Btn, Input } from "../components/UI";

export default function Login({ onNav }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      const a = attempts + 1;
      setAttempts(a);
      setError(
        a >= 3
          ? "Demasiados intentos fallidos. Cuenta bloqueada temporalmente."
          : "Contraseña incorrecta. Inténtalo de nuevo."
      );
      return;
    }
    onNav("dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "45% 55%", background: C.cream }}>

      {/* Left panel */}
      <div style={{
        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAS3Z6QFQXIXsfBWRwYZxD_mOwQ_SOcyJ_aW4x6camc_JL2NZ3NpCSYgn7ouxF89ACZ7s9piA9RJve3U_E6kWVzSqbtnyVY_xNOR7BL_ecPIfDJetjcbQ5PrKS1mTyR1jrZVoq0U-s5OyVM1sZXnM7wzbRatOoabspGM11nCCvsyKISYrivO4KOYP8zbEj5yW058gKTqC3Dehpy-KfTsrITXEoecL6FcxGp__yTJNMRVaFNixcWOAgmvsta6vGUdHlJlczz7s598pbG')" ,
        backgroundSize: "cover",     
        backgroundPosition: "center",  
        backgroundRepeat: "no-repeat",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "60px 48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -40, left: -40, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: 80, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ fontFamily: font, fontSize: "1.5rem", fontWeight: 700, color: C.white, marginBottom: 12 }}>COMFÍA</div>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 300 }}>
          Gestiona tu bienestar y productividad en un solo lugar con nuestra plataforma.
        </p>
      </div>

      {/* Right panel */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 60px", background: "#FFF5AC"}}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <h2 style={{ fontFamily: font, fontSize: "2rem", color: C.gray700, marginBottom: 8 }}>¡Bienvenido de nuevo!</h2>
          <p style={{ color: C.gray500, fontSize: "0.875rem", marginBottom: 36 }}>
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>

          <Input
            label="Correo electrónico" type="email"
            placeholder="ejemplo@correo.com"
            value={email} onChange={(e) => setEmail(e.target.value)} 
          />

          {/* Password field with toggle */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: C.gray500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
               Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                style={{
                  width: "100%", padding: "12px 44px 12px 16px", borderRadius: 8,
                  border: `1.5px solid ${error ? C.red : C.gray100}`,
                  background: C.white, fontSize: "0.9rem",
                }}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: C.gray500 }}
              >
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>
            {error && <p style={{ color: C.red, fontSize: "0.75rem", marginTop: 4 }}>{error}</p>}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: C.gray500, cursor: "pointer" }}>
              <input type="checkbox" /> Recordarme
            </label>
            <span style={{ fontSize: "0.85rem", color: C.gold, cursor: "pointer", fontWeight: 600 }}>
              Recordar contraseña
            </span>
          </div>

          <Btn
            onClick={handleLogin}
            disabled={attempts >= 3}
            style={{ width: "100%", padding: "14px", fontSize: "0.95rem", borderRadius: 10 }}
          >
            Iniciar sesión
          </Btn>

          <div style={{ textAlign: "center", margin: "24px 0", color: C.gray300, fontSize: "0.8rem" }}>
            O CONTINÚA CON
          </div>

          <p style={{ textAlign: "center", fontSize: "0.875rem", color: C.gray500 }}>
            ¿Todavía no tienes una cuenta?{" "}
            <span onClick={() => onNav("register")} style={{ color: C.gold, fontWeight: 700, cursor: "pointer" }}>
              Regístrate
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
