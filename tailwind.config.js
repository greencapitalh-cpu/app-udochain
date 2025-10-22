// [05] tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        udo: {
          ink: "#0B2341",
          steel: "#6B7A90",
          sky: "#E9F1FF",
          primary: "#184B8C",
          accent: "#3AA0FF"
        }
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};
