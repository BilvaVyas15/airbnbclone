import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        rausch: "#FF385C",
        hof: "#222222",
        foggy: "#717171",
        babu: "#00A699",
      },
      fontFamily: {
        circular: [
          "Circular",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 6px 16px rgba(0,0,0,0.12)",
        popover: "0 2px 16px rgba(0,0,0,0.24)",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out",
        scaleIn: "scaleIn 200ms ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
