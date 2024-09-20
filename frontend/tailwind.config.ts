// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        balsamiq: ["var(--font-balsamiq)", "sans-serif"],
        galindo: ["var(--font-galindo)", "sans-serif"],
      },
      backgroundImage: {
        'blur': 'blur(10px)',
      },
    },
  },
  plugins: [],
};

export default config;
