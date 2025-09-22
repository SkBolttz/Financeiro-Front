export const BotaoSecundario = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#7276C2] rounded-[20px] p-2 w-[180px] h-[60px] border-none text-white font-bold text-[25px] font-[Antonio] cursor-pointer hover:bg-[#FFCE58] transition duration-300 ease-in-out"
  >
    {children}
  </button>
);