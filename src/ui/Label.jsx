function Label({ name, label }) {
  return (
    <label
      htmlFor={name}
      className="block mb-2 capitalize text-gray-400 text-xs font-medium"
    >
      {label}
    </label>
  );
}

export default Label;
