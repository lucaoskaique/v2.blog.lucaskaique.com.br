import type { Config } from "tailwindcss"
import { PluginCreator } from "tailwindcss/types/config"

const defaultTiming = "0.2s ease"
const bgTransition = `background ${defaultTiming}`
const colorTransition = `color ${defaultTiming}`
const defaultTransition = `${bgTransition}, ${colorTransition}`

const containerPlugin: PluginCreator = ({ addUtilities }) => {
  const newUtilities = {
    ".transition-default": {
      transition: defaultTransition
    },
    ".transition-color": {
      transition: colorTransition
    },
    ".transition-background": {
      transition: bgTransition
    },
    ".transition-all-custom": {
      transition: `all ${defaultTiming}`
    }
  }

  addUtilities(newUtilities)
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem"
        },
        screens: {
          sm: "100%", // Full width for small screens (mobile)
          md: "100%", // Full width for medium screens (tablet)
          lg: "1024px", // 1024px width for large screens (desktop)
          xl: "1280px", // 1280px width for extra-large screens (desktop)
          "2xl": "1536px" // 1536px width for double extra-large screens (desktop)
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ]
      },
      padding: {
        container: "4.5rem",
        section: "6rem"
      },
      colors: {
        background: "var(--background)",
        borders: "var(--borders)",
        texts: "var(--texts)",
        postColor: "var(--postColor)",
        highlight: "var(--highlight)",
        mediumBackground: "var(--mediumBackground)",
        white: "var(--white)",
        black: "var(--black)"
      },
      boxShadow: {
        button: "0px 0px 0px 1px rgba(0, 0, 0, 0.2) inset"
      }
    }
  },
  plugins: [containerPlugin]
}
export default config
