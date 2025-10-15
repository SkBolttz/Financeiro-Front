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

export default function TopClientes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://financeiro-production-2b89.up.railway.app/dashboard/clientes/top-movimentacoes",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const formatted = res.data.map((item) => ({
          clienteId: item.clienteId,
          cliente: item.clienteNome,
          total: item.totalMovimentacoes || 0,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Erro ao carregar Top Clientes:", err);
      }
    };
    fetchData();
  }, []);

  // Tooltip customizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded p-2 shadow-md">
          <p className="font-semibold text-sm text-gray-800">
            {`Cliente: ${label}`}
          </p>
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
        Top Clientes por Movimentações
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Este gráfico apresenta os clientes com maior volume de movimentações
        financeiras, considerando tanto receitas quanto despesas associadas. A
        análise permite identificar os principais clientes em termos de
        engajamento e valor movimentado, auxiliando na definição de estratégias
        de retenção, fidelização e oportunidades de upsell. Com esses dados, é
        possível priorizar relacionamentos estratégicos, otimizar campanhas e
        direcionar esforços comerciais para clientes com maior potencial de
        retorno.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cliente" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
