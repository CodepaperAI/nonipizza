import type { Config } from "tailwindcss";

/**
 * Design tokens — see DESIGN.md §1–§3. Colors reference the CSS variables declared in
 * src/app/globals.css so the same tokens are available to both Tailwind classes and
 * raw CSS. Never inline raw hex in components — use these token classes.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "var(--maroon)",
          800: "var(--maroon-800)",
          900: "var(--maroon-900)",
        },
        cream: {
          DEFAULT: "var(--cream)",
          200: "var(--cream-200)",
        },
        orange: {
          DEFAULT: "var(--orange)",
          600: "var(--orange-600)",
        },
        yellow: { DEFAULT: "var(--yellow)" },
        sky: { DEFAULT: "var(--sky)" },
        pink: { DEFAULT: "var(--pink)" },
        red: { DEFAULT: "var(--red)" },
        ink: { DEFAULT: "var(--ink)" },
        muted: { DEFAULT: "var(--muted)" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(3.5rem, 9vw, 8rem)", { lineHeight: "0.9" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "0.95" }],
        "display-lg": ["2rem", { lineHeight: "1.0" }],
        "heading-md": ["1.375rem", { lineHeight: "1.15" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(0,0,0,0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
