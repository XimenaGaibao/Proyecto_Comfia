import { useState } from "react";
import { globalStyle } from "./styles/tokens";
import { Navbar } from "./components/UI";

import Home     from "./pages/Home";
import About    from "./pages/About";
import Login    from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const PUBLIC_PAGES = ["home", "about", "contact"];

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      <style>{globalStyle}</style>

      {PUBLIC_PAGES.includes(screen) && (
        <Navbar onNav={setScreen} current={screen} />
      )}

      {screen === "home"      && <Home      onNav={setScreen} />}
      {screen === "about"     && <About     onNav={setScreen} />}
      {screen === "login"     && <Login     onNav={setScreen} />}
      {screen === "register"  && <Register  onNav={setScreen} />}
      {screen === "dashboard" && <Dashboard onNav={setScreen} />}
    </>
  );
}
