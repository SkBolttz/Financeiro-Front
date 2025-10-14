export const BotaoEditar = ({
  children,
  onClick,
  type = "button",
  className,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`rounded-[20px] p-2 w-[90px] h-[50px] border-none text-[#FFFFFF] font-bold text-[25px] font-[Antonio] cursor-pointer hover:bg-[#ABB9FE] transition duration-300 ease-in-out ${className}`}
  >
    {children}
  </button>
);
