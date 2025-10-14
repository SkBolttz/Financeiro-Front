export default function ErroPadrao({ mensagem }) {
  return (
    <div
      className="flex justify-center items-center bg-[#fad2b1] p-[2px] text-[#B23A2B] rounded-[10px] border border-[#ff7f7f] text-[20px] font-[Poppins] max-w-md mx-auto "
      role="alert"
    >
      <span className="block sm:inline">{mensagem}</span>
    </div>
  );
}
