export default function CheckboxPadrao({ label, checked, onChange }) {
  return (
    <div className="flex items-center mb-[10px] gap-[10px] cursor-pointer select-none font-['Poppins'] text-[#FFFFFF]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-[20px] h-[20px] cursor-pointer ml-[20px] text-[#FFFFFF]"
      />
      <label className="text-[#FFFFFF]">{label}</label>
    </div>
  );
}
