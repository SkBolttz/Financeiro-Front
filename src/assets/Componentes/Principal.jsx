import Header from "../Componentes/Header.jsx";
import { BotaoSecundario } from "../Ui/Botao/BotaoSecundario.jsx";
import { BotaoPrincipal } from "../Ui/Botao/BotaoPrincipal.jsx";
import { useState, useEffect } from "react";
import TabelaMovimentacoes from "../Ui/Tabela/TabelaMovimentacoes.jsx";
import AlertaSucesso from "../Ui/Alerta/AlertaSucesso.jsx";
import axios from "axios";
import ModalMovimentacao from "../Ui/Modais/ModaisMovimentacao/ModalCadastrarMovimentacao.jsx";
import AdicionarCategoria from "../Ui/Modais/ModaisCategoria/AdicionarCategoria.jsx";
import ModalEditarMovimentacao from "../Ui/Modais/ModaisMovimentacao/ModalEditarMovimentacao.jsx";
import ModalRemoverMovimentacao from "../Ui/Modais/ModaisMovimentacao/ModalRemoverMovimentacao.jsx";
import ModalFiltros from "../Ui/Modais/ModaisFiltro/ModalFiltros.jsx";
import AlertaVencimento from "../Ui/Alerta/AlertaVencimento.jsx";
import AlertaLimiteAtingido from "../Ui/Alerta/AlertaLimiteAtingido.jsx";
import MenuCategorias from "../Ui/Modais/ModaisCategoria/MenuCategorias.jsx";
import ExcluirCategoria from "../Ui/Modais/ModaisCategoria/ExcluirCategoria.jsx";
import EditarCategoria from "../Ui/Modais/ModaisCategoria/EditarCategoria.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import MenuFornecedores from "../Ui/Modais/ModaisFornecdor/MenuFornecedores.jsx";
import AdicionarFornecedor from "../Ui/Modais/ModaisFornecdor/AdicionarFornecedores.jsx";
import EditarFornecedor from "../Ui/Modais/ModaisFornecdor/EditarFornecedores.jsx";
import ExcluirFornecedor from "../Ui/Modais/ModaisFornecdor/ExcluirFornecedores.jsx";
import MenuCliente from "../Ui/Modais/ModaisCliente/MenuCliente.jsx";
import AdicionarCliente from "../Ui/Modais/ModaisCliente/AdicionarCliente.jsx";
import ExcluirCliente from "../Ui/Modais/ModaisCliente/ExcluirCliente.jsx";
import EditarCliente from "../Ui/Modais/ModaisCliente/EditarCliente.jsx";
import AlertaErro from "../Ui/Alerta/AlertaErro.jsx";

