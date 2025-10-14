import { useState } from "react";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import BotaoReceita from "../../Botao/BotaoReceita";
import BotaoDespesa from "../../Botao/BotaoDespesa";
import InputMenor from "../../Input/InputMenor";
import AlertaErro from "../../Alerta/AlertaErro.jsx";

export default function EditarCategoria({
  setEditarCategoria,
  setMenuCategorias,
  editarCategoriaF,
  categoriaInput,
  setCategoriaInput,
  tipoCategoria,
  setTipoCategoria,
}) {
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleEditar = (e) => {
    e.preventDefault();
    if (!tipoCategoria) {
      setMensagemErro("Selecione o tipo da categoria (Receita ou Despesa)!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    if (!categoriaInput.trim()) {
      setMensagemErro("Digite a descrição da categoria!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    editarCategoriaF();
    setEditarCategoria(false);
    setMenuCategorias(true);
    setCategoriaInput("");
  };

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 translate-y-[-170px]">
      {alertaErro && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px] translate-y-[-350px]">
          <AlertaErro mensagem={mensagemErro} />
        </div>
      )}
      <div className="bg-[#726AE4] w-[500px] h-[500px] rounded-[20px]">
        <div className="flex justify-center text-[20px]">
          <h2 className="font-[Poppins] text-[#BBE7F6]">Editar</h2>
        </div>
        <div className="flex justify-center text-[20px]">
          <h1 className="font-[Antonio] text-[#FFFFFF]">CATEGORIA</h1>
        </div>
        <div className="flex justify-center mt-[20px] text-[#FFFFFF]">
          <label className="font-['Poppins'] text-[14px]">
            Informe o novo nome:
          </label>
        </div>
        <div className="flex justify-center pt-[20px]">
          <InputMenor
            type="text"
            value={categoriaInput}
            onChange={(e) => setCategoriaInput(e.target.value)}
          />
        </div>
        <div className="flex justify-center mt-[40px] text-[#FFFFFF]">
          <label className="font-['Poppins'] text-[14px]">
            Informe o novo tipo:
          </label>
        </div>
        <div className="flex justify-between mr-[120px] ml-[120px] mt-[10px]">
          <BotaoReceita
            className={`flex flex-row items-center justify-center gap-2 text-[#FFFFFF] rounded-[10px] px-6 py-3 font-bold transition-colors ${
              tipoCategoria === "RECEITA"
                ? "bg-[#4CAF50]"
                : "bg-gray-400 opacity-60"
            }`}
            onClick={() => setTipoCategoria("RECEITA")}
          >
            <span>RECEITA</span>
          </BotaoReceita>
          <BotaoDespesa
            className={`flex flex-row items-center justify-center gap-2 text-[#FFFFFF] rounded-[10px] px-6 py-3 font-bold transition-colors ${
              tipoCategoria === "DESPESA"
                ? "bg-[#E53935]"
                : "bg-gray-400 opacity-60"
            }`}
            onClick={() => setTipoCategoria("DESPESA")}
          >
            <span>DESPESA</span>
          </BotaoDespesa>
        </div>
        <div className="translate-y-[30px]">
          <div className="mt-[10px] flex justify-between m-[20px]">
            <BotaoSecundario
              onClick={() => {
                setEditarCategoria(false);
                setMenuCategorias(true);
              }}
              className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
            >
              <span>CANCELAR</span>
            </BotaoSecundario>
            <BotaoPrincipal
              className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
              onClick={handleEditar}
            >
              <span>EDITAR</span>
            </BotaoPrincipal>
          </div>
        </div>
      </div>
    </div>
  );
}
