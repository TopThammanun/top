/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const ColorThemeLight = require("./src/providers/theme/colors/light");
const ColoreThemeDark = require("./src/providers/theme/colors/dark");

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: ColorThemeLight,
        dark: ColoreThemeDark,
      },
    }),
  ],
};
