import Header from "../Componentes/Header.jsx";
import { BotaoSecundario } from "../Ui/BotaoSecundario.jsx";
import { BotaoPrincipal } from "../Ui/BotaoPrincipal.jsx";
import { useState, useEffect } from "react";
import BotaoReceita from "../Ui/BotaoReceita.jsx";
import BotaoDespesa from "../Ui/BotaoDespesa.jsx";
import InputPadrao from "../Ui/InputPadrao.jsx";
import SelectPadrao from "../Ui/SelectPadrao.jsx";
import TabelaMovimentacoes from "../Ui/TabelaMovimentacoes.jsx";
import InputMenor from "../Ui/InputMenor.jsx";
import AlertaSucesso from "../Ui/AlertaSucesso.jsx";
import axios from "axios";

export default function Principal() {
  const [adicionarMovimentacao, setAdicionarMovimentacao] = useState(false);
  const [adicionarCategoria, setAdicionarCategoria] = useState(false);
  const hoje = new Date().toISOString().split("T")[0];
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [tipoCategoria, setTipoCategoria] = useState("");
  const [descricaoMovimentacao, setDescricaoMovimentacao] = useState("");
  const [valorMovimentacao, setValorMovimentacao] = useState("");
  const [dataMovimentacao, setDataMovimentacao] = useState(hoje);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [tabelaMovVazia, setTabelaMovVazia] = useState(false);

  const verificarLogado = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  };

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
      return res.data;
    } catch (error) {
      console.error(
        "Erro ao resgatar usuário:",
        error.response?.data || error.message
      );
      return null;
    }
  };

  const listarCategorias = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:8082/categoria/listar",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const categoriasFormatadas = response.data.map((c) => ({
        value: c.id,
        label: c.nome,
      }));
      setCategorias(categoriasFormatadas);
      if (categoriasFormatadas.length > 0) {
        setCategoriaSelecionada(categoriasFormatadas[0].value);
      }
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
    }
  };

  useEffect(() => {
    listarCategorias();
  }, []);

  const cadastrarCategoria = async (nome, tipo) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8082/categoria/cadastrar",
        { nome, tipo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await listarCategorias();
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
    }
  };

  const cadastrarMovimentacao = async (
    descricaoMovimentacao,
    valorMovimentacao,
    dataMovimentacao,
    categoriaSelecionada,
    tipoCategoria
  ) => {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("usuarioId");
    const url =
      tipoCategoria === "RECEITA"
        ? "http://localhost:8082/movimentacao/adicionar/receita"
        : "http://localhost:8082/movimentacao/adicionar/despesa";

    try {
      await axios.post(
        url,
        {
          descricao: descricaoMovimentacao,
          valor: valorMovimentacao,
          tipo: tipoCategoria,
          data: dataMovimentacao,
          usuario_id: { id: Number(idUser) },
          categoria_id: { id: Number(categoriaSelecionada) },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdicionarMovimentacao(false);

      setDescricaoMovimentacao("");
      setValorMovimentacao("");
      setDataMovimentacao(new Date().toISOString().split("T")[0]);
      setTipoCategoria("");
      setCategoriaSelecionada(categorias.length > 0 ? categorias[0].value : "");

      if (tipoCategoria === "RECEITA") {
        setMensagemSucesso("Receita cadastrada com sucesso!");
      } else {
        setMensagemSucesso("Despesa cadastrada com sucesso!");
      }
      setSucesso(true);

      setTimeout(() => setSucesso(false), 3000);

      await listarMovimentacoes();
    } catch (error) {
      console.error(
        "Erro ao cadastrar movimentação:",
        error.response?.data || error.message
      );
    }
  };

  const listarMovimentacoes = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:8082/movimentacao/listar/todas",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length === 0) {
        setTabelaMovVazia(true);
      }
      setMovimentacoes(response.data);
    } catch (error) {
      console.error("Erro ao listar movimentações:", error);
    }
  };

  useEffect(() => {
    verificarLogado();
    resgatarUsuario();
    listarMovimentacoes();
  }, []);

  return (
    <div className="bg-[#ACBAFF] min-h-screen">
      <div>
        {sucesso && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px]">
            <AlertaSucesso mensagem={mensagemSucesso} />
          </div>
        )}
      </div>
      <Header />

      <div className="flex justify-between">
        <div className="flex justify-start p-[30px]">
          <BotaoSecundario
            className="text-[#FFFFFF] bg-[#726AE4] hover:bg-[#726AE4]"
            onClick={() => setAdicionarMovimentacao(true)}
          >
            ADICIONAR
          </BotaoSecundario>
        </div>

        {!tabelaMovVazia && (
          <div className="flex">
            <div className="flex justify-start p-[30px]">
              <BotaoPrincipal className="flex flex-row items-center justify-center gap-2 text-[#FFFFFF] bg-[#FFCE58]">
                <span>
                  <img src="../../../public/IconVoltar.png" alt="Voltar" />
                </span>
              </BotaoPrincipal>
            </div>
            <div className="flex justify-start p-[30px]">
              <BotaoPrincipal className="flex flex-row items-center justify-center gap-2 text-[#FFFFFF] bg-[#FFCE58]">
                <span>
                  <img src="../../../public/IconSeguir.png" alt="Seguir" />
                </span>
              </BotaoPrincipal>
            </div>
          </div>
        )}

        <div className="flex justify-start p-[30px]">
          <BotaoSecundario
            className="flex flex-row items-center justify-center gap-2 text-[#FFFFFF] bg-[#726AE4]"
            onClick={() => (window.location.href = "")}
          >
            <span>FILTRAR</span>
          </BotaoSecundario>
        </div>
      </div>

      <div>
        <TabelaMovimentacoes movimentacoes={movimentacoes} />
      </div>

      {adicionarMovimentacao && (
        <div className="w-[550px] h-[680px] bg-[#726AE4] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[43%] shadow-lg rounded-[20px] z-50 p-[20px]">
          <div className="flex justify-center text-[20px]">
            <h2 className="font-[Poppins] text-[#BBE7F6]">Cadastro de</h2>
          </div>
          <div className="flex justify-center  text-[30px]">
            <h1 className="font-[Antonio] text-[#FFFFFF]">MOVIMENTAÇÃO</h1>
          </div>

          <div className="flex justify-between m-[10px] pl-[150px] pr-[150px] pt-[10px]">
            <BotaoReceita
              id="botaoReceita"
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

          <div className="flex justify-center pt-[20px]">
            <form>
              <div>
                <label
                  htmlFor="descricaoMov"
                  className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
                >
                  Descrição da Movimentação:
                </label>
                <InputPadrao
                  type="text"
                  id="descricaoMov"
                  name="descricaoMov"
                  value={descricaoMovimentacao}
                  onChange={(e) => setDescricaoMovimentacao(e.target.value)}
                />
              </div>
              <div className="pt-[20px] flex flex-row justify-between">
                <div>
                  <label
                    htmlFor="descricaoMov"
                    className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
                  >
                    Valor:
                  </label>
                  <InputMenor
                    type="number"
                    id="valorMov"
                    name="valorMov"
                    value={valorMovimentacao}
                    onChange={(e) => setValorMovimentacao(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="dataMov"
                    className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
                  >
                    Data:
                  </label>
                  <InputMenor
                    type="date"
                    id="dataMov"
                    name="dataMov"
                    value={dataMovimentacao}
                    onChange={(e) => setDataMovimentacao(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-[20px] flex justify-between">
                <div>
                  <label
                    htmlFor="categoriaMov"
                    className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
                  >
                    Categoria:
                  </label>
                  <SelectPadrao
                    name="categoriaMov"
                    id="categoriaMov"
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    options={categorias}
                  />
                </div>
                <div
                  className="flex w-[60px] h-[60px] bg-[#BBE7F6] rounded-[10px] items-center translate-y-[25px]"
                  onClick={() => setAdicionarCategoria(true)}
                >
                  <img
                    className="flex translate-x-[15px] cursor-pointer"
                    src="../../../public/adicionar.png"
                    alt="Adicionar"
                  />
                </div>
              </div>
              <div className="mt-[40px] flex justify-between">
                <div className="">
                  <BotaoSecundario
                    onClick={() => setAdicionarMovimentacao(false)}
                    className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
                  >
                    <span>CANCELAR</span>
                  </BotaoSecundario>
                </div>
                <div>
                  <BotaoPrincipal
                    className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
                    onClick={(e) => {
                      e.preventDefault();
                      cadastrarMovimentacao(
                        descricaoMovimentacao,
                        valorMovimentacao,
                        dataMovimentacao,
                        categoriaSelecionada,
                        tipoCategoria
                      );
                    }}
                  >
                    <span>ADICIONAR</span>
                  </BotaoPrincipal>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {adicionarCategoria && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[200px] h-[200px] bg-[#959FD2] shadow-lg rounded-[20px] z-50 p-[20px]">
            <div className="flex items-center justify-center mb-[20px]">
              <h2 className="text-[20px] font-bold text-[#FFFFFF]">
                Adicionar Categoria
              </h2>
            </div>
            <input
              type="text"
              id="nome"
              placeholder="Nome da categoria"
              onChange={(e) => setNomeCategoria(e.target.value)}
              className="w-full border rounded px-[5px] py-[5px] mb-[10px] bg-[#BBE7F6] h-[40px]"
            />
            <div className="flex items-center mb-[20px] justify-between">
              <input
                type="radio"
                id="despesa"
                name="tipo"
                value="DESPESA"
                checked={tipoCategoria === "DESPESA"}
                onChange={(e) => setTipoCategoria(e.target.value)}
              />
              <label htmlFor="despesa" className="text-[#FFFFFF] ml-[5px]">
                Despesa
              </label>

              <input
                type="radio"
                id="receita"
                name="tipo"
                value="RECEITA"
                checked={tipoCategoria === "RECEITA"}
                onChange={(e) => setTipoCategoria(e.target.value)}
              />
              <label htmlFor="receita" className="text-[#FFFFFF] ml-[5px]">
                Receita
              </label>
            </div>
            <div className="flex justify-between mt-[20px]">
              <button
                className="bg-[#EB5321] text-[#FFFFFF] font-bold px-[10px] py-[5px] rounded-[3px]"
                onClick={() => setAdicionarCategoria(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-[#4CAF50] text-[#FFFFFF] font-bold px-[10px] py-[5px] rounded-[3px]"
                onClick={() => {
                  cadastrarCategoria(nomeCategoria, tipoCategoria);
                  setAdicionarCategoria(false);
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
