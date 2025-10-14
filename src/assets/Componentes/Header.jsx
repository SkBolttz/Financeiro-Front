import { BotaoPrincipal } from "../Ui/Botao/BotaoPrincipal.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../Ui/Navbar/NavBar.jsx";

export default function Header() {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="relative bg-[#726AE4]">
      <button
        onClick={() => setNavOpen(true)}
        className="absolute top-5 left-5 text-white text-3xl border-none bg-[#726AE4] translate-y-[30px] translate-x-[100px] text-[30px] cursor-pointer hover:text-[#FCBF32] transition duration-300 ease-in-out"
      >
        ☰
      </button>
      <NavBar isOpen={navOpen} setIsOpen={setNavOpen} />
      <div className="justify-between flex">
        <div className="pt-[30px] shadow-lg flex justify-start pl-[30px] pb-[10px] translate-y-[-10px]"></div>
        <div className="pt-[30px] shadow-lg flex justify-end pr-[30px] pb-[10px] translate-y-[-10px]">
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
  );
}
