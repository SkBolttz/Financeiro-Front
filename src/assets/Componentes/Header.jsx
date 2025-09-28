import { BotaoPrincipal } from "../Ui/BotaoPrincipal";
import ScrollRevealAvancado from "../Ui/ScrollRevealAvancado";
import { useNavigate } from "react-router-dom";
import Atalho from "../Ui/Atalho";

const Logo = () => (
  <div className="flex items-center justify-center pt-10 mb-5">
    <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
      <img
        src="../../../public/LogoTesteDois.png"
        alt="Logo Gestão Financeira"
        className="w-[50px] h-[50px] rounded-full shadow-[0_10px_30px_-3px_#FFCE58,0_4px_6px_-2px_#FFCE58]"
      />
    </div>
  </div>
);

export default function Header() {
  const navigate = useNavigate();

  return (
    <ScrollRevealAvancado delay={300}>
      <div className="bg-[#726AE4] w-full">
        <div className="justify-between flex">
          <div className="pt-[30px] shadow-lg flex justify-start pl-[30px] pb-[10px] translate-y-[-10px]">
            <Logo />
          </div>
          <div className="flex justify-between gap-[100px]">
            <Atalho />
            <Atalho />
            <Atalho />
          </div>
          <div className="pt-[30px] shadow-lg flex justify-end pr-[30px] pb-[10px] translate-y-[-10px] cursor-pointer]">
            <BotaoPrincipal
              className="text-[30px] bg-[#FCBF32] hover:bg-[#FFCE58]"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              SAIR
            </BotaoPrincipal>
          </div>
        </div>
      </div>
    </ScrollRevealAvancado>
  );
}
