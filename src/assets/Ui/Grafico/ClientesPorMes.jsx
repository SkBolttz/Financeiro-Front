import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#ff6384", "#36a2eb"];

export default function ClientesPorTipo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://financeiro-production-2b89.up.railway.app/dashboard/clientes/tipo",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Mapeamento correto conforme o DTO
        const formatted = [
          { tipo: "Pessoa Física (PF)", total: res.data.quantidadePF || 0 },
          { tipo: "Pessoa Jurídica (PJ)", total: res.data.quantidadePJ || 0 },
        ];

        setData(formatted);
      } catch (err) {
        console.error("Erro ao carregar dados de clientes por tipo:", err);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded p-2 shadow-md">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.tipo}
          </p>
          <p className="text-sm text-gray-600">
            {`Quantidade: ${payload[0].value.toLocaleString("pt-BR")}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-[600px] h-[400px] bg-white rounded-[20px] p-6 m-4">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">
        Clientes por Tipo (PF x PJ)
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Este gráfico apresenta a proporção entre clientes Pessoa Física (PF) e
        Pessoa Jurídica (PJ) cadastrados no sistema. A análise permite
        compreender o perfil predominante da base de clientes, auxiliando em
        decisões estratégicas de marketing, atendimento e oferta de produtos.
        Com esses dados, é possível identificar oportunidades de expansão,
        adaptar a comunicação e os serviços conforme o público-alvo, e
        direcionar recursos de forma mais eficiente.
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="total"
            nameKey="tipo"
            label={({ tipo, percent }) =>
              `${tipo} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
