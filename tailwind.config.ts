import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          950: '#f0f2fa',
          900: '#f8f9ff',
          800: '#e8ebf5',
          700: '#d0d5e8',
          600: '#9199bb',
          500: '#6b74a0',
          400: '#4a5380',
          300: '#2d3660',
          200: '#1a2040',
          100: '#0f1228',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
