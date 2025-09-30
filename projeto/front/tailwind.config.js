/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // todos os arquivos React + TS
  ],
  theme: {
    extend: {}, // aqui você pode sobrescrever/expandir temas
  },
  plugins: [], // adicione plugins do Tailwind se quiser no futuro
}