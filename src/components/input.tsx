const Input = ({ placeholder, type }: any) => {
  const handleLabelClick = (event: any) => {
    const input = event.target.parentElement.children[0];
    input.focus();
  };
  return (
    <div className="mx-0 flex flex-col justify-center relative">
      <input type={type} id="email" placeholder="" className="authentication-input peer"></input>
      <label onClick={handleLabelClick} className="authentication-label">
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
