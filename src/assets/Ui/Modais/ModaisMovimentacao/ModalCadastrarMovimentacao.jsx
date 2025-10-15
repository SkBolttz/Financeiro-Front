import { useEffect, useState } from "react";
import BotaoReceita from "../../Botao/BotaoReceita.jsx";
import BotaoDespesa from "../../Botao/BotaoDespesa.jsx";
import InputPadrao from "../../Input/InputPadrao.jsx";
import InputMenor from "../../Input/InputMenor.jsx";
import SelectPadrao from "../../Select/SelectPadrao.jsx";
import { BotaoSecundario } from "../../Botao/BotaoSecundario.jsx";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal.jsx";
import AlertaErro from "../../Alerta/AlertaErro.jsx";
import InputFile from "../../Input/InputFile.jsx";
import axios from "axios";

export default function ModalCadastrarMovimentacao({
  setDescricaoMovimentacao,
  setValorMovimentacao,
  setDataMovimentacao,
  setCategoriaSelecionada,
  setTipoCategoria,
  categorias,
  descricaoMovimentacao = "",
  valorMovimentacao = "",
  dataMovimentacao = "",
  categoriaSelecionada = "",
  tipoCategoria = "",
  onCancelar,
  onAdicionar,
  metodoPagamento,
  setMetodoPagamento,
  clienteSelecionado,
  setClienteSelecionado,
  fornecedorSelecionado,
  setFornecedorSelecionado,
}) {
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState("");
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [periodicidade, setPeriodicidade] = useState("");
  const [anexoEntrada, setAnexoEntrada] = useState(null);
  const [anexoRestante, setAnexoRestante] = useState(null);
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

  const handleProximoStep = () => {
    if (
      !descricaoMovimentacao.trim() ||
      !valorMovimentacao ||
      !dataMovimentacao ||
      !categoriaSelecionada ||
      categoriaSelecionada === "" ||
      !tipoCategoria
    ) {
      setMensagemErro("Todos os campos são obrigatórios!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    if (!metodoPagamento) setMetodoPagamento(metodosPagamento[0].value);
    setStep(2);
  };

  const handleFinalizar = () => {
    if (!metodoPagamento || metodoPagamento === "") {
      setMensagemErro("Selecione um método de pagamento!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return;
    }
    const dadosMovimentacao = {
      tipo: tipoCategoria,
      descricao: descricaoMovimentacao.trim(),
      valor: parseFloat(valorMovimentacao) || 0,
      data: dataMovimentacao,
      categoria: categoriaSelecionada,
      cliente:
        tipoCategoria === "RECEITA" && clienteSelecionado
          ? Number(clienteSelecionado)
          : null,
      fornecedor:
        tipoCategoria === "DESPESA" && fornecedorSelecionado
          ? Number(fornecedorSelecionado)
          : null,
      metodoPagamento,
      tags: tags.trim() || null,
      recorrente: periodicidade ? true : false,
      periodicidade: periodicidade || null,
      comprovanteEntrada: anexoEntrada,
      comprovanteRestante: anexoRestante,
    };
    onAdicionar(dadosMovimentacao);
    setTags("");
    setDescricaoMovimentacao("");
    setValorMovimentacao("");
    setDataMovimentacao("");
    setCategoriaSelecionada("");
    setTipoCategoria("");
    setMetodoPagamento("");
    setPeriodicidade("");
    setAnexoEntrada(null);
    setAnexoRestante(null);
    setClienteSelecionado("");
    setFornecedorSelecionado("");
    setStep(1);
  };

  const handleVoltar = () => {
    setStep(1);
  };

  return (
    <div className="w-[550px] h-[700px] bg-[#726AE4] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[43%] shadow-lg rounded-[20px] z-50 p-[20px]">
      {alertaErro && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px] translate-y-[-150px]">
          <AlertaErro mensagem={mensagemErro} />
        </div>
      )}
      <div className="flex justify-center text-[20px]">
        <h2 className="font-[Poppins] text-[#BBE7F6]">Cadastro de</h2>
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
                onClick={handleProximoStep}
              >
                <span>ADICIONAR</span>
              </BotaoPrincipal>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <label
                htmlFor="metodoPagamento"
                className="text-[#BBE7F6] font-['Poppins'] text-[17px]"
              >
                Método de Pagamento:
              </label>
              <SelectPadrao
                name="metodoPagamento"
                id="metodoPagamento"
                value={metodoPagamento}
                onChange={(e) => setMetodoPagamento(e.target.value)}
                options={metodosPagamento}
              />
            </div>
            {/* Botões de recorrência */}
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
            {/* Anexos */}
            <div className="mt-6">
              <label
                htmlFor="anexoEntrada"
                className="block mb-2 text-[#BBE7F6] font-['Poppins'] text-[17px]"
              >
                Comprovante da Entrada{" "}
                {anexoEntrada?.name ? `- ${anexoEntrada.name}` : ""}
              </label>
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
                Comprovante do Restante{" "}
                {anexoRestante?.name ? `- ${anexoRestante.name}` : ""}
              </label>
              <InputFile
                id="anexoRestante"
                name="anexoRestante"
                onChange={(e) => setAnexoRestante(e.target.files[0])}
              />
            </div>
            <div className="mt-[40px] flex justify-between">
              <BotaoSecundario
                onClick={handleVoltar}
                className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
              >
                <span>VOLTAR</span>
              </BotaoSecundario>
              <BotaoPrincipal
                className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
                onClick={handleFinalizar}
              >
                <span>ADICIONAR</span>
              </BotaoPrincipal>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
