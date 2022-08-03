module.exports = {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        lightLavender: "hsl(235, 67%, 85%)",
        lightPink: "hsl(346, 69%, 80%)",
        lightGreen: "hsl(158, 63%, 60%)",
        lightOrange: "hsl(22, 84%, 67%)",
        standardGreen: "hsl(163, 42%, 57%)",
      },
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
      },
    },
    plugins: [],
  },
};
