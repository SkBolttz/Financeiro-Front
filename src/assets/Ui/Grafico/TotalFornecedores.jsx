import { useEffect, useState } from "react";
import axios from "axios";

export default function TotalFornecedores() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8082/dashboard/fornecedores/total",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTotal(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[300px] h-[200px] bg-white rounded-[20px] p-6 m-4 flex flex-col justify-center items-center">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">
        Total de Fornecedores
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        Total de fornecedores cadastrados no sistema.
      </p>
      <span className="text-[40px] font-bold text-[#60a5fa]">{total}</span>
    </div>
  );
}
