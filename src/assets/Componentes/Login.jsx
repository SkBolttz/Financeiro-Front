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
      <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] rounded-full flex items-center justify-center">
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

    console.log("Função enviarLogin chamada:", { email, senha });

    try {
      const response = await axios.post(
        "https://financeiro-production-2b89.up.railway.app/autenticacao/login",
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
        <div className="relative w-full min-w-[350px] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl h-auto pt-8 sm:p-6 md:p-8 rounded-3xl bg-gradient-to-t from-[#ACBAFF] to-[#4741A6] flex flex-col items-center z-10 shadow-2xl rounded-[20px] shadow-[#ACBAFF] shadow-[0_10px_30px_-3px_#ACBAFF,0_8px_8px_-4px_#ACBAFF]">
          <div className="pt-[30px] shadow-lg">
            <Logo />
          </div>
          <div className="flex flex-col items-center justify-center pt-[30px]">
            <h1 className="text-[#FFFFFF] font-['Antonio'] text-[50px] sm:text-[60px] md:text-[70px] lg:text-[80px] xl:text-[90px] 2xl:text-[100px]">
              BEM-VINDO!
            </h1>
            <p className="flex items-center justify-center text-[#BBE7F6] text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[40px] font-['Poppins']">
              Faça seu login:
            </p>
          </div>
          <form id="formLogin" onSubmit={enviarLogin}>
            <div className="px-10 sm:px-12 md:px-16 lg:px-20 xl:px-24 mb-10 text-[#FFFFFF] p-[10px] m-[10px] gap-[10px] font-['Poppins']">
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="email" className="text-[16px] sm:text-[18px] md:text-[20px]">
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
                <label htmlFor="senha" className="text-[16px] sm:text-[18px] md:text-[20px]">
                  Senha:
                </label>
                <div>
                  <InputPadrao
                    type="password"
                    name="senha"
                    id="senha"
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <p
                    className="text-[#BBE7F6] m-[5px] cursor-pointer text-[14px] sm:text-[16px] md:text-[18px]"
                    onClick={() =>
                      navigate("/recuperar-senha", { replace: true })
                    }
                  >
                    Esqueceu sua senha?
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 mt-8">
                <BotaoSecundario
                  onClick={() => navigate("/cadastro", { replace: true })}
                  className="bg-[#4741A6] text-[#BBE7F6]"
                >
                  CADASTRE-SE
                </BotaoSecundario>
                <BotaoPrincipal
                  type="submit"
                  disabled={carregando}
                  className="bg-[#FCBF32] hover:bg-[#FFCE58]"
                >
                  {carregando ? "Entrando..." : "ENTRAR"}
                </BotaoPrincipal>
              </div>
              <div
                className={`flex justify-center items-center 
              bg-[#fad2b1] p-[10px] text-[#B23A2B] 
              rounded-[10px] border border-[#ff7f7f] 
              text-[18px] sm:text-[20px] md:text-[22px] font-[Poppins] max-w-md mx-auto
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
