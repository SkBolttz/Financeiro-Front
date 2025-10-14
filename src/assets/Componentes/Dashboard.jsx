import Header from "./Header";
import SimpleBarChart from "../Ui/Grafico/generateMonthlyData.jsx";
import { TabelaDespesas } from "../Ui/Tabela/TabelaDespesas.jsx";
import ClientesPorMes from "../Ui/Grafico/ClientesPorMes.jsx";
import TopClientes from "../Ui/Grafico/TopClientes.jsx";
import TopFornecedores from "../Ui/Grafico/TopFornecedores.jsx";
import ReceitasDespesasPorTipoPagamento from "../Ui/Grafico/ReceitasDespesasPorTipoPagamento.jsx";
import ReceitasDespesasRecorrentes from "../Ui/Grafico/ReceitasDespesasRecorrentes.jsx";
import TotalClientesAtivos from "../Ui/Grafico/TotalClientesAtivos.jsx";

export default function Dashboards() {
  return (
    <div className="bg-[#ACBAFF] min-h-screen">
      <div>
        <Header />
      </div>
      <div className="flex justify-center mt-[20px]">
        <h2 className="text-[#FFFFFF] text-[50px] font-['Antonio']">
          Central de Dashboards
        </h2>
      </div>
      <div className="flex">
        <div className="w-[900px] h-[500px] bg-[#FFFFFF] mt-[80px] ml-[100px] rounded-[20px] mr-[120px] p-6">
          <div className="flex justify-center mt-[20px]">
            <span className="font-[Poppins] text-[20px] ">
              Tendência de Gastos (Últimos 12 Meses)
            </span>
          </div>
          <div className="flex justify-center mt-[20px] mr-[20px] ml-[20px]">
            <span className="font-[Poppins] text-[13px]">
              O gráfico apresenta a evolução dos gastos ao longo dos últimos 12
              meses, permitindo identificar padrões de consumo e variações ao
              longo do período. É possível observar se os gastos estão
              crescendo, diminuindo ou se mantendo estáveis, bem como
              identificar picos ou quedas significativas em determinados meses.
              Essas informações são úteis para análise financeira, ajudando a
              planejar melhor o orçamento, identificar meses de maior despesa e
              buscar formas de reduzir gastos desnecessários.
            </span>
          </div>
          <div className="flex justify-center translate-y-[30px]">
            <SimpleBarChart />
          </div>
        </div>
        <div className="w-[900px] h-[500px] bg-[#FFFFFF] mt-[80px] mr-[100px] rounded-[20px]">
          <div className="flex justify-center mt-[20px]">
            <span className="font-[Poppins] text-[20px] ">
              Despesas por Categoria (Mês Atual)
            </span>
          </div>
          <div>
            <TabelaDespesas />
          </div>
          <div className="flex justify-center mt-[20px] mr-[20px] ml-[20px]">
            <span className="font-[Poppins] text-[13px]">
              Esta tabela apresenta a distribuição das despesas do usuário no
              mês atual, organizadas por categoria. Cada categoria é
              representada por uma bolinha colorida ao lado do nome, permitindo
              identificar visualmente a proporção de gastos. O objetivo é
              fornecer uma visão rápida de como os recursos estão sendo
              distribuídos, destacando quais categorias consomem a maior parte
              do orçamento e ajudando na tomada de decisões financeiras.
            </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[900px] h-[500px] bg-[#FFFFFF] mt-[80px] ml-[100px] rounded-[20px] mr-[120px] p-6">
          <div className="flex justify-center translate-y-[30px]">
            <ReceitasDespesasPorTipoPagamento />
          </div>
        </div>
        <div className="w-[900px] h-[500px] bg-[#FFFFFF] mt-[80px] ml-[100px] rounded-[20px] mr-[120px] p-6">
          <div className="flex justify-center translate-y-[30px]">
            <ReceitasDespesasRecorrentes />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[900px] h-[500px] bg-[#FFFFFF] mt-[80px] ml-[100px] rounded-[20px] mr-[120px] p-6">
          <div className="flex justify-center translate-y-[30px]">
            <TopClientes />
          </div>
        </div>
        <div className="w-[900px] h-[500px] bg-[#FFFFFF] mt-[80px] ml-[100px] rounded-[20px] mr-[120px] p-6">
          <div className="flex justify-center translate-y-[30px]">
            <TotalClientesAtivos />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[900px] h-[500px] bg-[#FFFFFF] mt-[80px] ml-[100px] rounded-[20px] mr-[120px] p-6">
          <div className="flex justify-center translate-y-[30px]">
            <ClientesPorMes />
          </div>
        </div>
        <div className="w-[900px] h-[500px] bg-[#FFFFFF] mt-[80px] ml-[100px] rounded-[20px] mr-[120px] p-6">
          <div className="flex justify-center translate-y-[30px]">
            <TopFornecedores />
          </div>
        </div>
      </div>
    </div>
  );
}
