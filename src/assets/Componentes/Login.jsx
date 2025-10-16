import { BotaoSecundario } from "../Ui/Botao/BotaoSecundario";
import { BotaoPrincipal } from "../Ui/Botao/BotaoPrincipal";
import InputPadrao from "../Ui/Input/InputPadrao";
import ScrollRevealAvancado from "../Ui/Geral/ScrollRevealAvancado";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const Logo = () => (
    <div className="flex items-center justify-center pt-10 mb-5">
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center">
        <img
          src="/LogoTesteDois.png"
          alt="Logo Gestão Financeira"
          className="w-full h-full rounded-full shadow-[0_10px_30px_-3px_#FFCE58,0_4px_6px_-2px_#FFCE58]"
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

        <div className="relative w-full max-w-[600px] sm:max-w-[90%] h-auto sm:h-auto pt-6 sm:pt-8 px-4 sm:px-6 md:px-10 rounded-3xl bg-gradient-to-t from-[#ACBAFF] to-[#4741A6] flex flex-col items-center z-10 shadow-2xl shadow-[#ACBAFF] shadow-[0_10px_30px_-3px_#ACBAFF,0_8px_8px_-4px_#ACBAFF]">

          <Logo />

          <div className="flex flex-col items-center justify-center pt-4 sm:pt-6 text-center">
            <h1 className="text-[#FFFFFF] font-['Antonio'] text-3xl sm:text-4xl md:text-[60px]">
              BEM-VINDO!
            </h1>
            <p className="text-[#BBE7F6] text-lg sm:text-xl md:text-[25px] font-['Poppins'] mt-2">
              Faça seu login:
            </p>
          </div>

          <form id="formLogin" onSubmit={enviarLogin} className="w-full mt-6">
            <div className="flex flex-col gap-4 text-[#FFFFFF] font-['Poppins']">

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[17px]">Email:</label>
                <InputPadrao type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-2">
                <label htmlFor="senha" className="text-[17px]">Senha:</label>
                <div>
                  <InputPadrao type="password" name="senha" id="senha" onChange={(e) => setSenha(e.target.value)} />
                  <p className="text-[#BBE7F6] mt-1 text-sm sm:text-base cursor-pointer"
                     onClick={() => navigate("/recuperar-senha", { replace: true })}>
                    Esqueceu sua senha?
                  </p>
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                <BotaoSecundario
                  onClick={() => navigate("/cadastro", { replace: true })}
                  className="bg-[#4741A6] text-[#BBE7F6] w-full sm:w-auto"
                >
                  CADASTRE-SE
                </BotaoSecundario>

                <BotaoPrincipal
                  type="submit"
                  disabled={carregando}
                  className="bg-[#FCBF32] hover:bg-[#FFCE58] w-full sm:w-auto"
                >
                  {carregando ? "Entrando..." : "ENTRAR"}
                </BotaoPrincipal>
              </div>

              {/* Mensagem de erro */}
              <div className={`flex justify-center items-center bg-[#fad2b1] p-3 text-[#B23A2B] rounded-[10px] border border-[#ff7f7f] text-center text-base sm:text-lg mt-6 transition-opacity duration-500 ${erro ? "opacity-100" : "opacity-0"}`}>
                {erro}
              </div>

            </div>
          </form>
        </div>
      </ScrollRevealAvancado>
    </div>
  );
}
