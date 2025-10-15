import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function ReceitasDespesasPorMes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://financeiro-production-2b89.up.railway.app/dashboard/movimentacoes/mensal", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const formatted = res.data.map((item) => ({
          mes: `${item.mes}/${item.ano}`,
          receitas: item.receitas || 0,
          despesas: item.despesas || 0,
        }));
        setData(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[600px] h-[400px] bg-white rounded-[20px] p-6 m-4">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">Receitas e Despesas por Mês</h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Evolução mensal de entradas e saídas. Planeje orçamentos sazonais.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="receitas" fill="#10b981" />
          <Bar dataKey="despesas" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
