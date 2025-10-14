import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import InputMenor from "../../Input/InputMenor";

export default function ExcluirCliente({
  setExcluirCliente,
  setMenuCliente,
  deletarCliente,
}) {
  const nomeCliente = localStorage.getItem("clienteSalvo") || "";
  const clienteId = localStorage.getItem("clienteSalvoId");

  const handleExcluir = () => {
    if (clienteId) {
      deletarCliente(Number(clienteId));
    }
    setExcluirCliente(false);
    setMenuCliente(true);
  };

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 translate-y-[-170px]">
      <div className="bg-[#726AE4] w-[500px] h-[500px] rounded-[20px] p-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="font-[Poppins] text-[#BBE7F6] text-[20px]">Excluir</h2>
          <h1 className="font-[Antonio] text-[#FFFFFF] text-[30px]">CLIENTE</h1>
        </div>

        <div className="text-center font-['Poppins'] text-[14px] mt-[60px] text-[#FFFFFF]">
          <h2>Tem certeza que deseja excluir o cliente:</h2>
        </div>

        <div className="flex justify-center pt-[20px] w-full px-10">
          <InputMenor type="text" disabled readOnly value={nomeCliente} />
        </div>

        <div className="mt-[70px] flex justify-between w-full px-[10px] m-[20px]">
          <BotaoSecundario
            onClick={() => {
              setExcluirCliente(false);
              setMenuCliente(true);
            }}
            className="px-[10px] py-[5px] rounded-[10px] ml-[20px]"
          >
            CANCELAR
          </BotaoSecundario>

          <BotaoPrincipal
            className="mr-[20px] flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
            onClick={handleExcluir}
          >
            EXCLUIR
          </BotaoPrincipal>
        </div>
      </div>
    </div>
  );
}
