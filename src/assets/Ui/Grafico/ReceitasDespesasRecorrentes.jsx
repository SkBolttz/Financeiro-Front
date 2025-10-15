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

export default function ReceitasDespesasRecorrentes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://financeiro-production-2b89.up.railway.app/dashboard/movimentacoes/recorrentes",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert(res.data);
        const formatted = res.data.map((item) => ({
          descricao: item.descricao || "Sem descrição",
          valor: item.valor || 0,
          proximaData: item.proximaData || "N/A",
          recorrencias: `${item.recorrenciasCriadas}/${item.totalRecorrencias}`,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Erro ao buscar recorrências:", err);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = data.find((d) => d.descricao === label);
      return (
        <div className="bg-white border border-gray-300 rounded p-2 shadow-md">
          <p className="font-semibold text-sm">{`Descrição: ${label}`}</p>
          <p className="text-sm text-gray-600">{`Valor: R$ ${payload[0].value.toLocaleString(
            "pt-BR",
            { minimumFractionDigits: 2 }
          )}`}</p>
          <p className="text-sm text-gray-600">{`Próxima data: ${
            item?.proximaData || "N/A"
          }`}</p>
          <p className="text-sm text-gray-600">{`Recorrência: ${
            item?.recorrencias || "N/A"
          }`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-[600px] h-[400px] bg-white rounded-[20px] p-6 m-4">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">
        Receitas e Despesas Recorrentes
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Movimentações fixas ou repetitivas. Controle custos e receitas
        previsíveis.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="descricao" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="valor" fill="#f59e0b" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
