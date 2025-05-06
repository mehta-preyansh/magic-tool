import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        overlay: "var(--overlay)",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          color: "var(--color-primary)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          color: "var(--color-secondary)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          color: "var(--color-accent)",
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
          color: "var(--color-highlight)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          color: "var(--color-muted)",
        },

        info: {
          DEFAULT: "hsl(var(--info))",
          color: "var(--color-info)",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          color: "var(--color-success)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          color: "var(--color-warning)",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          color: "var(--color-danger)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
