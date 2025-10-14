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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8 rounded-xl">
      {movimentacoes.map((mov, index) => (
        <div key={index}>
          {index === 0 && (
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_50px_50px] px-[10px] py-[15px] bg-[#726AE4] text-[#FFFFFF] font-semibold w-[1700px] h-[50px] translate-x-[90px] font-[Poppins] text-[20px] font-bold border border-[#A1A1A1] rounded-t-[10px]">
              <p>Descrição</p>
              <p>Valor</p>
              <p>Data</p>
              <p>Tipo</p>
              <p>Categoria</p>
              <p>Pago</p>
              <p>Atrasado</p>
            </div>
          )}

          <div
            className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_50px_50px] px-[10px] py-[15px] ${
              index === 0 ? "mt-0 rounded-b-[10px]" : "mt-[40px] rounded-[10px]"
            } ${
              mov.ativa === false ? "bg-[#A49DEB]" : "bg-[#BBE7F6]"
            } text-[#726AE4] font-semibold w-[1700px] h-[50px] translate-x-[90px] font-[Poppins] text-[20px] font-bold border border-[#A1A1A1]`}
            style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)" }}
          >
            <p className="truncate">{mov.descricao}</p>
            <p>R${mov.valor}</p>
            <p>{mov.data}</p>
            <p
              className={`${
                mov.tipo === "DESPESA" ? "text-[#FA0707]" : "text-[#1EB01E]"
              }`}
            >
              {mov.tipo}
            </p>
            <p>{mov.categoria_id?.nome}</p>
            <p
              className={`${
                !mov.pago || mov.atrasado ? "text-[#FA0707]" : "text-[#1EB01E]"
              }`}
            >
              {mov.pago ? "Sim" : "Não"}
            </p>
            <p
              className={`${
                mov.atrasado ? "text-[#FA0707]" : "text-[#1EB01E]"
              }`}
            >
              {mov.atrasado ? "Sim" : "Não"}
            </p>
            <div className="flex gap-[30px] translate-x-[-90px] translate-y-[-12px]">
              <div className="cursor-pointer">
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
                  className="translate-y-[12px] translate-x-[12px] bg-[#726AE4]"
                >
                  EDITAR
                </BotaoEditar>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  localStorage.setItem("movimentacaoId", mov.id);
                  setMovimentacaoSelecionada(mov);
                  setRemoverMovimentacao(true);
                }}
              >
                <img
                  src="../../../public/Apagar.png"
                  alt="Excluir"
                  className="w-[50px] h-[50px] translate-y-[12px] translate-x-[12px]"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