export default function Principal() {
  const [movimentacaoSelecionada, setMovimentacaoSelecionada] = useState(null);
  const [editarMovimentacao, setEditarMovimentacao] = useState(false);
  const [removerMovimentacao, setRemoverMovimentacao] = useState(false);
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
  const [contarPaginas, setContarPaginas] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [filtroAtual, setFiltroAtual] = useState({});
  const [modalFiltroAberto, setModalFiltroAberto] = useState(false);
  const [alertas, setAlertas] = useState([]);
  const [limiteAtingido, setLimiteAtingido] = useState(false);
  const [menuCategorias, setMenuCategorias] = useState(false);
  const [excluirCategoria, setExcluirCategoria] = useState(false);
  const [editarCategoria, setEditarCategoria] = useState(false);
  const [categoriaInput, setCategoriaInput] = useState("");
  const [menuFornecedores, setMenuFornecedores] = useState(false);
  const [adicionarFornecedor, setAdicionarFornecedor] = useState(false);
  const [editarFornecedor, setEditarFornecedor] = useState(false);
  const [excluirFornecedor, setExcluirFornecedor] = useState(false);
  const [menuClientes, setMenuClientes] = useState(false);
  const [adicionarCliente, setAdicionarCliente] = useState(false);
  const [editarCliente, setEditarCliente] = useState(false);
  const [excluirCliente, setExcluirCliente] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);
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
  const [tipoFornecedor, setTipoFornecedor] = useState("PJ");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [clientes, setClientes] = useState([]);
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoCliente, setTipoCliente] = useState("PJ");
  const [mensagemErro, setMensagemErro] = useState("");
  const [alertaErro, setAlertaErro] = useState(false);
  const [periodicidade, setPeriodicidade] = useState("");
  const [tags, setTags] = useState("");
  const [anexoEntrada, setAnexoEntrada] = useState(null);
  const [anexoRestante, setAnexoRestante] = useState(null);
  const [movPaga, setMovPaga] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  {
    /* Parte relacionada ao usuário */
  }
  const verificarLogado = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  };

  {
    /* Parte relacionada ao usuário */
  }
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

      localStorage.setItem("nomeUsuario", res.data.nome);
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

  {
    /* Parte relacionada ao usuário */
  }
  useEffect(() => {
    verificarLogado();
    resgatarUsuario();
  }, []);

  {
    /* Parte relacionada as categorias */
  }
  const listarCategoriasAtivas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://financeiro-production-2b89.up.railway.app/categoria/listar/ativas",
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
        tipo: c.tipo,
      }));
      setCategorias(categoriasFormatadas);
      if (categoriasFormatadas.length > 0) {
        setCategoriaSelecionada(categoriasFormatadas[0].value);
      }
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
    }
  };

  {
    /* Parte relacionada as categorias */
  }
  const listarCategorias = async (tipoCategoria) => {
    const token = localStorage.getItem("token");
    const url =
      tipoCategoria === "RECEITA"
        ? "https://financeiro-production-2b89.up.railway.app/categoria/listar/receita/ativas"
        : "https://financeiro-production-2b89.up.railway.app/categoria/listar/despesa/ativas";

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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

  {
    /* Parte relacionada as categorias */
  }
  const cadastrarCategoria = async (nome, tipo) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://financeiro-production-2b89.up.railway.app/categoria/cadastrar",
        { nome, tipo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagemSucesso("Categoria cadastrada com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      await listarCategoriasAtivas();
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem ||
        "Já existe uma categoria com esse nome e tipo";
      setMensagemErro(mensagem);
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 4000);
    }
  };

  {
    /* Parte relacionada as categorias */
  }
  const removerCategoria = async () => {
    const token = localStorage.getItem("token");
    const nomeCategoria = localStorage.getItem("categoriaSalva");
    try {
      await axios.put(
        "https://financeiro-production-2b89.up.railway.app/categoria/remover",
        { nome: nomeCategoria },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagemSucesso("Categoria removida com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      await listarCategoriasAtivas();
    } catch (error) {
      console.error("Erro ao remover categoria:", error);
    }
  };

  {
    /* Parte relacionada as categorias */
  }
  const editarCategoriaF = async () => {
    const token = localStorage.getItem("token");
    const idCategoria = localStorage.getItem("categoriaId");
    try {
      await axios.put(
        "https://financeiro-production-2b89.up.railway.app/categoria/editar",
        { id: idCategoria, nome: categoriaInput, tipo: tipoCategoria },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagemSucesso("Categoria editada com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      await listarCategoriasAtivas();
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem ||
        "Já existe uma categoria com esse nome e tipo.";
      setMensagemErro(mensagem);
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 4000);
    }
  };

  {
    /* Parte relacionada as categorias */
  }
  useEffect(() => {
    if (tipoCategoria) {
      listarCategorias(tipoCategoria);
    }
  }, [tipoCategoria]);

  useEffect(() => {
    if (editarCategoria) {
      const categoriaSalva = localStorage.getItem("categoriaSalva");
      setCategoriaInput(categoriaSalva || "");
    }
  }, [editarCategoria]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modal = params.get("modal");

    if (modal === "categorias") {
      setMenuCategorias(true);
      listarCategoriasAtivas();
      navigate("/principal", { replace: true });
    }

    if (modal === "fornecedores") {
      setMenuFornecedores(true);
      listarFornecedores();
      navigate("/principal", { replace: true });
    }

    if (modal === "clientes") {
      setMenuClientes(true);
      listarClientes();
      navigate("/principal", { replace: true });
    }
  }, [location.search, navigate]);

  const cadastrarMovimentacao = async (dados) => {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("usuarioId");

    const url =
      dados.tipo === "RECEITA"
        ? "https://financeiro-production-2b89.up.railway.app/movimentacao/adicionar/receita"
        : "https://financeiro-production-2b89.up.railway.app/movimentacao/adicionar/despesa";

    const formData = new FormData();

    const movimentacaoPayload = {
      descricao: dados.descricao,
      valor: dados.valor,
      tipo: dados.tipo,
      data: dados.data,
      tipoPagamento: dados.metodoPagamento,
      usuario_id: { id: Number(idUser) },
      categoria_id: { id: Number(dados.categoria) },
      lancamentoRecorrente: dados.recorrente || false,
      periodicidade: dados.periodicidade || null,
      cliente: dados.cliente ? { id: Number(dados.cliente) } : null,
      fornecedor: dados.fornecedor ? { id: Number(dados.fornecedor) } : null,
    };

    console.log("Payload final:", movimentacaoPayload);

    formData.append(
      "movimentacao",
      new Blob([JSON.stringify(movimentacaoPayload)], {
        type: "application/json",
      })
    );

    if (dados.comprovanteEntrada)
      formData.append("comprovanteEntrada", dados.comprovanteEntrada);
    if (dados.comprovanteRestante)
      formData.append("comprovanteRestante", dados.comprovanteRestante);

    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setAdicionarMovimentacao(false);
      setDescricaoMovimentacao("");
      setValorMovimentacao("");
      setDataMovimentacao(new Date().toISOString().split("T")[0]);
      setTipoCategoria("");
      setCategoriaSelecionada(categorias.length > 0 ? categorias[0].value : "");
      setMetodoPagamento("");
      setPeriodicidade("");
      setMensagemSucesso(
        dados.tipo === "RECEITA"
          ? "Receita cadastrada com sucesso!"
          : "Despesa cadastrada com sucesso!"
      );
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

  const alterarMovimentacao = async (dados) => {
    const token = localStorage.getItem("token");
    const url =
      dados.tipo === "RECEITA"
        ? "https://financeiro-production-2b89.up.railway.app/movimentacao/editar/receita"
        : "https://financeiro-production-2b89.up.railway.app/movimentacao/editar/despesa";

    try {
      const movimentacao = {
        id: Number(dados.id),
        descricao: dados.descricao || null,
        valor: dados.valor !== undefined ? Number(dados.valor) : null,
        data: dados.data || null,
        tipo: dados.tipo || null,
        usuario_id: dados.usuarioId ? Number(dados.usuarioId) : null,
        categoria_id: dados.categoria ? { id: Number(dados.categoria) } : null,
        tipoPagamento: dados.metodoPagamento || null,
        tags: dados.tags || null,
        lancamentoRecorrente: !!dados.recorrente,
        periodicidade: dados.periodicidade || null,
        dataFimRecorrencia: dados.dataFimRecorrencia || null,
        totalRecorrencias: dados.totalRecorrencias
          ? Number(dados.totalRecorrencias)
          : null,
        pago: !!dados.movPaga,
        cliente: dados.cliente ? { id: Number(dados.cliente) } : null,
        fornecedor: dados.fornecedor ? { id: Number(dados.fornecedor) } : null,
      };
      const formData = new FormData();
      formData.append(
        "movimentacao",
        new Blob([JSON.stringify(movimentacao)], { type: "application/json" })
      );

      // arquivos (opcionais)
      if (dados.comprovanteEntrada) {
        formData.append("comprovanteEntrada", dados.comprovanteEntrada); // File ou Blob
      }
      if (dados.comprovanteRestante) {
        formData.append("comprovanteRestante", dados.comprovanteRestante);
      }

      // DEBUG útil: lista os pares — ajuda a ver se o JSON e os arquivos foram adicionados
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // NÃO setar Content-Type: axios vai inserir o boundary automaticamente
      await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEditarMovimentacao(false);
      setMensagemSucesso(
        dados.tipo === "RECEITA"
          ? "Receita alterada com sucesso!"
          : "Despesa alterada com sucesso!"
      );
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      await listarMovimentacoes();
    } catch (error) {
      console.error(
        "Erro ao alterar movimentação:",
        error.response?.data || error.message
      );
    }
  };

  const apagarMovimentacao = async (movimentacaoSelecionada) => {
    const token = localStorage.getItem("token");
    const idMovimentacao = movimentacaoSelecionada.id;
    const tipoCategoria = movimentacaoSelecionada.tipo;

    const url =
      tipoCategoria === "RECEITA"
        ? "https://financeiro-production-2b89.up.railway.app/movimentacao/remover/receita"
        : "https://financeiro-production-2b89.up.railway.app/movimentacao/remover/despesa";

    try {
      await axios.put(
        url,
        {
          id: idMovimentacao,
          usuario: { id: Number(localStorage.getItem("usuarioId")) },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagemSucesso("Movimentação removida com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      await listarMovimentacoes();
    } catch (error) {
      console.error("Erro ao remover movimentação:", error);
    }
  };

  const listarMovimentacoes = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("usuarioId");
    const endpoints = {
      TODAS_MOVIMENTACOES: "/listar/todas",
      TODAS_RECEITAS: "/listar/receita",
      TODAS_DESPESAS: "/listar/despesa",
      TODAS_RECEITAS_ATIVAS: "/listar/receitas/ativas",
      TODAS_RECEITAS_INATIVAS: "/listar/receitas/inativas",
      TODAS_DESPESAS_ATIVAS: "/listar/despesas/ativas",
      TODAS_DESPESAS_INATIVAS: "/listar/despesas/inativas",
      TODAS_DESPESAS_PAGAS: "/listar/despesas/pagas",
      TODAS_DESPESAS_ATRASADAS: "/listar/despesas/atrasadas",
      TODAS_MOVIMENTACOES_ATIVAS: "/listar/todas/movimentacoes/ativas",
      TODAS_MOVIMENTACOES_INATIVAS: "/listar/todas/movimentacoes/inativas",
    };

    const url = `https://financeiro-production-2b89.up.railway.app/movimentacao${
      endpoints[filtroAtual] || "/listar/todas"
    }`;

    try {
      const response = await axios.get(url, {
        params: {
          userId: userId,
          page: contarPaginas,
          size: 5,
          sort: "data,desc",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMovimentacoes(response.data.content);
      setTotalPaginas(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao listar movimentações:", error);
    }
  };

  const alertaVencimentos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://financeiro-production-2b89.up.railway.app/alerta/verificar/vencimento/amanha",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlertas((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Erro ao alertar vencimentos:", error);
    }
  };

  const alterarVencimento = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://financeiro-production-2b89.up.railway.app/alerta/alterar/vencimento/despesa",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertas((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Erro ao alertar vencimentos:", error);
    }
  };

  const avisoLimiteAtingido = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://financeiro-production-2b89.up.railway.app/limite/verificar/limite",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLimiteAtingido(response.data);
    } catch (error) {
      console.error("Erro ao alertar vencimentos:", error);
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

  const cadastrarFornecedor = async () => {
    const token = localStorage.getItem("token");
    const url = "https://financeiro-production-2b89.up.railway.app/fornecedores/adicionar";

    try {
      await axios.post(
        url,
        {
          razaoSocial,
          cnpj,
          cpf,
          telefone,
          email,
          endereco: { logradouro, numero, bairro, cidade, cep },
          formaPagamento,
          banco,
          agencia,
          conta,
          pessoaContato,
          observacao,
          tipo: tipoFornecedor,
          usuario: { id: localStorage.getItem("usuarioId") },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagemSucesso("Fornecedor cadastrado com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      listarFornecedores();
    } catch (error) {
      let msg = "Fornecedor com este CPF ou CNPJ já cadastrado!";
      if (error.response && error.response.data) {
        msg = error.response.data.message || msg;
      }

      setMensagemErro(msg);
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
    }
  };

  const deletarFornecedor = async (idFornecedor) => {
    const token = localStorage.getItem("token");

    const url = `https://financeiro-production-2b89.up.railway.app/fornecedores/desativar/${idFornecedor}`;
    try {
      await axios.put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensagemSucesso("Fornecedor deletado com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      listarFornecedores();
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
    }
  };

  const editarFornecedorFunc = async (idFornecedor, fornecedor) => {
    const token = localStorage.getItem("token");
    const url = `https://financeiro-production-2b89.up.railway.app/fornecedores/editar/${idFornecedor}`;

    try {
      await axios.put(url, fornecedor, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMensagemSucesso("Fornecedor editado com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      setEditarFornecedor(false);
      setMenuFornecedores(true);
      listarFornecedores();
    } catch (error) {
      let msg = "Fornecedor com este CPF ou CNPJ já cadastrado!";
      if (error.response && error.response.data) {
        msg = error.response.data.message || msg;
      }

      setMensagemErro(msg);
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 3000);
    }
  };

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

  const cadastrarCliente = async () => {
    const token = localStorage.getItem("token");
    const url = "https://financeiro-production-2b89.up.railway.app/clientes/adicionar";

    try {
      await axios.post(
        url,
        {
          nome: nomeCliente,
          cnpj: cnpj,
          cpf: cpf,
          telefone: telefone,
          email: email,
          endereco: {
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
          },
          tipo: tipoCliente,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagemSucesso("Cliente cadastrado com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      listarClientes();
    } catch (error) {
      setMensagemErro(
        error.response?.data?.message ||
          "Cliente com este CPF ou CNPJ já cadastrado."
      );
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 4000);
    }
  };

  const deletarCliente = async (idCliente) => {
    const token = localStorage.getItem("token");

    const url = `https://financeiro-production-2b89.up.railway.app/clientes/desativar/${idCliente}`;
    try {
      await axios.put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensagemSucesso("Cliente deletado com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      listarClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const editarClienteFunc = async (idCliente, cliente) => {
    const token = localStorage.getItem("token");
    const url = `https://financeiro-production-2b89.up.railway.app/clientes/editar/${idCliente}`;

    try {
      await axios.put(url, cliente, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMensagemSucesso("Cliente editado com sucesso!");
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
      setEditarCliente(false);
      setMenuClientes(true);
      listarClientes();
    } catch (error) {
      setMensagemErro(
        error.response?.data?.message ||
          "Cliente com este CPF ou CNPJ já cadastrado."
      );
      setAlertaErro(true);
      setTimeout(() => setAlertaErro(false), 4000);
    }
  };

  useEffect(() => {
    listarClientes();
  }, []);

useEffect(() => {
  alertaVencimentos();
  alterarVencimento();

  const jaAvisou = localStorage.getItem("avisouLimite");

  if (!jaAvisou) {
    avisoLimiteAtingido();
    localStorage.setItem("avisouLimite", "true");
  }
}, []);

  useEffect(() => {
    listarMovimentacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contarPaginas, adicionarMovimentacao]);

  useEffect(() => {
    listarMovimentacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contarPaginas, adicionarMovimentacao, filtroAtual]);

  return (
    <div className="bg-[#ACBAFF] min-h-screen">
      <div>
        {sucesso && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px]">
            <AlertaSucesso mensagem={mensagemSucesso} />
          </div>
        )}
        {alertaErro && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[300px] h-[100px]">
            <AlertaErro mensagem={mensagemErro} />
          </div>
        )}
        <AlertaVencimento alertas={alertas} duracao={5000} />
        <AlertaLimiteAtingido
          limiteAtingido={limiteAtingido}
          duracao={5000}
          usuario={localStorage.getItem("nomeUsuario")}
        />
      </div>

      <Header />
      <div className="flex justify-between">
        <div className="flex justify-start p-[30px]">
          <BotaoSecundario
            className="text-[#FFFFFF] bg-[#726AE4] hover:bg-[#726AE4]"
            onClick={() => {
              setTipoCategoria("");
              setAdicionarMovimentacao(true);
              setCategorias([]);
            }}
          >
            ADICIONAR
          </BotaoSecundario>
        </div>

        <div className="flex">
          <div className="flex justify-start p-[30px]">
            <BotaoPrincipal
              onClick={() => setContarPaginas((p) => Math.max(p - 1, 0))}
              className="flex flex-row items-center justify-center gap-2 text-[#FFFFFF] bg-[#FFCE58] disabled:opacity-50"
              disabled={contarPaginas === 0}
            >
              <img src="/IconVoltar.png" alt="Voltar" />
            </BotaoPrincipal>
          </div>

          <div className="flex justify-start p-[30px] translate-y-[20px]">
            <p className="font-[Poppins] font-bold text-[40px] text-[#FFFFFF] translate-y-[-15px]">
              {contarPaginas + 1}/{totalPaginas}
            </p>
          </div>

          <div className="flex justify-start p-[30px]">
            <BotaoPrincipal
              onClick={() =>
                setContarPaginas((p) => Math.min(p + 1, totalPaginas - 1))
              }
              className="flex flex-row items-center justify-center gap-2 text-[#FFFFFF] bg-[#FFCE58] disabled:opacity-50"
              disabled={contarPaginas >= totalPaginas - 1}
            >
              <img src="/IconSeguir.png" alt="Seguir" />
            </BotaoPrincipal>
          </div>
        </div>

        <div className="flex justify-start p-[30px]">
          <BotaoSecundario
            className="flex flex-row items-center justify-center gap-2 text-[#FFFFFF] bg-[#726AE4]"
            onClick={() => setModalFiltroAberto(true)}
          >
            <span>FILTRAR</span>
          </BotaoSecundario>
        </div>
      </div>

      {menuCategorias && (
        <MenuCategorias
          categorias={categorias}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
          setAdicionarCategoria={setAdicionarCategoria}
          setExcluirCategoria={setExcluirCategoria}
          setEditarCategoria={setEditarCategoria}
          setMenuCategorias={setMenuCategorias}
        />
      )}
      {adicionarCategoria && (
        <AdicionarCategoria
          setAdicionarCategoria={setAdicionarCategoria}
          setMenuCategorias={setMenuCategorias}
          cadastrarCategoria={cadastrarCategoria}
          tipoCategoria={tipoCategoria}
          setTipoCategoria={setTipoCategoria}
          nomeCategoria={nomeCategoria}
          setNomeCategoria={setNomeCategoria}
        />
      )}
      {excluirCategoria && (
        <ExcluirCategoria
          setExcluirCategoria={setExcluirCategoria}
          setMenuCategorias={setMenuCategorias}
          removerCategoria={removerCategoria}
        />
      )}
      {editarCategoria && (
        <EditarCategoria
          setEditarCategoria={setEditarCategoria}
          setMenuCategorias={setMenuCategorias}
          editarCategoriaF={editarCategoriaF}
          categoriaInput={categoriaInput}
          setCategoriaInput={setCategoriaInput}
          tipoCategoria={tipoCategoria}
          setTipoCategoria={setTipoCategoria}
        />
      )}
      {menuFornecedores && (
        <MenuFornecedores
          fornecedores={fornecedores}
          setAdicionarFornecedor={setAdicionarFornecedor}
          setExcluirFornecedor={setExcluirFornecedor}
          setEditarFornecedor={setEditarFornecedor}
          setMenuFornecedores={setMenuFornecedores}
        />
      )}
      {adicionarFornecedor && (
        <AdicionarFornecedor
          setAdicionarFornecedor={setAdicionarFornecedor}
          setMenuFornecedores={setMenuFornecedores}
          cadastrarFornecedor={cadastrarFornecedor}
          setRazaoSocial={setRazaoSocial}
          setCnpj={setCnpj}
          setCpf={setCpf}
          setTelefone={setTelefone}
          setEmail={setEmail}
          setLogradouro={setLogradouro}
          setNumero={setNumero}
          setBairro={setBairro}
          setCidade={setCidade}
          setCep={setCep}
          setFormaPagamento={setFormaPagamento}
          setBanco={setBanco}
          setAgencia={setAgencia}
          setConta={setConta}
          setPessoaContato={setPessoaContato}
          setObservacao={setObservacao}
          setTipoFornecedor={setTipoFornecedor}
        />
      )}
      {excluirFornecedor && (
        <ExcluirFornecedor
          setExcluirFornecedor={setExcluirFornecedor}
          setMenuFornecedores={setMenuFornecedores}
          deletarFornecedor={deletarFornecedor}
        />
      )}
      {editarFornecedor && (
        <EditarFornecedor
          setEditarFornecedores={setEditarFornecedor}
          setMenuFornecedores={setMenuFornecedores}
          listarFornecedores={listarFornecedores}
          editarFornecedorFunc={editarFornecedorFunc}
        />
      )}
      {menuClientes && (
        <MenuCliente
          clientes={clientes}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
          setAdicionarCliente={setAdicionarCliente}
          setExcluirCliente={setExcluirCliente}
          setEditarCliente={setEditarCliente}
          setMenuCliente={setMenuClientes}
        />
      )}
      {adicionarCliente && (
        <AdicionarCliente
          setAdicionarCliente={setAdicionarCliente}
          setMenuCliente={setMenuClientes}
          cadastrarCliente={cadastrarCliente}
          setNomeCliente={setNomeCliente}
          setCnpj={setCnpj}
          setCpf={setCpf}
          setTelefone={setTelefone}
          setEmail={setEmail}
          setLogradouro={setLogradouro}
          setNumero={setNumero}
          setBairro={setBairro}
          setCidade={setCidade}
          setCep={setCep}
          setTipoCliente={setTipoCliente}
        />
      )}
      {excluirCliente && (
        <ExcluirCliente
          setExcluirCliente={setExcluirCliente}
          setMenuCliente={setMenuClientes}
          deletarCliente={deletarCliente}
        />
      )}
      {editarCliente && (
        <EditarCliente
          setEditarCliente={setEditarCliente}
          setMenuCliente={setMenuClientes}
          listarClientes={listarClientes}
          editarClienteFunc={editarClienteFunc}
        />
      )}

      {modalFiltroAberto && (
        <ModalFiltros
          setModalFiltroAberto={setModalFiltroAberto}
          setFiltroAtual={setFiltroAtual}
        />
      )}

      <TabelaMovimentacoes
        movimentacoes={movimentacoes}
        setEditarMovimentacao={setEditarMovimentacao}
        setMovimentacaoSelecionada={setMovimentacaoSelecionada}
        setDescricaoMovimentacao={setDescricaoMovimentacao}
        setValorMovimentacao={setValorMovimentacao}
        setDataMovimentacao={setDataMovimentacao}
        setCategoriaSelecionada={setCategoriaSelecionada}
        setTipoCategoria={setTipoCategoria}
        setRemoverMovimentacao={setRemoverMovimentacao}
        setMetodoPagamento={setMetodoPagamento}
      />

      {adicionarMovimentacao && (
        <ModalMovimentacao
          categorias={categorias}
          categoriaSelecionada={categoriaSelecionada}
          descricaoMovimentacao={descricaoMovimentacao}
          valorMovimentacao={valorMovimentacao}
          dataMovimentacao={dataMovimentacao}
          tipoCategoria={tipoCategoria}
          metodoPagamento={metodoPagamento}
          setDescricaoMovimentacao={setDescricaoMovimentacao}
          setValorMovimentacao={setValorMovimentacao}
          setDataMovimentacao={setDataMovimentacao}
          setTipoCategoria={setTipoCategoria}
          setCategoriaSelecionada={setCategoriaSelecionada}
          setMetodoPagamento={setMetodoPagamento}
          periodicidade={periodicidade}
          setPeriodicidade={setPeriodicidade}
          clienteSelecionado={clienteSelecionado}
          fornecedorSelecionado={fornecedorSelecionado}
          setClienteSelecionado={setClienteSelecionado}
          setFornecedorSelecionado={setFornecedorSelecionado}
          onAbrirCategoria={() => {
            setAdicionarMovimentacao(false);
            setAdicionarCategoria(true);
          }}
          onCancelar={() => {
            setAdicionarMovimentacao(false);
            setMetodoPagamento("");
          }}
          onAdicionar={(dadosMovimentacao) => {
            cadastrarMovimentacao(dadosMovimentacao);
          }}
        />
      )}

      {editarMovimentacao && movimentacaoSelecionada && (
        <ModalEditarMovimentacao
          categorias={categorias}
          categoriaSelecionada={categoriaSelecionada}
          descricaoMovimentacao={descricaoMovimentacao}
          valorMovimentacao={valorMovimentacao}
          dataMovimentacao={dataMovimentacao}
          tipoCategoria={tipoCategoria}
          metodoPagamento={metodoPagamento}
          tags={tags}
          periodicidade={periodicidade}
          anexoEntrada={anexoEntrada}
          anexoRestante={anexoRestante}
          movPaga={movPaga}
          setDescricaoMovimentacao={setDescricaoMovimentacao}
          setValorMovimentacao={setValorMovimentacao}
          setDataMovimentacao={setDataMovimentacao}
          setTipoCategoria={setTipoCategoria}
          setCategoriaSelecionada={setCategoriaSelecionada}
          setMetodoPagamento={setMetodoPagamento}
          setTags={setTags}
          setPeriodicidade={setPeriodicidade}
          setAnexoEntrada={setAnexoEntrada}
          setAnexoRestante={setAnexoRestante}
          setMovPaga={setMovPaga}
          setClienteSelecionado={setClienteSelecionado}
          setFornecedorSelecionado={setFornecedorSelecionado}
          clienteSelecionado={clienteSelecionado}
          fornecedorSelecionado={fornecedorSelecionado}
          onCancelar={() => setEditarMovimentacao(false)}
          onAdicionar={() =>
            alterarMovimentacao({
              id: movimentacaoSelecionada.id,
              descricao: descricaoMovimentacao,
              valor: valorMovimentacao,
              data: dataMovimentacao,
              tipo: tipoCategoria,
              usuarioId: movimentacaoSelecionada.usuario.id,
              categoria: categoriaSelecionada,
              metodoPagamento: metodoPagamento,
              tags: tags,
              recorrente: movimentacaoSelecionada.lancamentoRecorrente,
              periodicidade: periodicidade,
              comprovanteEntrada: anexoEntrada,
              comprovanteRestante: anexoRestante,
              movPaga: movPaga,
            })
          }
        />
      )}

      {removerMovimentacao && movimentacaoSelecionada && (
        <ModalRemoverMovimentacao
          movimentacaoSelecionada={movimentacaoSelecionada}
          setRemoverMovimentacao={setRemoverMovimentacao}
          onRemover={() => apagarMovimentacao(movimentacaoSelecionada)}
        />
      )}
    </div>
  );
}
