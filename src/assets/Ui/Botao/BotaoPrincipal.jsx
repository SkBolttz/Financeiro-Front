export const BotaoPrincipal = ({ children, onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`rounded-[20px] px-6 py-3
      w-[140px] h-[45px] text-[18px]
      sm:w-[160px] sm:h-[50px] sm:text-[20px]
      md:w-[180px] md:h-[55px] md:text-[22px]
      lg:w-[200px] lg:h-[60px] lg:text-[25px]
      xl:w-[220px] xl:h-[65px] xl:text-[27px]
      2xl:w-[240px] 2xl:h-[70px] 2xl:text-[29px]
      text-[#7276C2] font-bold font-[Antonio]
      cursor-pointer hover:bg-[#FCBF32]
      transition duration-300 ease-in-out
      border-none
      ${className}`}
  >
    {children}
  </button>
);