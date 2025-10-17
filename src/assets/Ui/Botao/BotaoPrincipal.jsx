export const BotaoPrincipal = ({ children, onClick, type = "button", className }) => (
  <button
    type={type} 
    onClick={onClick}
    className={`rounded-[20px] p-2 w-full sm:w-[180px] h-[40px] sm:h-[60px] border-none text-[#7276C2] font-bold text-[18px] sm:text-[25px] font-[Antonio] cursor-pointer hover:bg-[#FCBF32] transition duration-300 ease-in-out ${className}`}
  >
    {children}
  </button>
);
