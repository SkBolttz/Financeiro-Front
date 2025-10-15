import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"];

export default function ReceitasDespesasPorTipoPagamento() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://financeiro-production-2b89.up.railway.app/dashboard/movimentacoes/tipo-pagamento",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Agrupa por tipo de pagamento somando todas as receitas e despesas
        const agrupado = res.data.reduce((acc, item) => {
          const tipo = item.tipoPagamento;
          const total = item.total || 0;

          if (!acc[tipo]) {
            acc[tipo] = 0;
          }
          acc[tipo] += total;
          return acc;
        }, {});

        // Transforma em array para o gráfico
        const formatted = Object.entries(agrupado).map(([tipo, total]) => ({
          tipo,
          total,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[600px] h-[400px] bg-white rounded-[20px] p-6 m-4">
      <h3 className="text-[20px] font-[Poppins] text-center mb-2">
        Receitas x Despesas por Tipo de Pagamento
      </h3>
      <p className="text-[13px] font-[Poppins] text-center mb-4">
        ste gráfico apresenta a distribuição das receitas e despesas de acordo
        com o tipo de pagamento utilizado (como dinheiro, cartão de crédito,
        débito, transferência, etc.). A visualização permite identificar quais
        métodos de pagamento são mais utilizados tanto para entradas quanto para
        saídas financeiras, oferecendo uma análise comparativa que auxilia na
        tomada de decisões estratégicas — por exemplo, otimizando as formas de
        pagamento oferecidas aos clientes ou ajustando políticas internas
        conforme o comportamento financeiro observado. Essa análise é
        fundamental para entender tendências de consumo, preferências de
        pagamento e possíveis ajustes de fluxo de caixa.
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="tipo"
            cx="50%"
            cy="50%"
            outerRadius={80}
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
          <Tooltip
            formatter={(value) =>
              `R$ ${value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
