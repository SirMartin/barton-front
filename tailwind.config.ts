import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Montserrat"',
          '"Roboto"',
          '"Open Sans"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        barton: {
          primary: '#9f631e',
          secondary: '#bd6f16',
          light: '#e0cab0',
          dark: '#333333',
          accent: {
            brown: '#9f631e',
            lightBrown: '#bd6f16',
            tan: '#e0cab0',
          }
        },
      },
      borderRadius: {
        'barton': '6px',
        'barton-button': '10px',
        'barton-pill': '25px',
      },
      boxShadow: {
        'barton': '0 0px 2px rgba(0,0,0,0.15)',
        'barton-strong': '0 5px 5px 0 rgba(0,0,0,0.2)',
      },
      maxWidth: {
        'barton': '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config;
