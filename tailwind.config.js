/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E43030",
          orange: "#D48D3B",
          green: "#3E9242",
        },
        cardBg: "#F2F4F7",
        secondary: "#282828",
        "gray-200": "#EAECF0",
        "gray-300": "D0D5DD",
        "gray-500": "#667085",
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-900": "#101828",
        "white-100": "#F4F4F4",
        "white-200": "#EDF0F8",
        "black-100": "#3D4258",
        "neutral-black": "#23263B",
      },
      screens: {
        vs: "300px",
        s: "500px",
        md: "700px",
        lg: "1200px",
      },
    },
  },
  plugins: [],
};
