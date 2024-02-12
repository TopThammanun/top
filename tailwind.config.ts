/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const ColorThemeLight = require("./src/theme/colors/light");
const ColoreThemeDark = require("./src/theme/colors/dark");

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
  // corePlugins: {
  //   preflight: false,
  // },
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
