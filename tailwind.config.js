/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#F4C430",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
