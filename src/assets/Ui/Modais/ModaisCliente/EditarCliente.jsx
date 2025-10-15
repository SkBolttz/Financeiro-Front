import { useEffect, useState } from "react";
import { BotaoPrincipal } from "../../Botao/BotaoPrincipal";
import { BotaoSecundario } from "../../Botao/BotaoSecundario";
import InputMenor from "../../Input/InputMenor";
import AlertaErro from "../../Alerta/AlertaErro.jsx";
import axios from "axios";

export default function EditarCliente({
  setEditarCliente,
  setMenuCliente,
  editarClienteFunc,
}) {
  const [tipo, setTipo] = useState("PJ");
  const [alertaErro, setAlertaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  // Campos
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");

  const clienteId = localStorage.getItem("clienteSalvoId");

  // Carregar dados do cliente
  const localizarClienteId = async () => {
    const token = localStorage.getItem("token");
    const url = `https://financeiro-production-2b89.up.railway.app/clientes/buscar/${encodeURIComponent(
      clienteId
    )}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      setTipo(data.tipo);
      setNome(data.nome);
      setCnpj(data.cnpj);
      setCpf(data.cpf);
      setTelefone(data.telefone);
      setEmail(data.email);

      if (data.endereco) {
        setLogradouro(data.endereco.logradouro || "");
        setNumero(data.endereco.numero || "");
        setBairro(data.endereco.bairro || "");
        setCidade(data.endereco.cidade || "");
        setCep(data.endereco.cep || "");
      }
    } catch (error) {
      console.error(error);
      showErro("Erro ao carregar dados do cliente!");
    }
  };

  useEffect(() => {
    localizarClienteId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showErro = (msg) => {
    setMensagemErro(msg);
    setAlertaErro(true);
    setTimeout(() => setAlertaErro(false), 3000);
  };

  const handleEditar = () => {
    // Validação de campos
    if (!tipo) return showErro("Selecione o tipo de cliente!");
    if (!nome.trim())
      return showErro(
        tipo === "PJ" ? "Informe a Razão Social!" : "Informe o Nome!"
      );
    if (tipo === "PJ" && (!cnpj || cnpj.length !== 14))
      return showErro("Informe um CNPJ válido com 14 números!");
    if (tipo === "PF" && (!cpf || cpf.length !== 11))
      return showErro("Informe um CPF válido com 11 números!");
    if (!telefone) return showErro("Informe o telefone!");
    if (!email) return showErro("Informe o email!");
    if (!logradouro) return showErro("Informe o logradouro!");
    if (!numero) return showErro("Informe o número!");
    if (!bairro) return showErro("Informe o bairro!");
    if (!cidade) return showErro("Informe a cidade!");
    if (!cep) return showErro("Informe o CEP!");

    editarClienteFunc(Number(clienteId), {
      nome,
      cnpj: tipo === "PJ" ? cnpj : null,
      cpf: tipo === "PF" ? cpf : null,
      telefone,
      email,
      endereco: { logradouro, numero, bairro, cidade, cep },
      tipo,
    });

    setEditarCliente(false);
    setMenuCliente(true);
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
          <h2 className="font-[Poppins] text-[#BBE7F6] text-[20px]">Editar</h2>
          <h1 className="font-[Antonio] text-[#FFFFFF] text-[50px]">CLIENTE</h1>
        </div>

        <div className="mt-[20px] mr-[50px] ml-[50px]">
          {/* Tipo de cliente */}
          <div className="flex items-center gap-[10px] mb-[20px]">
            <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
              Tipo:
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="px-[10px] py-[5px] border border-[#BBE7F6] rounded-[10px] text-[#726AE4] font-bold"
            >
              <option value="PJ">Pessoa Jurídica (CNPJ)</option>
              <option value="PF">Pessoa Física (CPF)</option>
            </select>
          </div>

          {/* Nome / Razão Social e CNPJ/CPF */}
          <div className="grid grid-cols-[2fr_1fr] gap-[10px]">
            <div>
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Nome / Razão Social:
              </label>
              <InputMenor
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                {tipo === "PJ" ? "CNPJ:" : "CPF:"}
              </label>
              <InputMenor
                type="text"
                value={tipo === "PJ" ? cnpj : cpf}
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

          {/* Telefone e Email */}
          <div className="grid grid-cols-[2fr_1fr] gap-[10px] mt-[10px]">
            <div>
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Telefone:
              </label>
              <InputMenor
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
                Email:
              </label>
              <InputMenor
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="mt-[10px]">
            <label className="text-[#BBE7F6] font-['Poppins'] text-[17px]">
              Endereço:
            </label>
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

        {/* Botões */}
        <div className="mt-[20px] mr-[50px] ml-[50px] flex justify-between">
          <BotaoSecundario
            className="flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
            onClick={() => {
              setEditarCliente(false);
              setMenuCliente(true);
            }}
          >
            CANCELAR
          </BotaoSecundario>

          <BotaoPrincipal
            className="flex items-center justify-center gap-2 text-[#726AE4] rounded-[10px] px-6 py-3 font-bold transition-colors bg-[#FEC849]"
            onClick={handleEditar}
          >
            EDITAR
          </BotaoPrincipal>
        </div>
      </div>
    </div>
  );
}
