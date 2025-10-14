import { useState } from "react";
import CheckboxPadrao from "../../Checkbox/CheckboxPadrao";
export default function ModalFiltros({ setModalFiltroAberto, setFiltroAtual }) {
  const [tipo, setTipo] = useState("");
  const aplicarFiltros = () => {
    setFiltroAtual(tipo);
    setModalFiltroAberto(false);
  };
  const opcoes = [
    { label: "Listar todas as receitas", value: "TODAS_MOVIMENTACOES" },
    { label: "Listar Receitas", value: "TODAS_RECEITAS" },
    { label: "Listar Despesas", value: "TODAS_DESPESAS" },
    { label: "Listar Receitas Ativas", value: "TODAS_RECEITAS_ATIVAS" },
    { label: "Listar Receitas Inativas", value: "TODAS_RECEITAS_INATIVAS" },
    { label: "Listar Despesas Ativas", value: "TODAS_DESPESAS_ATIVAS" },
    { label: "Listar Despesas Inativas", value: "TODAS_DESPESAS_INATIVAS" },
    { label: "Listar Despesas Pagas", value: "TODAS_DESPESAS_PAGAS" },
    { label: "Listar Despesas Atrasadas", value: "TODAS_DESPESAS_ATRASADAS" },
    {
      label: "Listar Todas as Movimentações Ativas",
      value: "TODAS_MOVIMENTACOES_ATIVAS",
    },
    {
      label: "Listar Todas as Movimentações Inativas",
      value: "TODAS_MOVIMENTACOES_INATIVAS",
    },
  ];
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      {" "}
      <div className="bg-[#FFCE58] rounded-[20px] shadow-xl p-4 w-[500px] h-[500px] translate-x-[1400px] ease-in-out duration-500">
        {" "}
        <div className="flex justify-center mt-[20px]">
          {" "}
          <h2 className="text-[30px] text-[#FFFFFF] font-[Poppins]">
            Filtros
          </h2>{" "}
          <div>
            {" "}
            <button
              onClick={() => setModalFiltroAberto(false)}
              className="text-[30px] text-[#FFFFFF] flex translate-x-[180px] ease-in-out duration-500"
            >
              {" "}
              &times;{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div>
          {" "}
          {opcoes.map((opcao) => (
            <CheckboxPadrao
              key={opcao.value}
              label={opcao.label}
              checked={tipo === opcao.value}
              onChange={() => setTipo(opcao.value)}
            />
          ))}{" "}
        </div>{" "}
        <div className="mt-4 flex justify-center">
          {" "}
          <button
            onClick={aplicarFiltros}
            className="bg-[#FFFFFF] text-[#FFCE58] font-[Poppins] px-6 py-2 rounded-lg"
          >
            {" "}
            Aplicar Filtro{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
