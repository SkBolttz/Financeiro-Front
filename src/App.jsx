import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./assets/Componentes/Login";
import Cadastro from "./assets/Componentes/Cadastro";
import RecuperarSenha from "./assets/Componentes/RecuperarSenha";
import Principal from "./assets/Componentes/Principal";
import Header from "./assets/Componentes/Header";

function App() {
  return (
    <Router>
      <div className="bg-gradient-to-t from-[#ACBAFF] to-[#676F99] h-screen w-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/principal" element={<Principal />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
