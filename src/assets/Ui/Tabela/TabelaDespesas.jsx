import { useState, useEffect } from "react";
import axios from "axios";

export const TabelaDespesas = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const despesasPorCategoria = async () => {
      try {
        const response = await axios.get(
          "https://financeiro-production-2b89.up.railway.app/dashboard/despesas/por/categoria",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao resgatar despesas: ", error);
      }
    };
    despesasPorCategoria();
  }, []);

  const corAleatoria = () => {
    let cor;
    do {
      cor = `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
    } while (cor.toLowerCase() === "#ffffff");
    return cor;
  };

  return (
    <div className="mt-[50px] ml-[100px] mr-[100px] font-['Poppins'] text-[20px]">
      {categorias.map((categoria, index) => (
        <div key={index} className="flex items-center mt-[10px]">
          <div className="flex items-center gap-[5px] flex-1">
            <div
              className="w-[10px] h-[10px] rounded-full"
              style={{ backgroundColor: corAleatoria() }}
            ></div>
            <span>{categoria.nome}</span>
          </div>

          <div className="w-[100px] text-right translate-x-[-200px]">R$ {categoria.valor}</div>

          <div className="w-[60px] text-right">
            {Math.round(categoria.porcentagem)}%
          </div>
        </div>
      ))}
    </div>
  );
};
