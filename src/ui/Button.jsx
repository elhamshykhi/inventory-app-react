function Button({ text, handle, type = "button" }) {
  return (
    <button
      type={type}
      onClick={handle}
      className="w-full bg-saffron text-gray-800 capitalize font-bold text-xs py-2 rounded-xl"
    >
      {text}
    </button>
  );
}

export default Button;
