export default function TabelaMovimentacoes({ movimentacoes }) {
  if (!movimentacoes || !movimentacoes.content) {
    return (
      <p className="text-center text-gray-500">
        Nenhuma movimentação encontrada.
      </p>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8 rounded-xl">
      {movimentacoes.content.map((mov, index) => (
        <div key={index}>
          {index === 0 && (
            <div className="flex items-center px-[10px] py-[15px] bg-[#726AE4] text-[#FFFFFF] font-semibold w-[1700px] h-[50px] translate-x-[90px] font-[Poppins] text-[20px] font-bold border border-[#A1A1A1] rounded-t-[10px]">
              <p className="w-2/6">Descrição</p>
              <p className="w-1/6">Valor</p>
              <p className="w-1/6">Data</p>
              <p className="w-1/6">Tipo</p>
              <p className="w-1/6">Categoria</p>
              <p className="w-1/6">Pago</p>
              <p className="w-1/6">Atrasado</p>
            </div>
          )}

          <div
            className={`flex items-center px-[10px] py-[15px] 
              ${
                index === 0
                  ? "mt-0 rounded-b-[10px]"
                  : "mt-[40px] rounded-[10px]"
              }
              bg-[#BBE7F6] text-[#726AE4] font-semibold w-[1700px] h-[50px] translate-x-[90px] 
              font-[Poppins] text-[20px] font-bold border border-[#A1A1A1]`}
            style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)" }}
          >
            <p className="w-2/6">{mov.descricao}</p>
            <p className="w-1/6">R${mov.valor}</p>
            <p className="w-1/6">{mov.data}</p>
            <p className="w-1/6">{mov.tipo}</p>
            <p className="w-1/6">{mov.categoria_id?.nome}</p>
            <p
              className={`w-1/6 ${
                !mov.pago
                  ? "text-[#FA0707]"
                  : mov.atrasado
                  ? "text-[#FA0707]"
                  : "text-[#1EB01E]"
              }`}
            >
              {mov.pago ? "Sim" : "Não"}
            </p>
            <p
              className={`w-1/6 ${
                mov.atrasado ? "text-[#FA0707]" : "text-[#1EB01E]"
              }
              `}
            >
              {mov.atrasado ? "Sim" : "Não"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
