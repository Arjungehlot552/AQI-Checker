/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      bg: "var(--bg-color)",
      text: "var(--text-color)",
    },
    animation: {
      blink: "blink 1s step-end infinite",
      "fade-in": "fadeIn 0.3s ease-out",
      cross: "cross 0.4s ease-in-out",
      hamburger: "hamburger 0.4s ease-in-out",
      smoke: "smoke 3s infinite",
      "smoke-bounce": "smoke-bounce 2s infinite",
    },
    keyframes: {
      blink: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0 },
      },
      fadeIn: {
        "0%": { opacity: "0", transform: "scale(0.95)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      },
      cross: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(180deg)" },
      },
      hamburger: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(90deg)" },
      },
      smoke: {
        "0%": { opacity: 0, transform: "translateY(0)" },
        "50%": { opacity: 0.5, transform: "translateY(-10px)" },
        "100%": { opacity: 0, transform: "translateY(-20px)" },
      },
      "smoke-bounce": {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-10px)" },
      },
    },
  },
};
export const darkMode = "class";
export const plugins = [];
