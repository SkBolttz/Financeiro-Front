import { useEffect, useState, useRef } from "react";

export default function AlertaVencimento({ alertas, duracao = 5000 }) {
  const [visivel, setVisivel] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (alertas && alertas.length > 0) {
      setVisivel(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setVisivel(false);
      }, duracao);
    }
  }, [alertas, duracao]);

  if (!visivel || !alertas || alertas.length === 0) return null;

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
      <h3 className="font-bold mb-2">
        Despesas próximas do vencimento ou vencidas
      </h3>
      <ul className="list-disc list-inside p-[10px]">
        {alertas.map((alerta, index) => (
          <li key={index} className="mb-1">
            {alerta.usuario} → {alerta.descricao} vence em{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(alerta.dataVencimento + "T00:00:00"))}
          </li>
        ))}
      </ul>
    </div>
  );
}
