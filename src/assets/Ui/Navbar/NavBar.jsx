import { useNavigate } from "react-router-dom";

export default function NavBar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-[300px] bg-[#726AE4] shadow-lg flex flex-col text-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(false)}
          className="text-[#FFFFFF] bg-[#726AE4] border-none text-[30px] font-[Antonio] cursor-pointer mr-[20px]"
        >
          X
        </button>
      </div>
      <nav className="flex flex-col items-start p-8 space-y-8 bg-[#726AE4] h-full mr-[20px] ml-[20px] mt-[20px] gap-[20px]">
        {/* Movimentações */}
        <div className="space-y-2">
          <h2 className="text-[20px] font-[Poppins] text-[#BBE7F6]">
            1. Movimentações
          </h2>
          <p
            className="text-[18px] font-[Poppins] text-[#BBE7F6] cursor-pointer hover:text-[#FCBF32]"
            onClick={() => {
              navigate("/principal");
            }}
          >
            Movimentações
          </p>
        </div>

        {/* Perfil */}
        <div className="space-y-2">
          <h2 className="text-[20px] font-[Poppins] text-[#BBE7F6]">
            2. Perfil
          </h2>
          <p
            className="text-[18px] font-[Poppins] text-[#BBE7F6] cursor-pointer hover:text-[#FCBF32]"
            onClick={() => {
              navigate("/perfil");
            }}
          >
            Consultar Perfil
          </p>
        </div>

        {/* Menus */}
        <div className="space-y-2">
          <h2 className="text-[20px] font-[Poppins] text-[#BBE7F6]">
            3. Menus
          </h2>
          <p
            className="text-[18px] font-[Poppins] text-[#BBE7F6] cursor-pointer hover:text-[#FCBF32]"
            onClick={() => {
              navigate("/principal?modal=categorias");
            }}
          >
            Menu Categorias
          </p>
          <p
            className="text-[18px] font-[Poppins] text-[#BBE7F6] cursor-pointer hover:text-[#FCBF32]"
            onClick={() => {
              navigate("/principal?modal=fornecedores");
            }}
          >
            Menu Fornecedores
          </p>
          <p
            className="text-[18px] font-[Poppins] text-[#BBE7F6] cursor-pointer hover:text-[#FCBF32]"
            onClick={() => {
              navigate("/principal?modal=clientes");
            }}
          >
            Menu Clientes
          </p>
        </div>

        {/* Dashboards */}
        <div className="space-y-2">
          <h2 className="text-[20px] font-[Poppins] text-[#BBE7F6]">
            4. Dashboards
          </h2>
          <p
            className="text-[18px] font-[Poppins] text-[#BBE7F6] cursor-pointer hover:text-[#FCBF32]"
            onClick={() => {
              navigate("/dashboards");
            }}
          >
            Dashboards
          </p>
        </div>
      </nav>
    </aside>
  );
}
