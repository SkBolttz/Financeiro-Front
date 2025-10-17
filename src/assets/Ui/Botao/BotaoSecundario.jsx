export const BotaoSecundario = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`rounded-[20px] p-2 w-full sm:w-[180px] h-[40px] sm:h-[60px] border-none font-bold text-[18px] sm:text-[25px] font-[Antonio] cursor-pointer hover:bg-[#ABB9FE] transition duration-300 ease-in-out shadow-[0_10px_30px_-3px_#7276C2,0_4px_16px_-2px_#7276C2] ${className}`}
  >
    {children}
  </button>
);
