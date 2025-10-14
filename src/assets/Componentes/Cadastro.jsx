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
      <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center">
        <img
          src="../../../public/LogoTesteDois.png"
          alt="Logo Gestão Financeira"
          className="w-[100px] h-[100px] rounded-full shadow-[0_10px_30px_-3px_#FFCE58,0_4px_6px_-2px_#FFCE58]"
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
        "http://localhost:8082/autenticacao/cadastro",
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
        <div className="fixed inset-0 w-full h-full animate-gradient-slow z-0"></div>
        <div className="relative w-full max-w-[600px] h-[830px] pt-8 sm:p-4 rounded-3xl bg-gradient-to-t from-[#ACBAFF] to-[#4741A6] flex flex-col items-center z-10 shadow-2xl rounded-[20px] shadow-[#ACBAFF] shadow-[0_10px_30px_-3px_#ACBAFF,0_8px_8px_-4px_#ACBAFF]">
          <div className="pt-[30px] shadow-lg flex translate-x-[-70px]">
            <Logo />
            <div className="flex translate-x-[30px]">
              <h1 className="text-[#FFFFFF] font-['Antonio'] text-[60px]">
                CADASTRE-SE:
              </h1>
            </div>
          </div>
          <div
            className="text-[#FFFFFF] pt-[25px] translate-x-[-140px] flex cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="../../../public/SetaEsquerda.png" alt="SetaEsquerda" />
            <p className="font-['Poppins']">Retorne para a tela de login</p>
          </div>
          <div className="px-10 mb-10 text-[#FFFFFF] p-[10px] m-[10px] gap-[10px] font-['Poppins']">
            <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
              <label htmlFor="email" className="text-[17px]">
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
              <label htmlFor="senha">Email de Usuário:</label>
              <div>
                <InputPadrao
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
              <label htmlFor="senha">Senha:</label>
              <div>
                <InputPadrao
                  type="password"
                  name="senha"
                  id="senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
              <label htmlFor="senha">Confirme a sua Senha:</label>
              <div>
                <InputPadrao
                  type="password"
                  name="confirmarSenha"
                  id="confirmarSenha"
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                />
              </div>
            </div>
            <div className="flex sm:flex-row items-center gap-4 mt-8 justify-end">
              <div className="-translate-x-[22px] flex justify-between items-center gap-[70px]">
                <div
                  className={`transition-all duration-500 ease-out transform translate-x-[45px]
                ${sucesso ? "opacity-100" : "opacity-0"}`}
                >
                  {sucesso && <SucessoPadrao mensagem={sucesso} />}
                </div>

                <div
                  className={`transition-all duration-500 ease-out transform translate-x-[-27px]
                 ${erro ? "opacity-100 " : "opacity-0"}`}
                >
                  {erro && <ErroPadrao mensagem={erro}/>}
                </div>

                <BotaoPrincipal onClick={enviarCadastro} className=" bg-[#FCBF32] hover:bg-[#FFCE58]">
                  CADASTRE-SE
                </BotaoPrincipal>

                {carregando && <span className="ml-2">Carregando...</span>}
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealAvancado>
    </div>
  );
}
