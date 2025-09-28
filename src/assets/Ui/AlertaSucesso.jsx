import { useEffect, useState } from "react";

export default function AlertaSucesso({ mensagem, duracao = 3000 }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (mensagem) {
      setVisivel(true);

      const timeout = setTimeout(() => {
        setVisivel(false);
      }, duracao);

      return () => clearTimeout(timeout);
    }
  }, [mensagem, duracao]);

  return (
    <div
      className={`w-[300px] h-[100px] flex justify-center items-center bg-[#40A800] p-[10px] text-[#FFFFFF] rounded-[10px] border border-[#40A800] text-[20px] font-[Poppins] z-50 pt-[10px] max-w-md mx-auto shadow-lg shadow-[#40A800] shadow-[0_10px_30px_-3px_#40A800,0_8px_8px_-4px_#40A800] font-bold transition-transform duration-500 ease-in-out ${
        visivel ? "translate-x-0 opacity-100" : "translate-x-[760px] opacity-0"
      }`}
      role="alert"
    >
      <span>{mensagem}</span>
    </div>
  );
}
