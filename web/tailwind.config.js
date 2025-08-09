/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ig: {
          // pink: "#FF6EA9",
          // orange: "#FD8A44",
          // purple: "#833AB4",
          // yellow: "#FCAF45",
          // red: "#FD1D1D",
          pink: "#FF6EA9",
          pink2: "#FF4E88",
          orange: "#FD8A44",
          purple: "#833AB4",
          magenta: "#C13584",
        },
      },
      boxShadow: {
        ig: "0 8px 30px rgba(255,105,180,0.35)",
      },
    },
  },
  // theme: {
  //   extend: {
  //     colors: {
  //       // Tokens IG
  //       "ig-pink": "#FF6EA9",
  //       "ig-pink2": "#FF4E88",
  //       "ig-orange": "#FD8A44",
  //       "ig-purple": "#833AB4",
  //       "ig-magenta": "#C13584",

  //       // Background & Text (usando rgb() para manter consistência com vars)
  //       surface: "rgb(var(--bg-surface) / <alpha-value>)",
  //       elev: "rgb(var(--bg-elev) / <alpha-value>)",
  //       "text-1": "rgb(var(--text-1) / <alpha-value>)",
  //       "text-2": "rgb(var(--text-2) / <alpha-value>)",
  //       "line-1": "rgb(var(--line-1) / <alpha-value>)",
  //     },
  //     boxShadow: {
  //       ig: "0 8px 30px rgba(255, 105, 180, 0.35)",
  //     },
  //     borderRadius: {
  //       xl2: "1rem", // se quiser um token de arredondamento custom
  //     },
  //     backgroundImage: {
  //       // Gradientes pré-prontos
  //       ig: "linear-gradient(90deg, #FF6EA9, #FF4E88, #FD8A44)",
  //       "ig-br": "linear-gradient(135deg, #F8D7E8, #FF6EA9, #FD8A44)",
  //       "ig-text": "linear-gradient(90deg, #FF6EA9, #FF4E88, #FD8A44)",
  //     },
  //   },
  // },
};
