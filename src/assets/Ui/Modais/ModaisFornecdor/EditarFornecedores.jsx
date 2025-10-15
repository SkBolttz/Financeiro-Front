import { useEffect, useState } from "react";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import InputMenor from "../../Input/InputMenor";
import AlertaErro from "../../Alerta/AlertaErro";

export default function EditarFornecedores({
  setEditarFornecedores,
  setMenuFornecedores,
  editarFornecedorFunc,
}) {
  const [passo, setPasso] = useState(1);

  // Campos
  const [tipoFornecedor, setTipoFornecedor] = useState("PJ");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [pessoaContato, setPessoaContato] = useState("");
  const [observacao, setObservacao] = useState("");

  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const fornecedorId = localStorage.getItem("fornecedorSalvoId");

  const localizarFornecedorId = async () => {
    const token = localStorage.getItem("token");
    const url = `https://financeiro-production-2b89.up.railway.app/fornecedores/buscar/${encodeURIComponent(
      fornecedorId
    )}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Preenche os campos
      setTipoFornecedor(data.tipo || "PJ");
      setRazaoSocial(data.razaoSocial || "");
      setCnpj(data.cnpj || "");
      setCpf(data.cpf || "");
      setTelefone(data.telefone || "");
      setEmail(data.email || "");
      setLogradouro(data.endereco.logradouro || "");
      setNumero(data.endereco.numero || "");
      setBairro(data.endereco.bairro || "");
      setCidade(data.endereco.cidade || "");
      setCep(data.endereco.cep || "");
      setFormaPagamento(data.formaPagamento || "");
      setBanco(data.banco || "");
      setAgencia(data.agencia || "");
      setConta(data.conta || "");
      setPessoaContato(data.pessoaContato || "");
      setObservacao(data.observacao || "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localizarFornecedorId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Validações
  const validarTela1 = () => {
    if (
      !tipoFornecedor ||
      !razaoSocial.trim() ||
      !(tipoFornecedor === "PJ" ? cnpj.trim() : cpf.trim()) ||
      !telefone.trim() ||
      !email.trim() ||
      !logradouro.trim() ||
      !numero.trim() ||
      !bairro.trim() ||
      !cidade.trim() ||
      !cep.trim()
    ) {
      setMensagemErro("Preencha todos os campos obrigatórios da Tela!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return false;
    }
    return true;
  };

  const validarTela2 = () => {
    if (!formaPagamento.trim() || !pessoaContato.trim()) {
      setMensagemErro("Preencha todos os campos obrigatórios da Tela!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return false;
    }
    return true;
  };

  const handleProximoOuEditar = (e) => {
    e.preventDefault();
    if (passo === 1) {
      if (validarTela1()) setPasso(2);
    } else {
      if (validarTela2()) {
        editarFornecedorFunc(Number(fornecedorId), {
          tipo: tipoFornecedor,
          razaoSocial,
          cnpj: tipoFornecedor === "PJ" ? cnpj : null,
          cpf: tipoFornecedor === "PF" ? cpf : null,
          telefone,
          email,
          endereco: { logradouro, numero, bairro, cidade, cep },
          formaPagamento,
          banco,
          agencia,
          conta,
          pessoaContato,
          observacao,
        });
      }
    }
  };

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-60 translate-y-[-170px] overflow-auto">
      {alertaErro && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px] translate-y-[-380px]">
          <AlertaErro mensagem={mensagemErro} />
        </div>
      )}

      <div className="bg-[#726AE4] w-[700px] h-[750px] rounded-[20px] p-6 overflow-auto">
        <div className="text-center">
          <h2 className="text-[#BBE7F6] text-[20px] font-[Poppins]">Editar</h2>
          <h1 className="text-[#FFFFFF] text-[50px] font-[Antonio]">
            FORNECEDOR
          </h1>
        </div>

        {/* PASSO 1 */}
        {passo === 1 && (
          <div className="mt-[20px] mr-[50px] ml-[50px]">
            <div className="flex items-center gap-[10px] mb-[20px]">
              <label className="text-[#BBE7F6] text-[17px]">Tipo:</label>
              <select
                value={tipoFornecedor}
                onChange={(e) => setTipoFornecedor(e.target.value)}
                className="px-[10px] py-[5px] border border-[#BBE7F6] rounded-[10px] text-[#726AE4] font-bold"
              >
                <option value="PJ">Pessoa Jurídica (CNPJ)</option>
                <option value="PF">Pessoa Física (CPF)</option>
              </select>
            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-[10px]">
              <div>
                <label className="text-[#BBE7F6] text-[17px]">
                  Nome / Razão Social:
                </label>
                <InputMenor
                  type="text"
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[#BBE7F6] text-[17px]">
                  {tipoFornecedor === "PJ" ? "CNPJ:" : "CPF:"}
                </label>
                <InputMenor
                  type="text"
                  value={tipoFornecedor === "PJ" ? cnpj : cpf}
                  onChange={(e) =>
                    tipoFornecedor === "PJ"
                      ? setCnpj(e.target.value)
                      : setCpf(e.target.value)
                  }
                  inputMode="numeric"
                  maxLength={tipoFornecedor === "PJ" ? 14 : 11}
                  minLength={tipoFornecedor === "PJ" ? 14 : 11}
                  pattern={tipoFornecedor === "PJ" ? "[0-9]{14}" : "[0-9]{11}"}
                />
              </div>
            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
              <div>
                <label className="text-[#BBE7F6] text-[17px]">Telefone:</label>
                <InputMenor
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[#BBE7F6] text-[17px]">Email:</label>
                <InputMenor
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-[10px]">
              <label className="text-[#BBE7F6] text-[17px]">Endereço:</label>
              <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
                <InputMenor
                  type="text"
                  placeholder="Rua"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                />
                <InputMenor
                  type="text"
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
                <InputMenor
                  type="text"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
                <InputMenor
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
                <InputMenor
                  type="text"
                  placeholder="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* PASSO 2 */}
        {passo === 2 && (
          <div className="mt-[20px] mr-[25px] ml-[25px]">
            <div className="mb-[20px]">
              <label className="text-[#BBE7F6] text-[17px]">
                Forma de pagamento:
              </label>
              <InputMenor
                type="text"
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
                placeholder="Boleto, PIX, Transferência..."
              />
            </div>

            <div className="grid grid-cols-[1fr_1fr_1fr] gap-[10px] mb-[20px]">
              <InputMenor
                type="text"
                value={banco}
                onChange={(e) => setBanco(e.target.value)}
                placeholder="Banco"
              />
              <InputMenor
                type="text"
                value={agencia}
                onChange={(e) => setAgencia(e.target.value)}
                placeholder="Agência"
              />
              <InputMenor
                type="text"
                value={conta}
                onChange={(e) => setConta(e.target.value)}
                placeholder="Conta"
              />
            </div>

            <div className="mb-[20px]">
              <label className="text-[#BBE7F6] text-[17px]">
                Pessoa de contato:
              </label>
              <InputMenor
                type="text"
                value={pessoaContato}
                onChange={(e) => setPessoaContato(e.target.value)}
                placeholder="Nome e cargo"
              />
            </div>

            <div className="mb-[20px]">
              <label className="text-[#BBE7F6] text-[17px]">Observações:</label>
              <InputMenor
                type="text"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Notas ou condições especiais"
              />
            </div>
          </div>
        )}

        {/* BOTÕES */}
        <div className="mt-[20px] mr-[50px] ml-[50px] flex justify-between">
          <BotaoSecundario
            className="flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
            onClick={() => {
              if (passo === 1) {
                setEditarFornecedores(false);
                setMenuFornecedores(true);
              } else {
                setPasso(1);
              }
            }}
          >
            {passo === 1 ? "CANCELAR" : "VOLTAR"}
          </BotaoSecundario>

          <BotaoPrincipal
            className="flex flex-row items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
            onClick={handleProximoOuEditar}
          >
            {passo === 1 ? "PRÓXIMO" : "EDITAR"}
          </BotaoPrincipal>
        </div>
      </div>
    </div>
  );
}
