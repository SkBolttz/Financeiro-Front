import InputMenor from "../../Input/InputMenor.jsx";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal.jsx";
import { BotaoSecundario } from "../../Botao/BotaoSecundario.jsx";

export default function ExcluirFornecedores({
  setExcluirFornecedor,
  setMenuFornecedores,
  deletarFornecedor,
}) {
  // Pega o nome do fornecedor para exibir no input
  const fornecedorNome = localStorage.getItem("fornecedorSalvoNome");
  const fornecedorId = localStorage.getItem("fornecedorSalvoId");

  const handleExcluir = (e) => {
    e.preventDefault();
    if (fornecedorId) {
      deletarFornecedor(Number(fornecedorId)); 
    }
    setExcluirFornecedor(false);
    setMenuFornecedores(true);
  };

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 translate-y-[-170px]">
      <div className="bg-[#726AE4] w-[500px] h-[500px] rounded-[20px]">
        <div className="flex justify-center text-[20px]">
          <h2 className="font-[Poppins] text-[#BBE7F6]">Excluir</h2>
        </div>
        <div className="flex justify-center text-[20px]">
          <h1 className="font-[Antonio] text-[#FFFFFF]">FORNECEDOR</h1>
        </div>
        <div className="flex justify-center font-['Poppins'] text-[14px] mt-[60px] text-[#FFFFFF] text-center">
          <h2>Tem certeza que deseja excluir o fornecedor:</h2>
        </div>
        <div className="flex justify-center pt-[20px]">
          <InputMenor
            type="text"
            disabled
            readOnly
            value={fornecedorNome || ""}
          />
        </div>
        <div className="translate-y-[70px]">
          <div className="mt-[40px] flex justify-between m-[20px]">
            <BotaoSecundario
              className="flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
              onClick={() => {
                setExcluirFornecedor(false);
                setMenuFornecedores(true);
              }}
            >
              CANCELAR
            </BotaoSecundario>

            <BotaoPrincipal
              className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
              onClick={handleExcluir}
            >
              <span>EXCLUIR</span>
            </BotaoPrincipal>
          </div>
        </div>
      </div>
    </div>
  );
}
