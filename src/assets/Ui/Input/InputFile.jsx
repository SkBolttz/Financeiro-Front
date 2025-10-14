import { Upload } from "lucide-react";

export default function InputFile({ name, id, onChange }) {
  return (
    <div className="flex flex-col items-start w-[500px]">
      <input
        type="file"
        name={name}
        id={id}
        onChange={onChange}
        className="hidden"
      />

      <label
        htmlFor={id}
        className="flex items-center justify-center gap-[10px] cursor-pointer w-[200px] h-[60px] bg-[#726AE4] text-white font-semibold rounded-[12px] shadow-md hover:bg-[#5c55c6] transition duration-300 text-[#FFFFFF] text-[20px] flex items-center justify-center"
      >
        <Upload size={22} className="text-[#FFFFFF]"/>
        <span>Selecionar Arquivo</span>
      </label>
    </div>
  );
}
