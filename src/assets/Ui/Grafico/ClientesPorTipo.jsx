import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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
        setData([
          { name: "PF", value: res.data.pf },
          { name: "PJ", value: res.data.pj },
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const COLORS = ["#34d399", "#60a5fa"];

  return (
    <div className="w-[500px] h-[400px] bg-white rounded-[20px] p-6 m-4">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">
        Clientes PF x PJ
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Distribuição dos clientes por tipo: Pessoa Física (PF) e Pessoa Jurídica
        (PJ). Permite analisar rapidamente a composição da base de clientes.
      </p>
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
