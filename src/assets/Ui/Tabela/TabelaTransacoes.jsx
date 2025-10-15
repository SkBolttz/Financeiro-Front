import { useState, useEffect } from "react";
import axios from "axios";

export const TabelaTransacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const carregarExtratosMovimentacoes = async () => {
    try {
      const response = await axios.get(
        "https://financeiro-production-2b89.up.railway.app/dashboard/extrato/movimentacao",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMovimentacoes(response.data);
    } catch (error) {
      console.error("Erro ao resgatar movimentacoes: ", error);
    }
  };

  const SvgDespesa = () => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="#f5a0a0ff" />
      <rect
        x="14"
        y="18"
        width="20"
        height="12"
        rx="2"
        ry="2"
        fill="#ff0400ff"
      />
      <rect x="16" y="22" width="8" height="2" fill="#FFCDD2" />
    </svg>
  );

  const SvgReceita = () => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="#aef1b4ff" />
      <circle cx="24" cy="24" r="12" fill="#098f0fff" />
      <line x1="24" y1="24" x2="24" y2="16" stroke="#E8F5E9" strokeWidth="2" />
      <line x1="24" y1="24" x2="30" y2="24" stroke="#E8F5E9" strokeWidth="2" />
    </svg>
  );

  useEffect(() => {
    carregarExtratosMovimentacoes();
  }, []);

  return (
    <div className="mt-[50px] ml-[100px] mr-[100px] font-['Poppins']">
      {movimentacoes.map((mov, index) => (
        <div
          key={index}
          className="flex items-center gap-[10px] mt-[40px] cursor-pointer rounded-[10px] 
                     hover:translate-y-[-5px] hover:shadow-[0px_8px_8px_rgba(0,0,0,0.25)] 
                     hover:p-[15px] duration-300"
        >
          {mov.tipo === "DESPESA" ? <SvgDespesa /> : <SvgReceita />}

          <div className="flex-1 flex flex-col">
            <span className="text-[25px] font-semibold">{mov.descricao}</span>
            <span className="text-[15px] text-gray-500">
              {mov.categoria} - {mov.data}
            </span>
          </div>

          <div className="w-[120px] text-right">
            {mov.tipo === "DESPESA" ? (
              <span className="text-[#DC2626] text-[25px] font-semibold">
                -R${mov.valor}
              </span>
            ) : (
              <span className="text-[#16A34A] text-[25px] font-semibold">
                +R${mov.valor}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
