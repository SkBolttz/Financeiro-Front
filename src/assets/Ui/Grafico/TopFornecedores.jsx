import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TopFornecedores() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://financeiro-production-2b89.up.railway.app/dashboard/fornecedores/top-movimentacoes",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const formatted = res.data.map((item) => ({
          fornecedor: item.fornecedorNome || "Fornecedor desconhecido",
          total: item.totalMovimentacoes || 0,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Erro ao buscar Top Fornecedores:", err);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded p-2 shadow-md">
          <p className="font-semibold text-sm text-gray-800">{`Fornecedor: ${payload[0].payload.fornecedor}`}</p>
          <p className="text-sm text-gray-600">
            {`Total de movimentações: ${payload[0].value.toLocaleString(
              "pt-BR"
            )}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-[600px] h-[400px] bg-white rounded-[20px] p-6 m-4">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">
        Top Fornecedores
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Este gráfico apresenta os fornecedores com maior número de movimentações
        financeiras, permitindo identificar aqueles que têm maior relevância no
        fluxo de compras e serviços. A análise auxilia na gestão de parcerias
        estratégicas, no negociação de contratos e na avaliação do impacto de
        cada fornecedor no desempenho financeiro da empresa. Com esses dados, é
        possível priorizar fornecedores-chave, otimizar processos de compra e
        tomar decisões mais assertivas em termos de logística e negociação.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fornecedor" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" fill="#fbbf24" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
