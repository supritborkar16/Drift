import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          hover: "rgb(var(--color-primary-hover) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",
        category: {
          idea: "rgb(var(--color-category-idea) / <alpha-value>)",
          problem: "rgb(var(--color-category-problem) / <alpha-value>)",
          task: "rgb(var(--color-category-task) / <alpha-value>)",
          research: "rgb(var(--color-category-research) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["32px", { lineHeight: "38px", fontWeight: "700" }],
        h1: ["24px", { lineHeight: "30px", fontWeight: "650" }],
        h2: ["20px", { lineHeight: "26px", fontWeight: "650" }],
        h3: ["16px", { lineHeight: "22px", fontWeight: "650" }],
        body: ["14px", { lineHeight: "20px" }],
        small: ["12px", { lineHeight: "16px" }],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        16: "64px",
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "20px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.04)",
        md: "0 4px 8px rgba(0,0,0,0.06)",
        lg: "0 10px 20px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
