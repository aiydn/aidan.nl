/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "base-content": "#000000",
          "primary": "#a06080",
        },
        dark : {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "base-100": "#242424",
          "base-200": "#1f1f1f",
          "base-300": "#1a1a1a",
          "base-content": "#ffffff",
          "primary": "#a06080",
        },
      },
    ],
  },
}