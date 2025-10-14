import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function TotalClientesAtivos() {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([{ nome: "Clientes Ativos", total: 0 }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8082/dashboard/kpi/clientes-ativos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const value = res.data || 0;
        setTotal(value);
        setData([{ nome: "Clientes Ativos", total: value }]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[600px] h-[400px] bg-white rounded-[20px] p-6 m-4">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">Total de Clientes Ativos</h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Número de clientes com atividade recente. Métrica chave para engajamento.
      </p>
      <div className="text-center mb-4">
        <span className="text-[40px] font-bold text-[#3b82f6]">{total}</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="nome" hide />
          <YAxis hide />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
