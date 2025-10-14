export default function SucessoPadrao({ mensagem }) {
  return (
    <div
      className="flex justify-center items-center bg-[#FFCE58] p-[10px] text-[#7276C2] rounded-[10px] border border-[#FFCE58] text-[20px] font-[Antonio] max-w-md mx-auto "
      role="alert"
    >
      <span className="block sm:inline">{mensagem}</span>
    </div>
  );
}
