import { BotaoPrincipal } from "../Ui/Botao/BotaoPrincipal";
import InputPadrao from "../Ui/Input/InputPadrao";
import ScrollRevealAvancado from "../Ui/Geral/ScrollRevealAvancado";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ErroPadrao from "../Ui/Erro/ErroPadrao";
import SucessoPadrao from "../Ui/Erro/SucessoPadrao";

export default function Cadastro() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const Logo = () => (
    <div className="flex items-center justify-center pt-10 mb-5">
      <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] rounded-full flex items-center justify-center">
        <img
          src="/LogoTesteDois.png"
          alt="Logo Gestão Financeira"
          className="w-full h-full rounded-full shadow-[0_10px_30px_-3px_#FFCE58,0_4px_6px_-2px_#FFCE58]"
        />
      </div>
    </div>
  );

  const enviarCadastro = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    if (senha !== confirmaSenha) {
      setErro("As senhas não coincidem. Tente novamente.");
      setCarregando(false);
      return;
    }

    if (!nome || !email || !senha || !confirmaSenha) {
      setErro("Por favor, preencha todos os campos.");
      setCarregando(false);
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter no mínimo 8 caracteres.");
      setCarregando(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://financeiro-production-2b89.up.railway.app/autenticacao/cadastro",
        { nome, email, senha },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSucesso("Cadastro realizado com sucesso!");

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        setErro("Email já cadastrado! Tente novamente.");
      } else if (error.request) {
        setErro("Servidor não respondeu. Tente novamente.");
      } else {
        setErro("Erro inesperado");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#ACBAFF] to-[#4741A6] p-4">
      <ScrollRevealAvancado delay={300}>
        {/* Removido o div fixed inset-0, pois estava causando sobreposição desnecessária */}
        <div className="relative w-full min-w-[350px] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl h-auto pt-8 sm:p-6 md:p-8 rounded-3xl bg-gradient-to-t from-[#ACBAFF] to-[#4741A6] flex flex-col items-center z-10 shadow-2xl rounded-[20px] shadow-[#ACBAFF] shadow-[0_10px_30px_-3px_#ACBAFF,0_8px_8px_-4px_#ACBAFF]">
          <div className="pt-[30px] shadow-lg">
            <Logo />
          </div>
          <div className="flex flex-col items-center justify-center pt-[30px]">
            <h1 className="text-[#FFFFFF] font-['Antonio'] text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px] 2xl:text-[90px]">
              CADASTRE-SE:
            </h1>
          </div>
          <div
            className="text-[#FFFFFF] pt-[25px] flex items-center cursor-pointer text-[14px] sm:text-[16px] md:text-[18px] font-['Poppins']"
            onClick={() => navigate("/")}
          >
            <img src="/SetaEsquerda.png" alt="SetaEsquerda" className="mr-2 w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]" />
            <p>Retorne para a tela de login</p>
          </div>
          <form id="formCadastro" onSubmit={enviarCadastro}>
            <div className="px-10 sm:px-12 md:px-16 lg:px-20 xl:px-24 mb-10 text-[#FFFFFF] p-[10px] m-[10px] gap-[10px] font-['Poppins']">
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="nome" className="text-[14px] sm:text-[16px] md:text-[17px]">
                  Nome de Usuário:
                </label>
                <InputPadrao
                  type="text"
                  name="nome"
                  id="nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="email" className="text-[14px] sm:text-[16px] md:text-[17px]">
                  Email de Usuário:
                </label>
                <InputPadrao
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="senha" className="text-[14px] sm:text-[16px] md:text-[17px]">
                  Senha:
                </label>
                <InputPadrao
                  type="password"
                  name="senha"
                  id="senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
                <label htmlFor="confirmarSenha" className="text-[14px] sm:text-[16px] md:text-[17px]">
                  Confirme a sua Senha:
                </label>
                <InputPadrao
                  type="password"
                  name="confirmarSenha"
                  id="confirmarSenha"
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center gap-4 mt-8">
                <BotaoPrincipal
                  type="submit"
                  disabled={carregando}
                  className="bg-[#FCBF32] hover:bg-[#FFCE58]"
                >
                  {carregando ? "Cadastrando..." : "CADASTRE-SE"}
                </BotaoPrincipal>
                {carregando && <span className="text-[#FFFFFF] text-[14px] sm:text-[16px]">Carregando...</span>}
              </div>
              <div className="flex flex-col items-center gap-4 mt-4">
                <div
                  className={`transition-all duration-500 ease-out 
                  ${sucesso ? "opacity-100" : "opacity-0"}`}
                >
                  {sucesso && <SucessoPadrao mensagem={sucesso} />}
                </div>
                <div
                  className={`transition-all duration-500 ease-out 
                  ${erro ? "opacity-100" : "opacity-0"}`}
                >
                  {erro && <ErroPadrao mensagem={erro} />}
                </div>
              </div>
            </div>
          </form>
        </div>
      </ScrollRevealAvancado>
    </div>
  );
}
