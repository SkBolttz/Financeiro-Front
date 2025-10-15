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

export default function TotalReceitasXDespesas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://financeiro-production-2b89.up.railway.app/dashboard/movimentacoes/total",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const formatted = [
          { tipo: "Receitas", valor: res.data.receitas || 0 },
          { tipo: "Despesas", valor: res.data.despesas || 0 },
        ];
        setData(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[600px] h-[400px] bg-white rounded-[20px] p-6 m-4">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">
        Total de Receitas x Despesas
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Comparação geral entre entradas e saídas financeiras. Avalie o balanço
        patrimonial.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tipo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
