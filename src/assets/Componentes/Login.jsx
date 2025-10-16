import { BotaoSecundario } from "../Ui/Botao/BotaoSecundario";
import { BotaoPrincipal } from "../Ui/Botao/BotaoPrincipal";
import InputPadrao from "../Ui/Input/InputPadrao";
import ScrollRevealAvancado from "../Ui/Geral/ScrollRevealAvancado";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ErroPadrao from "../Ui/Erro/ErroPadrao";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const Logo = () => (
    <div className="flex items-center justify-center pt-10 mb-5">
      <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center">
        <img
          src="/LogoTesteDois.png"
          alt="Logo Gestão Financeira"
          className="w-[100px] h-[100px] rounded-full shadow-[0_10px_30px_-3px_#FFCE58,0_4px_6px_-2px_#FFCE58]"
        />
      </div>
    </div>
  );

  const enviarLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    try {
      const response = await axios.post(
        "https://financeiro-production-2b89.up.railway.app/autenticacao/login",
        { email, senha },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("horaLogin", new Date().toLocaleString());
      navigate("/principal");
    } catch (error) {
      if (error.response) setErro("Email ou senha incorretos!");
      else if (error.request) setErro("Servidor não respondeu. Tente novamente.");
      else setErro("Erro inesperado: " + error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#ACBAFF] to-[#4741A6] p-4">
      <ScrollRevealAvancado delay={300}>
        <div className="fixed inset-0 w-full h-full animate-gradient-slow z-0"></div>

        <div className="relative w-full max-w-[600px] sm:max-w-[90%] h-[780px] sm:h-auto pt-8 sm:p-4 rounded-3xl bg-gradient-to-t from-[#ACBAFF] to-[#4741A6] flex flex-col items-center z-10 shadow-2xl shadow-[#ACBAFF] shadow-[0_10px_30px_-3px_#ACBAFF,0_8px_8px_-4px_#ACBAFF]">

          {/* Logo */}
          <div className="pt-[30px] shadow-lg w-full flex justify-center">
            <Logo />
          </div>

          {/* Títulos */}
          <div className="flex flex-col items-center justify-center pt-[30px] px-4 sm:px-6 md:px-10 text-center">
            <h1 className="text-[#FFFFFF] font-['Antonio'] text-[60px] sm:text-[50px]">
              BEM-VINDO!
            </h1>
            <p className="text-[#BBE7F6] text-[25px] sm:text-[22px] font-['Poppins'] mt-2">
              Faça seu login:
            </p>
          </div>

          {/* Form */}
          <form id="formLogin" onSubmit={enviarLogin} className="w-full px-4 sm:px-6 md:px-10 mt-6">
            <div className="flex flex-col gap-[10px] text-[#FFFFFF] font-['Poppins']">

              {/* Email */}
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="email" className="text-[17px]">Email:</label>
                <InputPadrao type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="senha" className="text-[17px]">Senha:</label>
                <div>
                  <InputPadrao type="password" name="senha" id="senha" onChange={(e) => setSenha(e.target.value)} />
                  <p className="text-[#BBE7F6] m-[5px] cursor-pointer text-sm sm:text-base"
                     onClick={() => navigate("/recuperar-senha", { replace: true })}>
                    Esqueceu sua senha?
                  </p>
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                <div className="translate-x-0 sm:translate-x-[22px] w-full sm:w-auto">
                  <BotaoSecundario
                    onClick={() => navigate("/cadastro", { replace: true })}
                    className="bg-[#4741A6] text-[#BBE7F6] w-full sm:w-auto"
                  >
                    CADASTRE-SE
                  </BotaoSecundario>
                </div>

                <div className="translate-x-0 sm:-translate-x-[22px] w-full sm:w-auto">
                  <BotaoPrincipal type="submit" disabled={carregando} className="bg-[#FCBF32] hover:bg-[#FFCE58] w-full sm:w-auto">
                    {carregando ? "Entrando..." : "ENTRAR"}
                  </BotaoPrincipal>
                </div>
              </div>

              {/* Mensagem de erro */}
              <div className={`flex justify-center items-center bg-[#fad2b1] p-[10px] text-[#B23A2B] rounded-[10px] border border-[#ff7f7f] text-[20px] max-w-md mx-auto mt-[30px] transition-opacity duration-1000 ${erro ? "opacity-100" : "opacity-0"}`}>
                {erro}
              </div>

            </div>
          </form>
        </div>
      </ScrollRevealAvancado>
    </div>
  );
}
