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
        "http://localhost:8082/usuario/resgatar/usuario",
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
        "http://localhost:8082/limite/listar/limite/cliente",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data === null) {
        setLimiteAtual(0);
      } else {
        setLimiteAtual(response.data.limite);
      }
    } catch (error) {
      console.error("Erro ao resgatar despesas: ", error);
    }
  };

  useEffect(() => {
    resgatarUsuario();
    resgatarLimiteAtual();
  }, []);

  return (
    <div className="bg-[#ACBAFF] min-h-screen overflow-hidden">
      <Header />

      {/* Card do Usuário */}
      <div className="w-[1700px] h-[200px] bg-[#FFFFFF] p-[10px] m-[100px] rounded-[20px] translate-y-[-80px]">
        <div className="bg-[#726AE4] w-[130px] h-[130px] flex items-center justify-center rounded-full translate-y-[30px] translate-x-[50px]">
          <h1 className="text-[#FFFFFF] text-[50px]">
            {usuario?.nome?.charAt(0) || "?"}
          </h1>
        </div>
        <div className="translate-y-[-70px] translate-x-[200px]">
          <h2 className="font-[Poppins]">{usuario?.nome}</h2>
          <p className="font-[Poppins] mt-[10px]">📧 {usuario?.email}</p>
        </div>
        <div className="flex items-center justify-end translate-y-[-130px] mr-[50px]">
          <BotaoSecundario className="bg-[#726AE4] text-[#FFFFFF] font-[Poppins] w-[400px] hover:bg-[#97a9fc]">
            <span className="text-[25px]">Configurações da Conta</span>
          </BotaoSecundario>
        </div>
      </div>

      <div className="w-[1700px] h-[300px] bg-[#726AE4] p-[10px] m-[100px] rounded-[20px] translate-y-[-170px]">
        <div className="pt-[30px] ml-[40px] flex flex-col">
          <div className="flex justify-between mr-[40px]">
            <span className="font-[Poppins] text-[25px] text-[#FFFFFF]">
              💷 SALDO ATUAL
            </span>
            <span className="font-[Poppins] text-[20px] text-[#FFFFFF] border-[1px] border-[#FFFFFF] rounded-[10px] px-[10px]">
              Conta Principal
            </span>
          </div>
          <span className="font-[Poppins] text-[20px] text-[#FFFFFF] mt-[20px]">
            Seu Patrimônio Líquido
          </span>
          <span className="font-[Poppins] text-[70px] text-[#FFFFFF]">
            R$ {usuario?.saldo || "0,00"}
          </span>
        </div>
        <div className="border-t-[1px] border-[#FFFFFF] ml-[40px] mr-[40px]">
          <div className="pt-[25px] flex justify-between">
            <span className="font-[Poppins] text-[20px] text-[#FFFFFF]">
              Limite de Crédito Disponível: R$ {limiteAtual || "0,00"}
            </span>
            <div className="cursor-pointer">
              <span
                className="font-[Poppins] text-[20px] text-[#FFFFFF] "
                onClick={() => (
                  setLimiteAtual(limiteAtual), setModalLimite(true)
                )}
              >
                Alterar Limite mensal
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between translate-y-[-220px]">
        <div className="w-[530px] h-[190px] bg-[#FFFFFF] rounded-[20px] ml-[100px]">
          <div className="pt-[25px] flex justify-between">
            <span className="font-[Poppins] text-[20px] ml-[40px]">
              Acesso e Segurança
            </span>
            <span className="mr-[40px]">🔑</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[15px]">Último Acesso</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[30px] font-bold">
              {localStorage.getItem("horaLogin")}
            </span>
          </div>
        </div>

        <div className="w-[530px] h-[190px] bg-[#FFFFFF] rounded-[20px]">
          <div className="pt-[25px] flex justify-between">
            <span className="font-[Poppins] text-[20px] ml-[40px]">
              Início da Jornada
            </span>
            <span className="mr-[40px]">🗓️</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[15px]">Membro Desde</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[30px] font-bold">
              {usuario?.dataCadastro || "—"}
            </span>
          </div>
        </div>

        <div className="w-[530px] h-[190px] bg-[#FFFFFF] rounded-[20px] mr-[100px]">
          <div className="pt-[25px] flex justify-between">
            <span className="font-[Poppins] text-[20px] ml-[40px]">
              Meus Cartões
            </span>
            <span className="mr-[40px]">💳</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[15px]">Status Geral</span>
          </div>
          <div className="pt-[15px] ml-[40px]">
            <span className="font-[Poppins] text-[30px] font-bold">
              3 Cartões Ativos
            </span>
          </div>
        </div>
      </div>

      <div className="translate-y-[-140px]">
        <div className="w-full max-w-[1700px] mx-auto bg-[#FFFFFF] p-[10px] my-[20px] mx-[50px] rounded-[20px]">
          <div className="flex justify-center mt-[20px]">
            <span className="font-[Poppins] text-[20px]">
              Transações Recentes
            </span>
          </div>
          <div className="p-[40px]">
            <TabelaTransacoes />
          </div>
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
