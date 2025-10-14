export default function BotaoReceita({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-2 px-4 rounded ${className}  w-[100px] h-[50px] border-none cursor-pointer transition duration-300 ease-in-out font-['Antonio'] text-[20px] flex items-center justify-center`}
    >
      {children}
    </button>
  );
}
