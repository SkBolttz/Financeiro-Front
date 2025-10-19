export const BotaoSecundario = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`rounded-[20px] px-6 py-3
      w-[140px] h-[45px] text-[18px]
      sm:w-[160px] sm:h-[50px] sm:text-[20px]
      md:w-[180px] md:h-[55px] md:text-[22px]
      lg:w-[200px] lg:h-[60px] lg:text-[25px]
      xl:w-[220px] xl:h-[65px] xl:text-[27px]
      2xl:w-[240px] 2xl:h-[70px] 2xl:text-[29px]
      font-bold font-[Antonio] cursor-pointer
      border-none hover:bg-[#ABB9FE]
      transition duration-300 ease-in-out
      shadow-[0_10px_30px_-3px_#7276C2,0_4px_16px_-2px_#7276C2]
      ${className}`}
  >
    {children}
  </button>
);