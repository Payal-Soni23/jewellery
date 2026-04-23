/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#0f0f10",
          charcoal: "#1b1b1d",
          gold: "#c6a972",
          goldSoft: "#e8d8b4",
          ivory: "#fbf8f2",
          pearl: "#f4efe6",
          line: "#e5d7bf",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 45px rgba(15, 15, 16, 0.12)",
        glow: "0 12px 30px rgba(198, 169, 114, 0.18)",
      },
      backgroundImage: {
        "gold-mesh":
          "radial-gradient(circle at top left, rgba(198,169,114,0.25), transparent 35%), radial-gradient(circle at bottom right, rgba(198,169,114,0.14), transparent 30%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
        reveal: "reveal 0.8s ease-out both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
