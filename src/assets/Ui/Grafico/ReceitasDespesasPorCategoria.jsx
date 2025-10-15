import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"];

export default function ReceitasDespesasPorCategoria() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://financeiro-production-2b89.up.railway.app/dashboard/movimentacoes/categoria", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const formatted = res.data.map((item) => ({
          categoria: item.categoria,
          total: (item.receitas || 0) + (item.despesas || 0),
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
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">Receitas e Despesas por Categoria</h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Distribuição total de movimentações por categoria. Identifique áreas de foco financeiro.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="total"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
