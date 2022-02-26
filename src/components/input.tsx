const Input = ({ placeholder, type, className, required }: any) => {
  const handleLabelClick = (event: any) => {
    const input = event.target.parentElement.children[0];
    input.focus();
  };
  return (
    <div className="mx-0 flex flex-col justify-center relative">
      <input
        type={type}
        placeholder=" "
        className={
          "mt-3 mx-3 bg-black p-3 rounded border border-zinc-900 font-light focus:outline-none text-white z-0 peer " +
          className
        }
        required={required}
      ></input>
      <label
        onClick={handleLabelClick}
        className="text-zinc-500 text-xs px-1 top-1 hover:cursor-text transition-all duration-200 ease-in-out absolute left-6 bg-black font-light peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:text-xs peer-focus:top-1"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
