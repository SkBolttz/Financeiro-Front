import SelectPadrao from "../../Select/SelectPadrao";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import { useState, useEffect } from "react";
import AlertaErro from "../../Alerta/AlertaErro";

export default function MenuCliente({
  clientes = [],
  setAdicionarCliente,
  setExcluirCliente,
  setEditarCliente,
  setMenuCliente,
}) {
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    if (clientes.length > 0) {
      setClienteSelecionado(clientes[0].value);
    }
  }, [clientes]);

  const handleAdicionar = () => {
    setAdicionarCliente(true);
    setMenuCliente(false);
  };

  const handleExcluir = () => {
    if (!clienteSelecionado) {
      setMensagemErro("Selecione um cliente antes de excluir!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    const clienteObj = clientes.find((c) => c.value === clienteSelecionado);
    if (!clienteObj) return;
    localStorage.setItem("clienteSalvo", clienteObj.label);
    localStorage.setItem("clienteSalvoId", clienteObj.value);
    setExcluirCliente(true);
    setMenuCliente(false);
  };

  const handleEditar = () => {
    if (!clienteSelecionado) {
      setMensagemErro("Selecione um cliente antes de editar!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    const clienteObj = clientes.find((c) => c.value === clienteSelecionado);
    if (!clienteObj) return;
    localStorage.setItem("clienteSalvo", clienteObj.label);
    localStorage.setItem("clienteSalvoId", clienteObj.value);
    setEditarCliente(true);
    setMenuCliente(false);
  };

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 translate-y-[-170px]">
      {alertaErro && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px] translate-y-[-350px]">
          <AlertaErro mensagem={mensagemErro} />
        </div>
      )}

      <div className="bg-[#726AE4] w-[500px] h-[500px] rounded-[20px]">
        <div className="pt-[10px]">
          <div className="flex justify-center text-[20px]">
            <h2 className="font-[Poppins] text-[#BBE7F6]">Cadastro de</h2>
          </div>
          <div className="flex justify-center text-[30px]">
            <h1 className="font-[Antonio] text-[#FFFFFF]">CLIENTES</h1>
          </div>
        </div>

        {/* Select Cliente */}
        <div className="pt-[10px] text-center">
          <label className="text-[#BBE7F6] font-[Poppins] text-[17px]">
            Cliente:
          </label>
          <div className="flex justify-center pt-2">
            <SelectPadrao
              name="cliente"
              id="cliente"
              value={clienteSelecionado}
              onChange={(e) => setClienteSelecionado(Number(e.target.value))}
              options={clientes}
            />
          </div>
        </div>

        {/* Botões Ação */}
        <div className="flex justify-between pt-[30px] ml-[50px] mr-[50px]">
          <div
            className="w-[75px] h-[75px] bg-[#BBE7F6] rounded-[20px] cursor-pointer flex items-center justify-center"
            onClick={handleAdicionar}
          >
            <img
              src="../../../public/Adicionar.png"
              alt="Adicionar"
              className="w-[50px] h-[50px]"
            />
          </div>

          <div
            className="w-[75px] h-[75px] bg-[#BBE7F6] rounded-[20px] cursor-pointer flex items-center justify-center"
            onClick={handleExcluir}
          >
            <img
              src="../../../public/Apagar.png"
              alt="Excluir"
              className="w-[50px] h-[50px]"
            />
          </div>

          <div
            className="w-[75px] h-[75px] bg-[#BBE7F6] rounded-[20px] cursor-pointer flex items-center justify-center"
            onClick={handleEditar}
          >
            <img
              src="../../../public/Editar.png"
              alt="Editar"
              className="w-[50px] h-[50px]"
            />
          </div>
        </div>

        {/* Botão Cancelar */}
        <div className="flex justify-center pt-[50px]">
          <BotaoSecundario
            onClick={() => setMenuCliente(false)}
            className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
          >
            CANCELAR
          </BotaoSecundario>
        </div>
      </div>
    </div>
  );
}
