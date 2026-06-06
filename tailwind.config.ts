import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FAF6EE", dark: "#F0E8D8" },
        forest: { DEFAULT: "#1E3A2F", light: "#2C4A3E", muted: "#3D6B58" },
        terra: { DEFAULT: "#B85C38", light: "#C97A56", muted: "#E8C4A8" },
        moss: { DEFAULT: "#5C7A50", light: "#7A9E6B", muted: "#C4D9BB" },
        bark: { DEFAULT: "#4A3220", light: "#6B4C32", muted: "#C4A882" },
        blush: { DEFAULT: "#E8C4A8", light: "#F2DDD0", pale: "#FAF0E8" },
        parch: { DEFAULT: "#F5EDE0", dark: "#E8D8C0" },
        sand: { DEFAULT: "#D4B896", muted: "#EAD8C0" },
        ink: { DEFAULT: "#1A1410" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        script: ["var(--font-script)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Jost", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "1" }],
        "11xl": ["12rem", { lineHeight: "1" }],
        "12xl": ["14rem", { lineHeight: "0.9" }],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
