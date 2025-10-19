import { BotaoEditar } from "../Botao/BotaoEditar";

export default function TabelaMovimentacoes({
  movimentacoes,
  setEditarMovimentacao,
  setMovimentacaoSelecionada,
  setDescricaoMovimentacao,
  setValorMovimentacao,
  setDataMovimentacao,
  setCategoriaSelecionada,
  setTipoCategoria,
  setRemoverMovimentacao,
}) {
  if (!movimentacoes || movimentacoes.length === 0) {
    return (
      <p className="text-center text-gray-500 font-[Poppins]">
        Nenhuma movimentação encontrada.
      </p>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8 rounded-xl overflow-x-auto">
      <div className="min-w-[800px] sm:min-w-[1000px] md:min-w-[1200px]">
        {movimentacoes.map((mov, index) => (
          <div key={index}>
            {index === 0 && (
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_50px_50px] gap-2 px-[10px] sm:px-[12px] md:px-[15px] py-[10px] sm:py-[12px] md:py-[15px] bg-[#726AE4] text-[#FFFFFF] font-semibold font-[Poppins] text-[16px] sm:text-[18px] md:text-[20px] rounded-t-[10px] border border-[#A1A1A1]">
                <p className="truncate">Descrição</p>
                <p>Valor</p>
                <p>Data</p>
                <p>Tipo</p>
                <p>Categoria</p>
                <p>Pago</p>
                <p>Atrasado</p>
              </div>
            )}
            <div
              className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_50px_50px] gap-2 px-[10px] sm:px-[12px] md:px-[15px] py-[10px] sm:py-[12px] md:py-[15px] ${
                index === 0 ? "mt-0 rounded-b-[10px]" : "mt-[20px] sm:mt-[30px] md:mt-[40px] rounded-[10px]"
              } ${mov.ativa === false ? "bg-[#A49DEB]" : "bg-[#BBE7F6]"} 
                text-[#726AE4] font-semibold font-[Poppins] text-[16px] sm:text-[18px] md:text-[20px] border border-[#A1A1A1]`}
              style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)" }}
            >
              <p className="truncate">{mov.descricao}</p>
              <p className="truncate">R${mov.valor}</p>
              <p className="truncate">{mov.data}</p>
              <p
                className={`${
                  mov.tipo === "DESPESA" ? "text-[#FA0707]" : "text-[#1EB01E]"
                } truncate`}
              >
                {mov.tipo}
              </p>
              <p className="truncate">{mov.categoria_id?.nome}</p>
              <p
                className={`${
                  !mov.pago || mov.atrasado ? "text-[#FA0707]" : "text-[#1EB01E]"
                } truncate`}
              >
                {mov.pago ? "Sim" : "Não"}
              </p>
              <p
                className={`${
                  mov.atrasado ? "text-[#FA0707]" : "text-[#1EB01E]"
                } truncate`}
              >
                {mov.atrasado ? "Sim" : "Não"}
              </p>
              <div className="flex gap-[20px] sm:gap-[25px] md:gap-[30px] justify-center items-center">
                <BotaoEditar
                  onClick={() => {
                    setMovimentacaoSelecionada(mov);
                    setDescricaoMovimentacao(mov.descricao);
                    setValorMovimentacao(mov.valor);
                    setDataMovimentacao(mov.data);
                    setCategoriaSelecionada(mov.categoria_id?.id || "");
                    setTipoCategoria(mov.tipo);
                    localStorage.setItem("movimentacaoId", mov.id);
                    setEditarMovimentacao(true);
                  }}
                  className="bg-[#726AE4] text-[14px] sm:text-[16px] md:text-[18px] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0"
                >
                  EDITAR
                </BotaoEditar>

                <div
                  className="cursor-pointer flex-shrink-0"
                  onClick={() => {
                    localStorage.setItem("movimentacaoId", mov.id);
                    setMovimentacaoSelecionada(mov);
                    setRemoverMovimentacao(true);
                  }}
                >
                  <img
                    src="/Apagar.png"
                    alt="Excluir"
                    className="w-[40px] sm:w-[45px] md:w-[50px] h-[40px] sm:h-[45px] md:h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
