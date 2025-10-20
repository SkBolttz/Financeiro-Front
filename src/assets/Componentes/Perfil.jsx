import Header from "./Header";
import { BotaoSecundario } from "../Ui/Botao/BotaoSecundario";
import axios from "axios";
import { useEffect, useState } from "react";
import { TabelaTransacoes } from "../Ui/Tabela/TabelaTransacoes.jsx";
import ModalCadastroLimite from "../Ui/Modais/ModaisLimite/ModalCadastroLimite.jsx";

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [limiteAtual, setLimiteAtual] = useState(null);
  const [modalLimite, setModalLimite] = useState(false);

  const resgatarUsuario = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    try {
      const res = await axios.post(
        "https://financeiro-production-2b89.up.railway.app/usuario/resgatar/usuario",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("usuarioId", res.data.id);
      setUsuario(res.data);
    } catch (error) {
      console.error(
        "Erro ao resgatar usuário:",
        error.response?.data || error.message
      );
      return null;
    }
  };

  const resgatarLimiteAtual = async () => {
    try {
      const response = await axios.get(
        "https://financeiro-production-2b89.up.railway.app/limite/listar/limite/cliente",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLimiteAtual(response.data?.limite || 0);
    } catch (error) {
      console.error("Erro ao resgatar despesas: ", error);
    }
  };

  useEffect(() => {
    resgatarUsuario();
    resgatarLimiteAtual();
  }, []);

  return (
    <div className="bg-[#ACBAFF] min-h-screen w-full font-[Poppins] py-10 overflow-x-hidden">
      <Header />

      <div className="bg-[#FFFFFF] rounded-[20px] p-[10px] mx-auto max-w-[95%] sm:max-w-[1700px] flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg relative mt-[30px]">
        <div
          className="bg-[#726AE4] w-[130px] h-[130px] flex items-center justify-center rounded-full flex-shrink-0 shadow-md 
                  -translate-y-10 md:translate-y-[30px] md:translate-x-[50px]"
        >
          <h1 className="text-[#FFFFFF] text-[50px]">
            {usuario?.nome?.charAt(0) || "?"}
          </h1>
        </div>
        <div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left 
                  -translate-y-5 md:translate-y-[-70px] md:translate-x-[200px]"
        >
          <h2 className="font-[Poppins] text-2xl md:text-3xl font-bold">
            {usuario?.nome}
          </h2>
          <p className="font-[Poppins] mt-[10px] text-base text-gray-700">
            📧 {usuario?.email}
          </p>
        </div>
        <div
          className="flex justify-center md:justify-end w-full md:w-auto mt-[20px] md:mt-0 
                  md:translate-y-[-130px] md:mr-[50px] md:flex-none"
        >
          <BotaoSecundario className="bg-[#726AE4] text-[#FFFFFF] font-[Poppins] w-full md:w-[400px] hover:bg-[#97a9fc] transition-all duration-200">
            <span className="text-[25px]">Configurações da Conta</span>
          </BotaoSecundario>
        </div>
      </div>

      <div
        className="bg-[#726AE4] rounded-[20px] p-[10px] mx-auto mt-[30px] max-w-[95%] sm:max-w-[1700px] 
            flex flex-col md:flex-col justify-start md:justify-start text-white shadow-lg relative 
            -translate-y-10 md:translate-y-[-170px] h-auto md:h-[300px]"
      >
        <div className="pt-[30px] ml-[40px] mr-[40px] flex flex-col flex-1">
          <div className="flex justify-between items-center w-full">
            <span className="font-[Poppins] text-[40px] sm:text-[25px] font-semibold text-[#FFFFFF]">
              💷 SALDO ATUAL
            </span>
            <span
              className="font-[Poppins] text-base sm:text-[20px] 
                           border border-white rounded-[10px] px-[10px] py-[1px] text-[#FFFFFF]"
            >
              Conta Principal
            </span>
          </div>
          <span className="font-[Poppins] text-[30px] sm:text-[20px] mt-[20px] text-[#FFFFFF]">
            Seu Patrimônio Líquido
          </span>
          <span className="font-[Poppins] text-[50px] sm:text-[70px] font-bold mt-2 text-[#FFFFFF]">
            R$ {usuario?.saldo || "0,00"}
          </span>
        </div>

        <div className="border-t border-[#FFFFFF] ml-[40px] mr-[40px] mt-4 md:mt-auto"></div>

        <div className="ml-[40px] mr-[40px] pt-[25px] pb-[30px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <span className="font-[Poppins] text-[20px] sm:text-[20px] mb-2 md:mb-0 text-[#FFFFFF]">
              Limite de Crédito Disponível: R$ {limiteAtual || "0,00"}
            </span>

            <div className="cursor-pointer">
              <span
                className="font-[Poppins] text-[20px] sm:text-[20px] underline hover:text-gray-200 transition-colors text-[#FFFFFF]"
                onClick={() => {
                  setModalLimite(true);
                }}
              >
                Alterar Limite mensal
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 mx-auto mt-6 max-w-[95%] sm:max-w-[1700px] -translate-y-5 md:translate-y-[-220px] ml-[40px]">
        <div className="bg-[#FFFFFF] rounded-[20px] shadow-md hover:shadow-lg transition-shadow flex-1 w-full md:w-[530px] md:h-[190px] p-[10px] mt-[20px]">
          <div className="pt-[25px] flex justify-between">
            <span className="font-[Poppins] text-[20px] font-semibold ml-[40px]">
              Acesso e Segurança
            </span>
            <span className="mr-[40px]">🔑</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[15px] text-gray-600">
              Último Acesso
            </span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[30px] font-bold">
              {localStorage.getItem("horaLogin")}
            </span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-[20px] shadow-md hover:shadow-lg transition-shadow flex-1 w-full md:w-[530px] md:h-[190px] p-[10px] mt-[20px]">
          <div className="pt-[25px] flex justify-between">
            <span className="font-[Poppins] text-[20px] font-semibold ml-[40px]">
              Início da Jornada
            </span>
            <span className="mr-[40px]">🗓️</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[15px] text-gray-600">
              Membro Desde
            </span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[30px] font-bold">
              {usuario?.dataCadastro || "—"}
            </span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-[20px] shadow-md hover:shadow-lg transition-shadow flex-1 w-full md:w-[530px] md:h-[190px] p-[10px] mt-[20px]">
          <div className="pt-[25px] flex justify-between">
            <span className="font-[Poppins] text-[20px] font-semibold ml-[40px]">
              Meus Cartões
            </span>
            <span className="mr-[40px]">💳</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[15px] text-gray-600">
              Status Geral
            </span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[30px] font-bold">
              3 Cartões Ativos
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-[20px] p-[10px] mx-auto mt-[20px] max-w-[95%] sm:max-w-[1700px] shadow-lg -translate-y-5 md:translate-y-[-140px]">
        <div className="flex justify-center mt-[20px]">
          <h3 className="font-[Poppins] text-[20px]">Transações Recentes</h3>
        </div>
        <div className="p-4 md:p-[40px]">
          <TabelaTransacoes />
        </div>
      </div>

      {modalLimite && (
        <ModalCadastroLimite
          onClose={() => {
            setModalLimite(false);
            resgatarLimiteAtual();
          }}
        />
      )}
    </div>
  );
}
