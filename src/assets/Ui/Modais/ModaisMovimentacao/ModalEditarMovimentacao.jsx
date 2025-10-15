import { useEffect, useState } from "react";
import BotaoReceita from "../../Botao/BotaoReceita.jsx";
import BotaoDespesa from "../../Botao/BotaoDespesa.jsx";
import InputPadrao from "../../Input/InputPadrao.jsx";
import InputMenor from "../../Input/InputMenor.jsx";
import SelectPadrao from "../../Select/SelectPadrao.jsx";
import { BotaoSecundario } from "../../Botao/BotaoSecundario.jsx";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal.jsx";
import CheckboxPadrao from "../../Checkbox/CheckboxPadrao.jsx";
import InputFile from "../../Input/InputFile.jsx";
import AlertaErro from "../../Alerta/AlertaErro.jsx";
import axios from "axios";

export default function ModalEditarMovimentacao({
  descricaoMovimentacao,
  setDescricaoMovimentacao,
  valorMovimentacao,
  setValorMovimentacao,
  dataMovimentacao,
  setDataMovimentacao,
  categoriaSelecionada,
  setCategoriaSelecionada,
  categorias,
  tipoCategoria,
  setTipoCategoria,
  metodoPagamento,
  setMetodoPagamento,
  tags,
  setTags,
  periodicidade,
  setPeriodicidade,
  anexoEntrada,
  setAnexoEntrada,
  anexoRestante,
  setAnexoRestante,
  movPaga,
  setMovPaga,
  setClienteSelecionado,
  setFornecedorSelecionado,
  clienteSelecionado,
  fornecedorSelecionado,
  onCancelar,
  onAdicionar,
}) {
  const [step, setStep] = useState(1);
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [clientes, setClientes] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const metodosPagamento = [
    { label: "PIX", value: "PIX" },
    { label: "BOLETO", value: "BOLETO" },
    { label: "DINHEIRO", value: "DINHEIRO" },
    { label: "CARTAO_CREDITO", value: "CARTAO_CREDITO" },
    { label: "CARTAO_DEBITO", value: "CARTAO_DEBITO" },
    { label: "TRANSFERENCIA", value: "TRANSFERENCIA" },
    { label: "DEPOSITO", value: "DEPOSITO" },
    { label: "CHEQUE", value: "CHEQUE" },
    { label: "OUTROS", value: "OUTROS" },
  ];

  const handleProximoStep = () => setStep(2);
  const handleVoltar = () => setStep(1);

  // --- Validações ---
  const validarStep1 = () => {
    if (
      !descricaoMovimentacao ||
      !valorMovimentacao ||
      !dataMovimentacao ||
      !categoriaSelecionada ||
      !tipoCategoria
    ) {
      setAlertaErro(true);
      setMensagemErro("Por favor, preencha todos os campos obrigatórios!");
      setTimeout(() => setAlertaErro(false), 3000);
      return false;
    }
    return true;
  };

  const validarStep2 = () => {
    if (!metodoPagamento) {
      setAlertaErro(true);
      setMensagemErro("Selecione o método de pagamento!");
      setTimeout(() => setAlertaErro(false), 3000);
      return false;
    }
    return true;
  };

  // --- Listagem de clientes e fornecedores ---
  const listarClientes = async () => {
    const token = localStorage.getItem("token");
    const url = "https://financeiro-production-2b89.up.railway.app/clientes/listar/ativos";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const clientesFormatados = response.data.map((f) => ({
        value: f.id,
        label: f.nome,
      }));
      setClientes(clientesFormatados);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
    }
  };

  const listarFornecedores = async () => {
    const token = localStorage.getItem("token");
    const url = "https://financeiro-production-2b89.up.railway.app/fornecedores/listar/ativos";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fornecedoresFormatados = response.data.map((f) => ({
        value: f.id,
        label: f.razaoSocial,
      }));
      setFornecedores(fornecedoresFormatados);
    } catch (error) {
      console.error("Erro ao listar fornecedores:", error);
    }
  };

  useEffect(() => {
    listarClientes();
    listarFornecedores();
  }, []);

  const resgatarMovimentacaoPorID = async () => {
    try {
      const token = localStorage.getItem("token");
      const idMov = localStorage.getItem("movimentacaoId");
      const url = `https://financeiro-production-2b89.up.railway.app/movimentacao/listar/movimentacao/${encodeURIComponent(
        idMov
      )}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      setDescricaoMovimentacao(data.descricao || "");
      setValorMovimentacao(data.valor || "");
      setDataMovimentacao(data.data || "");
      setCategoriaSelecionada(data.categoriaId || "");
      setTipoCategoria(data.tipo || "");
      setMetodoPagamento(data.tipoPagamento || "");
      setTags(data.tags || []);
      setPeriodicidade(data.periodicidade || "");
      setAnexoEntrada(data.comprovanteEntrada || null);
      setAnexoRestante(data.comprovanteRestante || null);

      setMovPaga(!!data.pago);

      if (data.tipo === "RECEITA") {
        setClienteSelecionado(data.clienteSelecionado?.id || "");
        setFornecedorSelecionado("");
      } else if (data.tipo === "DESPESA") {
        setFornecedorSelecionado(data.fornecedorSelecionado?.id || "");
        setClienteSelecionado("");
      }
    } catch (error) {
      console.error("Erro ao buscar movimentação:", error);
      setAlertaErro(true);
      setMensagemErro(
        error.response?.data?.message ||
          error.message ||
          "Erro ao buscar movimentação"
      );
      setTimeout(() => setAlertaErro(false), 3000);
    }
  };

  useEffect(() => {
    const movimentacaoId = localStorage.getItem("movimentacaoId");
    if (movimentacaoId) {
      resgatarMovimentacaoPorID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[550px] h-[700px] bg-[#726AE4] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[43%] shadow-lg rounded-[20px] z-50 p-[20px]">
      {alertaErro && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px] translate-y-[-150px]">
          <AlertaErro mensagem={mensagemErro} />
        </div>
      )}

      <div className="flex justify-center text-[20px]">
        <h2 className="font-[Poppins] text-[#BBE7F6]">EDITAR</h2>
      </div>
      <div className="flex justify-center text-[30px]">
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

      <form className="pt-[20px]">
        {step === 1 && (
          <>
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
                onChange={(e) => setDescricaoMovimentacao(e.target.value)}
                value={descricaoMovimentacao}
              />
            </div>

            <div className="pt-[20px] flex flex-row justify-between">
              <div>
                <label
                  htmlFor="valorMov"
                  className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
                >
                  Valor:
                </label>
                <InputMenor
                  type="number"
                  id="valorMov"
                  name="valorMov"
                  onChange={(e) => setValorMovimentacao(e.target.value)}
                  value={valorMovimentacao}
                />
              </div>

              <div className="mr-[30px]">
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
                  onChange={(e) => setDataMovimentacao(e.target.value)}
                  value={dataMovimentacao}
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

              {tipoCategoria === "RECEITA" && (
                <div className="mr-[30px]">
                  <label
                    htmlFor="cliente"
                    className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
                  >
                    Cliente:
                  </label>
                  <SelectPadrao
                    name="cliente"
                    id="cliente"
                    value={clienteSelecionado}
                    onChange={(e) => setClienteSelecionado(e.target.value)}
                    options={clientes}
                  />
                </div>
              )}

              {tipoCategoria === "DESPESA" && (
                <div className="mr-[30px]">
                  <label
                    htmlFor="fornecedor"
                    className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
                  >
                    Fornecedor:
                  </label>
                  <SelectPadrao
                    name="fornecedor"
                    id="fornecedor"
                    value={fornecedorSelecionado}
                    onChange={(e) => setFornecedorSelecionado(e.target.value)}
                    options={fornecedores}
                  />
                </div>
              )}
            </div>

            <div className="mt-[40px] flex justify-between">
              <BotaoSecundario
                onClick={onCancelar}
                className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
              >
                <span>CANCELAR</span>
              </BotaoSecundario>
              <BotaoPrincipal
                className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
                onClick={() => {
                  if (validarStep1()) handleProximoStep();
                }}
              >
                <span>AVANÇAR</span>
              </BotaoPrincipal>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <label
              htmlFor="metodoPagamento"
              className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
            >
              Método de Pagamento:
            </label>
            <div className="flex justify-between">
              <SelectPadrao
                name="metodoPagamento"
                id="metodoPagamento"
                value={metodoPagamento || ""}
                onChange={(e) => setMetodoPagamento(e.target.value)}
                options={metodosPagamento}
              />
              <div className="translate-x-[-200px] translate-y-[15px]">
                <CheckboxPadrao
                  label="Pago"
                  checked={movPaga ?? false}
                  onChange={(e) => setMovPaga(e.target.checked)}
                />
              </div>
            </div>

            <div className="pt-[20px]">
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Lançamento recorrente:
              </label>
              <div className="flex gap-4 mt-2">
                {["DIARIO", "SEMANAL", "MENSAL", "ANUAL"].map((periodo) => (
                  <button
                    type="button"
                    key={periodo}
                    className={`px-[10px] py-[5px] rounded border-none ${
                      periodicidade === periodo
                        ? "bg-[#BBE7F6] text-[#726AE4] border-2 border-[#726AE4]"
                        : "bg-[#726AE4] text-white"
                    }`}
                    onClick={() => setPeriodicidade(periodo)}
                  >
                    {periodo === "DIARIO" && "Diário"}
                    {periodo === "SEMANAL" && "Semanal"}
                    {periodo === "MENSAL" && "Mensal"}
                    {periodo === "ANUAL" && "Anual"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="anexoEntrada"
                className="block mb-2 text-[#BBE7F6] font-['Poppins'] text-[17px]"
              >
                Comprovante da Entrada
              </label>
              {anexoEntrada && typeof anexoEntrada === "string" && (
                <a
                  href={`https://financeiro-production-2b89.up.railway.app/${anexoEntrada}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFFFFF] mr-[20px] no-underline hover:text-[#BBE7F6]"
                >
                  Baixar comprovante
                </a>
              )}
              <InputFile
                id="anexoEntrada"
                name="anexoEntrada"
                onChange={(e) => setAnexoEntrada(e.target.files[0])}
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="anexoRestante"
                className="block mb-2 text-[#BBE7F6] font-['Poppins'] text-[17px]"
              >
                Comprovante do Restante
              </label>
              {anexoRestante && typeof anexoRestante === "string" && (
                <a
                  href={`https://financeiro-production-2b89.up.railway.app/${anexoRestante}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFFFFF] mr-[20px] no-underline hover:text-[#BBE7F6]"
                >
                  Baixar comprovante
                </a>
              )}
              <InputFile
                id="anexoRestante"
                name="anexoRestante"
                onChange={(e) => setAnexoRestante(e.target.files[0])}
              />
            </div>

            <div className="mt-[10px] flex justify-between">
              <BotaoSecundario
                onClick={handleVoltar}
                className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
              >
                <span>VOLTAR</span>
              </BotaoSecundario>
              <BotaoPrincipal
                className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
                onClick={() => {
                  if (validarStep2()) {
                    onAdicionar({
                      id: localStorage.getItem("movimentacaoId"),
                      descricaoMovimentacao,
                      valorMovimentacao,
                      dataMovimentacao,
                      categoriaSelecionada,
                      tipoCategoria,
                      metodoPagamento,
                      tags,
                      periodicidade,
                      anexoEntrada,
                      anexoRestante,
                      movPaga,
                      clienteSelecionado:
                        tipoCategoria === "RECEITA" ? clienteSelecionado : null,
                      fornecedorSelecionado:
                        tipoCategoria === "DESPESA"
                          ? fornecedorSelecionado
                          : null,
                    });
                  }
                }}
              >
                <span>EDITAR</span>
              </BotaoPrincipal>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
