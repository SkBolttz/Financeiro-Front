import { useState } from "react";
import SelectPadrao from "../../Select/SelectPadrao";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import AlertaErro from "../../Alerta/AlertaErro.jsx";

export default function MenuCategorias({
  categorias,
  categoriaSelecionada,
  setCategoriaSelecionada,
  setAdicionarCategoria,
  setExcluirCategoria,
  setEditarCategoria,
  setMenuCategorias,
}) {
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleExcluir = () => {
    if (!categoriaSelecionada) {
      setMensagemErro("Selecione uma categoria antes de excluir!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    const categoriaObj = categorias.find(
      (c) => c.value === categoriaSelecionada
    );
    if (categoriaObj)
      localStorage.setItem("categoriaSalva", categoriaObj.label);
    setExcluirCategoria(true);
    setMenuCategorias(false);
  };

  const handleEditar = () => {
    if (!categoriaSelecionada) {
      setMensagemErro("Selecione uma categoria antes de editar!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    const categoriaObj = categorias.find(
      (c) => c.value === categoriaSelecionada
    );
    if (categoriaObj) {
      localStorage.setItem("categoriaSalva", categoriaObj.label);
      localStorage.setItem("categoriaId", categoriaObj.value);
    }
    setEditarCategoria(true);
    setMenuCategorias(false);
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
            <h1 className="font-[Antonio] text-[#FFFFFF]">CATEGORIAS</h1>
          </div>
        </div>

        <div className="pt-[10px]">
          <div className="flex justify-center">
            <label
              htmlFor="categoriaMov"
              className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
            >
              Categoria:
            </label>
          </div>
          <div className="flex justify-center">
            <SelectPadrao
              name="categoriaMov"
              id="categoriaMov"
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(Number(e.target.value))}
              options={categorias}
            />
          </div>
        </div>

        <div className="flex justify-between pt-[30px] ml-[50px] mr-[50px]">
          <div
            className="w-[75px] h-[75px] bg-[#BBE7F6] rounded-[20px] cursor-pointer"
            onClick={() => {
              setAdicionarCategoria(true);
              setMenuCategorias(false);
            }}
          >
            <img
              src="/Adicionar.png"
              alt="Adicionar"
              className="w-[50px] h-[50px] translate-y-[12px] translate-x-[12px]"
            />
          </div>

          <div
            className="w-[75px] h-[75px] bg-[#BBE7F6] rounded-[20px] cursor-pointer"
            onClick={handleExcluir}
          >
            <img
              src="/Apagar.png"
              alt="Excluir"
              className="w-[50px] h-[50px] translate-y-[12px] translate-x-[12px]"
            />
          </div>

          <div
            className="w-[75px] h-[75px] bg-[#BBE7F6] rounded-[20px] cursor-pointer"
            onClick={handleEditar}
          >
            <img
              src="/public/Editar.png"
              alt="Editar"
              className="w-[50px] h-[50px] translate-y-[12px] translate-x-[12px]"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-center translate-y-[50px]">
            <BotaoSecundario
              onClick={() => setMenuCategorias(false)}
              className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
            >
              <span>CANCELAR</span>
            </BotaoSecundario>
          </div>
        </div>
      </div>
    </div>
  );
}
