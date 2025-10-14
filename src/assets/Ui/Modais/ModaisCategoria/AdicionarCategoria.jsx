import { useState } from "react";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import BotaoReceita from "../../Botao/BotaoReceita";
import BotaoDespesa from "../../Botao/BotaoDespesa";
import InputMenor from "../../Input/InputMenor";
import AlertaErro from "../../Alerta/AlertaErro.jsx";

export default function AdicionarCategoria({
  setAdicionarCategoria,
  setMenuCategorias,
  cadastrarCategoria,
  nomeCategoria,
  setNomeCategoria,
  tipoCategoria,
  setTipoCategoria,
  setAdicionarMovimentacao,
}) {
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleAdicionar = (e) => {
    e.preventDefault();
    if (!tipoCategoria) {
      setMensagemErro("Selecione o tipo da categoria (Receita ou Despesa)!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    if (!nomeCategoria.trim()) {
      setMensagemErro("Digite a descrição da categoria!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    cadastrarCategoria(nomeCategoria, tipoCategoria);
    setAdicionarCategoria(false);
    setNomeCategoria("");
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
          <h2 className="font-[Poppins] text-[#BBE7F6]">Cadastro de</h2>
        </div>
        <div className="flex justify-center text-[20px]">
          <h1 className="font-[Antonio] text-[#FFFFFF]">CATEGORIA</h1>
        </div>
        <div className="flex justify-between m-[10px] p-[40px]">
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
        <div className="translate-y-[-30px]">
          <div className="flex justify-center">
            <label
              htmlFor="descricaoMov"
              className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
            >
              Descrição da Categoria:
            </label>
          </div>
          <div className="flex justify-center">
            <InputMenor
              type="text"
              id="descricaoMov"
              name="descricaoMov"
              value={nomeCategoria}
              onChange={(e) => setNomeCategoria(e.target.value)}
            />
          </div>
          <div className="mt-[40px] flex justify-between m-[20px]">
            <BotaoSecundario
              onClick={() => {
                setAdicionarCategoria(false);
                setMenuCategorias(true);
                setAdicionarMovimentacao(true);
              }}
              className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
            >
              <span>CANCELAR</span>
            </BotaoSecundario>
            <BotaoPrincipal
              className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
              onClick={handleAdicionar}
            >
              <span>ADICIONAR</span>
            </BotaoPrincipal>
          </div>
        </div>
      </div>
    </div>
  );
}
