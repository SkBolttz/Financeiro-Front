export default function Atalho({ children, onClick, className }) {
  return (
    <div className="flex items-center justify-between" onClick={onClick}>
      <h2
        className={`text-[#FFFFFF] font-['Antonio'] text-[30px] cursor-pointer hover:text-[#FCBF32] transition-all duration-500 ease-out  ${className}`}
      >
        {children}
      </h2>
    </div>
  );
}
