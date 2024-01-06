import Label from "./Label";

function Input({ name, label, value, handle }) {
  return (
    <div>
      <Label name={name} label={label} />
      <input
        type="text"
        name={name}
        id={name}
        className="input"
        onChange={handle}
        value={value}
        placeholder={name}
      />
    </div>
  );
}

export default Input;
