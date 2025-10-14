import { useState } from "react";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import InputMenor from "../../Input/InputMenor";
import AlertaErro from "../../Alerta/AlertaErro.jsx";

export default function AdicionarCliente({
  setAdicionarCliente,
  setMenuCliente,
  cadastrarCliente,
  setNomeCliente,
  setCnpj,
  setCpf,
  setTelefone,
  setEmail,
  setLogradouro,
  setNumero,
  setBairro,
  setCidade,
  setCep,
  setTipoCliente, // só o setter
}) {
  const [tipo, setTipo] = useState("PJ");
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleAdicionar = () => {
    // Validação de campos obrigatórios usando os setters
    if (!tipo) return showErro("Selecione o tipo de cliente!");

    if (
      tipo === "PJ" &&
      !document.getElementsByName("razaoSocial")[0].value.trim()
    )
      return showErro("Informe a Razão Social!");
    if (
      tipo === "PF" &&
      !document.getElementsByName("razaoSocial")[0].value.trim()
    )
      return showErro("Informe o Nome!");

    const cnpjValue = document.getElementsByName("cnpj")[0]?.value;
    const cpfValue = document.getElementsByName("cpf")[0]?.value;
    const telefoneValue = document.getElementsByName("telefone")[0]?.value;
    const emailValue = document.getElementsByName("email")[0]?.value;
    const logradouroValue = document.getElementsByName("logradouro")[0]?.value;
    const numeroValue = document.getElementsByName("numero")[0]?.value;
    const bairroValue = document.getElementsByName("bairro")[0]?.value;
    const cidadeValue = document.getElementsByName("cidade")[0]?.value;
    const cepValue = document.getElementsByName("cep")[0]?.value;

    if (tipo === "PJ" && (!cnpjValue || cnpjValue.length !== 14))
      return showErro("Informe um CNPJ válido com 14 números!");
    if (tipo === "PF" && (!cpfValue || cpfValue.length !== 11))
      return showErro("Informe um CPF válido com 11 números!");
    if (!telefoneValue) return showErro("Informe o telefone!");
    if (!emailValue) return showErro("Informe o email!");
    if (!logradouroValue) return showErro("Informe o logradouro!");
    if (!numeroValue) return showErro("Informe o número!");
    if (!bairroValue) return showErro("Informe o bairro!");
    if (!cidadeValue) return showErro("Informe a cidade!");
    if (!cepValue) return showErro("Informe o CEP!");

    // Se tudo estiver correto, chama a função de cadastro
    cadastrarCliente();
    setAdicionarCliente(false);
    setMenuCliente(true);
  };

  const showErro = (msg) => {
    setMensagemErro(msg);
    setAlertaErro(true);
    setTimeout(() => setAlertaErro(false), 3000);
  };

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 translate-y-[-190px] overflow-auto">
      {alertaErro && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px] translate-y-[-350px]">
          <AlertaErro mensagem={mensagemErro} />
        </div>
      )}

      <div className="bg-[#726AE4] w-[700px] h-[750px] rounded-[20px] p-6 overflow-auto">
        <div className="text-center">
          <h2 className="font-[Poppins] text-[#BBE7F6] text-[20px]">
            Cadastro de
          </h2>
          <h1 className="font-[Antonio] text-[#FFFFFF] text-[50px]">CLIENTE</h1>
        </div>

        <div className="mt-[20px] mr-[50px] ml-[50px]">
          <div className="flex items-center gap-[10px] mb-[20px]">
            <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
              Tipo:
            </label>
            <select
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
                setTipoCliente(e.target.value);
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
                onChange={(e) => setNomeCliente(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                {tipo === "PJ" ? "CNPJ:" : "CPF:"}
              </label>
              <InputMenor
                type="text"
                name={tipo === "PJ" ? "cnpj" : "cpf"}
                inputMode="numeric"
                maxLength={tipo === "PJ" ? 14 : 11}
                minLength={tipo === "PJ" ? 14 : 11}
                pattern={tipo === "PJ" ? "[0-9]{14}" : "[0-9]{11}"}
                onChange={(e) =>
                  tipo === "PJ"
                    ? setCnpj(e.target.value)
                    : setCpf(e.target.value)
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
                type="tel"
                name="telefone"
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Email:
              </label>
              <InputMenor
                type="email"
                name="email"
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
                onChange={(e) => setLogradouro(e.target.value)}
              />
              <InputMenor
                type="text"
                placeholder="Número"
                name="numero"
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
              <InputMenor
                type="text"
                placeholder="Bairro"
                name="bairro"
                onChange={(e) => setBairro(e.target.value)}
              />
              <InputMenor
                type="text"
                placeholder="Cidade"
                name="cidade"
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
              <InputMenor
                type="text"
                placeholder="CEP"
                name="cep"
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-[20px] mr-[50px] ml-[50px] flex justify-between">
          <BotaoSecundario
            className="flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
            onClick={() => {
              setAdicionarCliente(false);
              setMenuCliente(true);
            }}
          >
            CANCELAR
          </BotaoSecundario>

          <BotaoPrincipal
            className="flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
            onClick={handleAdicionar}
          >
            ADICIONAR
          </BotaoPrincipal>
        </div>
      </div>
    </div>
  );
}
