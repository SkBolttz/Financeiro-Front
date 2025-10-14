export default function InputMedio({
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#BBE7F6] rounded-[10px] px-[10px] py-[5px] w-[380px] h-[60px] border-none"
      />
    </div>
  );
}
