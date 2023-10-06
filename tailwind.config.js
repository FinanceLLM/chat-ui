/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-highlightjs")],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  theme: {
    hljs: {
      theme: "atom-one-dark",
    },
    list: {
      none: "none",
      square: "square",
      roman: "upper-roman",
    },
  },
};
