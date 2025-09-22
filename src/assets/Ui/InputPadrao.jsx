export default function InputPadrao({
  type,
  name,
  id,
  label,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        name={name}
        id={id}
        className="bg-[#BBE7F6] rounded-[10px] px-[10px] py-[5px] w-[500px] h-[60px] border-none"
      />
    </div>
  );
}
