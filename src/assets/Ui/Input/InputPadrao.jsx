export default function InputPadrao({
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#BBE7F6] rounded-[10px] px-[10px] py-[5px] w-full max-w-[500px] h-[40px] sm:h-[60px] border-none"
      />
    </div>
  );
}
