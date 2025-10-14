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
          src="../../../public/LogoTesteDois.png"
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

    console.log("Função enviarLogin chamada:", { email, senha });

    try {
      const response = await axios.post(
        "http://localhost:8082/autenticacao/login",
        { email, senha },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("horaLogin", new Date().toLocaleString());
      navigate("/principal");
    } catch (error) {
      console.error("Erro no login:", error);

      if (error.response) {
        setErro("Email ou senha incorretos!");
      } else if (error.request) {
        setErro("Servidor não respondeu. Tente novamente.");
      } else {
        setErro("Erro inesperado: " + error.message);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#ACBAFF] to-[#4741A6] p-4">
      <ScrollRevealAvancado delay={300}>
        <div className="fixed inset-0 w-full h-full animate-gradient-slow z-0"></div>
        <div className="relative w-full max-w-[600px] h-[780px] pt-8 sm:p-4 rounded-3xl bg-gradient-to-t from-[#ACBAFF] to-[#4741A6] flex flex-col items-center z-10 shadow-2xl rounded-[20px] shadow-[#ACBAFF] shadow-[0_10px_30px_-3px_#ACBAFF,0_8px_8px_-4px_#ACBAFF]">
          <div className="pt-[30px] shadow-lg">
            <Logo />
          </div>
          <div className="flex flex-col items-center justify-center pt-[30px]">
            <h1 className="text-[#FFFFFF] font-['Antonio'] text-[60px]">
              BEM-VINDO!
            </h1>
            <p className="flex items-center justify-center text-[#BBE7F6] text-[25px] font-['Poppins']">
              Faça seu login:
            </p>
          </div>
          <form id="formLogin" onSubmit={enviarLogin}>
            <div className="px-10 mb-10 text-[#FFFFFF] p-[10px] m-[10px] gap-[10px] font-['Poppins']">
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="email" className="text-[17px]">
                  Email:
                </label>
                <InputPadrao
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="senha" className="text-[17px]">Senha:</label>
                <div>
                  <InputPadrao
                    type="password"
                    name="senha"
                    id="senha"
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <p
                    className="text-[#BBE7F6] m-[5px] cursor-pointer"
                    onClick={() =>
                      navigate("/recuperar-senha", { replace: true })
                    }
                  >
                    Esqueceu sua senha?
                  </p>
                </div>
              </div>
              <div className="flex justify-between sm:flex-row justify-between items-center gap-4 mt-8">
                <div className="translate-x-[22px]">
                  <BotaoSecundario
                    onClick={() => navigate("/cadastro", { replace: true })}
                    className="bg-[#4741A6] text-[#BBE7F6]"
                  >
                    CADASTRE-SE
                  </BotaoSecundario>
                </div>

                <div className="-translate-x-[22px]">
                  <BotaoPrincipal type="submit" disabled={carregando} className="bg-[#FCBF32] hover:bg-[#FFCE58]">
                    {carregando ? "Entrando..." : "ENTRAR"}
                  </BotaoPrincipal>
                </div>
              </div>
              <div
                className={`flex justify-center items-center 
              bg-[#fad2b1] p-[10px] text-[#B23A2B] 
              rounded-[10px] border border-[#ff7f7f] 
              text-[20px] font-[Poppins] max-w-md mx-auto
              transition-opacity duration-1000 mt-[30px]
              ${erro ? "opacity-100" : "opacity-0"}`}
              >
                {erro}
              </div>
            </div>
          </form>
        </div>
      </ScrollRevealAvancado>
    </div>
  );
}
