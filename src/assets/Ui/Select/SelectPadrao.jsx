export default function SelectPadrao({
  name,
  id,
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="appearance-none bg-[#BBE7F6] rounded-[10px] px-[10px] py-[5px] w-[250px] h-[60px] border-none"
      >
        <option value=""></option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
