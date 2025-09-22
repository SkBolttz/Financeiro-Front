import { BotaoSecundario } from "../Ui/BotaoSecundario";
import { BotaoPrincipal } from "../Ui/BotaoPrincipal";
import InputPadrao from "../Ui/InputPadrao";
import ScrollRevealAvancado from "../Ui/ScrollRevealAvancado";
import { useNavigate } from "react-router-dom";

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
export default function Cadastro() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-[#ACBAFF] to-[#676F99] p-4">
      <ScrollRevealAvancado delay={300}>
        <div className="fixed inset-0 w-full h-full animate-gradient-slow z-0"></div>
        <div className="relative w-full max-w-[600px] h-[830px] pt-8 sm:p-4 rounded-3xl bg-gradient-to-b from-[#4741A6] to-[#ACBAFF] flex flex-col items-center z-10 shadow-2xl rounded-[20px]">
          <div className="pt-[30px] shadow-lg flex translate-x-[-70px]">
            <Logo />
            <div className="flex translate-x-[30px]">
              <h1 className="text-[#FFFFFF] font-['Antonio'] text-[60px]">
                CADASTRE-SE:
              </h1>
            </div>
          </div>
          <div
            className="text-[#FFFFFF] pt-[30px] translate-x-[-170px] flex cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <img src="../../../public/SetaEsquerda.png" alt="SetaEsquerda" />
            <p className="translate-y-[2px]">Retorne para a tela de login</p>
          </div>
          <div className="px-10 mb-10 text-[#FFFFFF] p-[10px] m-[10px] gap-[10px]">
            <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
              <label htmlFor="email" className="text-[17px]">
                Nome de Usuário:
              </label>
              <InputPadrao type="text" name="nome" id="nome" />
            </div>
            <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
              <label htmlFor="senha">Email de Usuário:</label>
              <div>
                <InputPadrao type="email" name="email" id="email" />
              </div>
            </div>
            <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
              <label htmlFor="senha">Senha:</label>
              <div>
                <InputPadrao type="password" name="senha" id="senha" />
              </div>
            </div>
            <div className="flex flex-col gap-[10px] m-[10px] p-[10px]">
              <label htmlFor="senha">Confirme a sua Senha:</label>
              <div>
                <InputPadrao type="password" name="senha" id="senha" />
              </div>
            </div>
            <div className="flex sm:flex-row items-center gap-4 mt-8 justify-end">
              <div className="-translate-x-[22px]">
                <BotaoPrincipal>CADASTRE-SE</BotaoPrincipal>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealAvancado>
    </div>
  );
}
