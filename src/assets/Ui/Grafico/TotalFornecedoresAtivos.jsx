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

export default function TotalReceitasDespesasESaldo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8082/dashboard/kpi/financeiro",
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
          { tipo: "Saldo", valor: res.data.saldo || 0 },
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
        KPIs Financeiros: Receitas, Despesas e Saldo
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Resumo dos principais indicadores financeiros. Avalie a saúde do caixa
        geral.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tipo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
