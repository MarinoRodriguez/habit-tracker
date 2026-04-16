import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#fefcff",
        "secondary-container": "#6cf8bb",
        "on-surface": "#191b23",
        "inverse-on-surface": "#eff0fa",
        "surface-bright": "#f9f9ff",
        "primary-fixed-dim": "#adc6ff",
        "surface-tint": "#005ac2",
        "surface-container-high": "#e6e7f2",
        "surface-dim": "#d8d9e3",
        "on-tertiary": "#ffffff",
        background: "#f9f9ff",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-container": "#fffbff",
        outline: "#727785",
        "tertiary-container": "#da3437",
        "surface-container-highest": "#e1e2ec",
        "on-secondary-container": "#00714d",
        "outline-variant": "#c2c6d6",
        "on-primary": "#ffffff",
        "inverse-surface": "#2e3038",
        "on-surface-variant": "#424754",
        "primary-fixed": "#d8e2ff",
        secondary: "#006c49",
        "on-tertiary-fixed-variant": "#930013",
        "on-primary-fixed": "#001a42",
        "on-secondary-fixed": "#002113",
        "on-primary-fixed-variant": "#004395",
        "tertiary-fixed": "#ffdad7",
        "on-tertiary-fixed": "#410004",
        "on-background": "#191b23",
        "tertiary-fixed-dim": "#ffb3ad",
        "inverse-primary": "#adc6ff",
        "secondary-fixed": "#6ffbbe",
        "on-error": "#ffffff",
        "on-secondary": "#ffffff",
        "on-error-container": "#93000a",
        error: "#ba1a1a",
        "on-secondary-fixed-variant": "#005236",
        surface: "#f9f9ff",
        "primary-container": "#2170e4",
        primary: "#0058be",
        "surface-container-low": "#f2f3fd",
        "surface-container": "#ecedf7",
        "error-container": "#ffdad6",
        tertiary: "#b61722",
        "secondary-fixed-dim": "#4edea3",
        "surface-variant": "#e1e2ec",
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },

      fontSize: {
        "display-lg": ["3.5rem", { letterSpacing: "-0.02em" }],
        "display-sm": ["2rem", { letterSpacing: "-0.01em" }],
        "body-md": ["0.875rem", { lineHeight: "1.5rem" }],
      },

      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },

      boxShadow: {
        ambient: "0px 24px 48px rgba(25, 27, 35, 0.06)",
      },

      backdropBlur: {
        glass: "24px",
      },

      transitionTimingFunction: {
        kinetic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      backgroundImage: {
        "primary-gradient": "linear-gradient(to bottom, #0058be, #2170e4)",
      },
    },
  },
  plugins: [],
} satisfies Config;
