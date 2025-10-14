import { useState } from "react";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import InputMenor from "../../Input/InputMenor";
import AlertaErro from "../../Alerta/AlertaErro";

export default function AdicionarFornecedor({
  setAdicionarFornecedor,
  setMenuFornecedores,
  cadastrarFornecedor,
  setRazaoSocial,
  setCnpj,
  setCpf,
  setTelefone,
  setEmail,
  setLogradouro,
  setNumero,
  setBairro,
  setCidade,
  setCep,
  setFormaPagamento,
  setBanco,
  setAgencia,
  setConta,
  setPessoaContato,
  setObservacao,
  setTipoFornecedor,
}) {
  const [passo, setPasso] = useState(1);
  const [tipoFornecedor, setTipo] = useState("PJ");
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const validarTela1 = () => {
    if (
      !tipoFornecedor ||
      !(
        (tipoFornecedor === "PJ" &&
          (document.querySelector('[name="cnpj"]')?.value || "").trim()) ||
        (tipoFornecedor === "PF" &&
          (document.querySelector('[name="cpf"]')?.value || "").trim())
      ) ||
      !document.querySelector('[name="razaoSocial"]')?.value.trim() ||
      !document.querySelector('[name="telefone"]')?.value.trim() ||
      !document.querySelector('[name="email"]')?.value.trim() ||
      !document.querySelector('[name="logradouro"]')?.value.trim() ||
      !document.querySelector('[name="numero"]')?.value.trim() ||
      !document.querySelector('[name="bairro"]')?.value.trim() ||
      !document.querySelector('[name="cidade"]')?.value.trim() ||
      !document.querySelector('[name="cep"]')?.value.trim()
    ) {
      setMensagemErro("Preencha todos os campos obrigatórios da Tela!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return false;
    }
    return true;
  };

  const validarTela2 = () => {
    if (
      !document.querySelector('[name="formaPagamento"]')?.value.trim() ||
      !document.querySelector('[name="contato"]')?.value.trim()
    ) {
      setMensagemErro("Preencha todos os campos obrigatórios da Tela!");
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
      return false;
    }
    return true;
  };

  const handleProximoOuAdicionar = (e) => {
    e.preventDefault();
    if (passo === 1) {
      if (validarTela1()) setPasso(2);
    } else {
      if (validarTela2()) {
        cadastrarFornecedor();
        setAdicionarFornecedor(false);
        setMenuFornecedores(true);
      }
    }
  };

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 translate-y-[-190px] overflow-auto">
      {alertaErro && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px] translate-y-[-380px]">
          <AlertaErro mensagem={mensagemErro} />
        </div>
      )}
      <div className="bg-[#726AE4] w-[700px] h-[750px] rounded-[20px] p-6 overflow-auto">
        <div className="text-center">
          <h2 className="font-[Poppins] text-[#BBE7F6] text-[20px]">
            Cadastro de
          </h2>
          <h1 className="font-[Antonio] text-[#FFFFFF] text-[50px]">
            FORNECEDOR
          </h1>
        </div>

        {passo === 1 && (
          <div className="mt-[20px] mr-[50px] ml-[50px]">
            <div className="flex items-center gap-[10px] mb-[20px]">
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Tipo:
              </label>
              <select
                value={tipoFornecedor}
                onChange={(e) => {
                  setTipo(e.target.value);
                  setTipoFornecedor(e.target.value);
                }}
                className="px-[10px] py-[5px] border border-[#BBE7F6] rounded-[10px] text-[#726AE4] font-bold"
              >
                <option value="PJ">Pessoa Jurídica (CNPJ)</option>
                <option value="PF">Pessoa Física (CPF)</option>
              </select>
            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-[10px]">
              <div>
                <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                  Nome / Razão Social:
                </label>
                <InputMenor
                  type="text"
                  name="razaoSocial"
                  onChange={(e) => setRazaoSocial(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                  {tipoFornecedor === "PJ" ? "CNPJ:" : "CPF:"}
                </label>
                <InputMenor
                  type="text"
                  name={tipoFornecedor === "PJ" ? "cnpj" : "cpf"}
                  maxLength={tipoFornecedor === "PJ" ? 14 : 11}
                  pattern="[0-9]*"
                  onChange={(e) =>
                    tipoFornecedor === "PJ"
                      ? setCnpj(e.target.value.replace(/\D/g, ""))
                      : setCpf(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
              <div>
                <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                  Telefone:
                </label>
                <InputMenor
                  type="text"
                  name="telefone"
                  maxLength={11}
                  pattern="[0-9]*"
                  onChange={(e) =>
                    setTelefone(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
              <div>
                <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                  Email:
                </label>
                <InputMenor
                  type="email"
                  name="email"
                  maxLength={100}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-[10px]">
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Endereço:
              </label>
              <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
                <InputMenor
                  type="text"
                  placeholder="Rua"
                  name="logradouro"
                  maxLength={100}
                  onChange={(e) => setLogradouro(e.target.value)}
                />
                <InputMenor
                  type="text"
                  placeholder="Número"
                  name="numero"
                  maxLength={6}
                  pattern="[0-9]*"
                  onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
                <InputMenor
                  type="text"
                  placeholder="Bairro"
                  name="bairro"
                  maxLength={50}
                  onChange={(e) => setBairro(e.target.value)}
                />
                <InputMenor
                  type="text"
                  placeholder="Cidade"
                  name="cidade"
                  maxLength={50}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>
              <div className="mt-[10px]">
                <InputMenor
                  type="text"
                  placeholder="CEP"
                  name="cep"
                  maxLength={8}
                  pattern="[0-9]*"
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
          </div>
        )}

        {passo === 2 && (
          <div className="mt-[20px] mr-[25px] ml-[25px]">
            <div className="mb-[20px]">
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Forma de pagamento:
              </label>
              <InputMenor
                type="text"
                placeholder="Boleto, PIX, Transferência..."
                name="formaPagamento"
                maxLength={50}
                onChange={(e) => setFormaPagamento(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-[1fr_1fr_1fr] gap-[10px] mb-[20px]">
              <InputMenor
                type="text"
                placeholder="Banco"
                name="banco"
                maxLength={50}
                onChange={(e) => setBanco(e.target.value)}
              />
              <InputMenor
                type="text"
                placeholder="Agência"
                name="agencia"
                maxLength={10}
                pattern="[0-9]*"
                onChange={(e) => setAgencia(e.target.value.replace(/\D/g, ""))}
              />
              <InputMenor
                type="text"
                placeholder="Conta"
                name="conta"
                maxLength={15}
                pattern="[0-9]*"
                onChange={(e) => setConta(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <div className="mb-[20px]">
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Pessoa de contato:
              </label>
              <InputMenor
                type="text"
                name="contato"
                placeholder="Nome e cargo"
                maxLength={100}
                onChange={(e) => setPessoaContato(e.target.value)}
              />
            </div>

            <div className="mb-[20px]">
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Observações:
              </label>
              <InputMenor
                type="text"
                name="observacoes"
                placeholder="Notas ou condições especiais"
                maxLength={200}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="mt-[20px] mr-[50px] ml-[50px] flex justify-between">
          <BotaoSecundario
            onClick={() => {
              if (passo === 1) {
                setAdicionarFornecedor(false);
                setMenuFornecedores(true);
              } else {
                setPasso(1);
              }
            }}
            className="flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#BBE7F6]"
          >
            {passo === 1 ? "CANCELAR" : "VOLTAR"}
          </BotaoSecundario>

          <BotaoPrincipal
            onClick={handleProximoOuAdicionar}
            className="flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
          >
            {passo === 1 ? "PRÓXIMO" : "ADICIONAR"}
          </BotaoPrincipal>
        </div>
      </div>
    </div>
  );
}
