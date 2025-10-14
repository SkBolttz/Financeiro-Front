import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SimpleBarChart() {
  const [despesaAnual, setDespesaAnual] = useState([]);
  const [receitaAnual, setReceitaAnual] = useState([]);

  useEffect(() => {
    const resgatarDespesasAnual = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/dashboard/tendencia/gastos/despesas/anual",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDespesaAnual(response.data);
      } catch (error) {
        console.error("Erro ao resgatar despesas: ", error);
      }
    };

    const resgatarReceitasAnual = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/dashboard/tendencia/gastos/receita/anual",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReceitaAnual(response.data);
      } catch (error) {
        console.error("Erro ao resgatar receitas: ", error);
      }
    };

    resgatarDespesasAnual();
    resgatarReceitasAnual();
  }, []);

  const uData = Array(12).fill(0);
  const pData = Array(12).fill(0);

  despesaAnual.forEach((item) => {
    const data = new Date(item.data);
    const mesIndex = data.getMonth(); 
    uData[mesIndex] += item.valor;
  });

  receitaAnual.forEach((item) => {
    const data = new Date(item.data);
    const mesIndex = data.getMonth();
    pData[mesIndex] += item.valor;
  });

  const xLabels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <BarChart
        series={[
          {
            data: uData,
            label: "Despesas",
            id: "despesasId",
            color: "#f87171",
          },
          {
            data: pData,
            label: "Receitas",
            id: "receitasId",
            color: "#34d399",
          },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        yAxis={[{ width: 50 }]}
      />
    </Box>
  );
}
