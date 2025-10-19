export default function InputPadrao({ type, name, id, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#BBE7F6] rounded-[10px] border-none px-4
          w-[250px] h-[40px] text-[16px]
          sm:w-[350px] sm:h-[45px] sm:text-[17px]
          md:w-[450px] md:h-[50px] md:text-[18px]
          lg:w-[500px] lg:h-[55px] lg:text-[20px]
          xl:w-[550px] xl:h-[60px] xl:text-[21px]
          2xl:w-[600px] 2xl:h-[65px] 2xl:text-[22px]"
      />
    </div>
  );
}