import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import InputMedio from "../../Input/InputMedio";
import { useState } from "react";
import axios from "axios";
import { Input } from "postcss";

export default function ModalCadastroLimite({ onClose }) {
  const [limite, setLimite] = useState(null);

  const cadastrarLimite = async () => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await axios.post(
        "https://financeiro-production-2b89.up.railway.app/limite/cadastrar",
        { usuario: { id: usuarioId }, limite: limite, ativo: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();
    } catch (error) {
      console.error(
        "Erro ao cadastrar limite:",
        error.response?.data || error.message
      );
      return null;
    }
  };

  return (
    <div className="w-[500px] h-[500px] bg-[#726AE4] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-[20px] z-50 p-8">
      <div>
        <div className="flex justify-center text-[20px]">
          <h2 className="font-[Poppins] text-[#BBE7F6]">Cadastro de</h2>
        </div>
        <div className="flex justify-center text-[20px]">
          <h1 className="font-[Antonio] text-[#FFFFFF]">LIMITE</h1>
        </div>
      </div>
      <div className="flex justify-center mt-[50px]">
        <label
          htmlFor="descricaoMov"
          className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
        >
          Informe o limite:
        </label>
      </div>
      <div className="flex justify-center mt-[10px]">
        <InputMedio
          type="text"
          id="limiteAtual"
          name="limiteAtual"
          onChange={(e) => setLimite(e.target.value)}
        />
      </div>
      <div className="flex justify-between ml-[40px] mr-[40px] mt-[100px]">
        <div className="flex flex-col items-center">
          <BotaoSecundario
            onClick={onClose}
            className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
          >
            CANCELAR
          </BotaoSecundario>
        </div>
        <div>
          <BotaoPrincipal
            className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
            onClick={(e) => {
              e.preventDefault();
              cadastrarLimite();
            }}
          >
            <span>ADICIONAR</span>
          </BotaoPrincipal>
        </div>
      </div>
    </div>
  );
}
