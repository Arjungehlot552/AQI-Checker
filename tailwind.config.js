/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  theme: {
    extend: {
      animation: {
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
    },
  },
  extend: {
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'scale(0.95)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
      cross: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(180deg)' },
      },
      hamburger: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(90deg)' },
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
    animation: {
      'fade-in': 'fadeIn 0.3s ease-out',
      cross: 'cross 0.4s ease-in-out',
      hamburger: 'hamburger 0.4s ease-in-out',
      smoke: "smoke 3s infinite",
      "smoke-bounce": "smoke-bounce 2s infinite",
    },
  },
};
export const plugins = [];


