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
        // Paleta oscura principal del portafolio
        brand: {
          bg:      '#0a0e1a',   // fondo principal
          surface: '#0f1628',   // fondo de secciones alternadas
          card:    '#111827',   // fondo de tarjetas
          border:  '#1e2d4a',   // bordes sutiles
          blue:    '#3b8aee',   // acento azul primario
          cyan:    '#22d3ee',   // acento secundario
          emerald: '#34d399',   // disponibilidad / WhatsApp
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;