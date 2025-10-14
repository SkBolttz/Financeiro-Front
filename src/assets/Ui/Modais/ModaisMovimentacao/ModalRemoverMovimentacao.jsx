import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import InputMenor from "../../Input/InputMenor";

export default function ModalRemoverMovimentacao({
  movimentacaoSelecionada,
  setRemoverMovimentacao,
  onRemover,
}) {
  return (
    <div className="w-[500px] h-[500px] bg-[#726AE4] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-[20px] z-50 p-8">
      <div className="flex justify-center text-[20px]">
        <h2 className="font-[Poppins] text-[#BBE7F6]">Excluir</h2>
      </div>
      <div className="flex justify-center text-[20px]">
        <h1 className="font-[Antonio] text-[#FFFFFF]">MOVIMENTAÇÃO</h1>
      </div>
      <div className="flex justify-center font-['Poppins'] text-[12px] mt-[60px] text-[#FFFFFF]">
        <h2>Tem certeza que deseja excluir a movimentação:</h2>
      </div>

      {/* Input */}
      <div className="flex justify-center mt-[30px]">
        <InputMenor
          type="text"
          disabled
          value={movimentacaoSelecionada?.descricao}
        />
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-[100px] ml-[40px]">
        <BotaoSecundario
          onClick={() => setRemoverMovimentacao(false)}
          className="px-6 py-3 rounded-[10px] bg-[#BBE7F6] hover:bg-[#ABB9FE] mr-[40px]"
        >
          CANCELAR
        </BotaoSecundario>

        <BotaoPrincipal
          onClick={() => {
            onRemover();
            setRemoverMovimentacao(false);
          }}
          className="px-6 py-3 rounded-[10px] bg-[#FEC94B] hover:bg-[#ABB9FE] mr-[40px]"
        >
          EXCLUIR
        </BotaoPrincipal>
      </div>
    </div>
  );
}
