import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        pink: {
          soft: "#F4C2C2",
          deep: "#E8A0A0",
          glow: "#FF6B9D",
        },
        sage: "#B5C8B7",
        peach: "#FFDAB9",
        dusty: {
          pink: "#E8C5C0",
          rose: "#D4A5A5",
        },
        night: "#1a1a2e",
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;