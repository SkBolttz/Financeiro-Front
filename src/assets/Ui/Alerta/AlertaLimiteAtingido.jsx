import { useEffect, useState, useRef } from "react";

export default function AlertaLimiteAtingido({
  limiteAtingido,
  duracao = 5000,
  usuario,
}) {
  const [visivel, setVisivel] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (limiteAtingido) {
      setVisivel(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setVisivel(false);
      }, duracao);
    }
  }, [limiteAtingido, duracao]);

  if (!visivel || !limiteAtingido) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] 
        w-[850px] max-h-[300px] overflow-y-auto 
        bg-[#FAD2B1] p-[10px] text-[#000000] rounded-[10px] 
        border border-[#FAD2B1] text-[15px] font-[Poppins] 
        shadow-lg font-bold transition-transform duration-500 ease-in-out
        ${
          visivel
            ? "translate-x-0 opacity-100"
            : "translate-x-[760px] opacity-0"
        }`}
    >
      <h3 className="font-bold mb-2">Seu limite foi atingido</h3>
      <p className="p-[10px]">
        {usuario} → Limite atingido: R$ {limiteAtingido.limite}
      </p>
    </div>
  );
}
