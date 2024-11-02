import typographyPlugin from "@tailwindcss/typography"
import type { Config } from "tailwindcss"

import typographyStyles from "./typography"

// const defaultTiming = "0.2s ease"
// const bgTransition = `background ${defaultTiming}`
// const colorTransition = `color ${defaultTiming}`
// const defaultTransition = `${bgTransition}, ${colorTransition}`

// const containerPlugin: PluginCreator = ({ addUtilities }) => {
//   const newUtilities = {
//     ".transition-default": {
//       transition: defaultTransition
//     },
//     ".transition-color": {
//       transition: colorTransition
//     },
//     ".transition-background": {
//       transition: bgTransition
//     },
//     ".transition-all-custom": {
//       transition: `all ${defaultTiming}`
//     }
//   }

//   addUtilities(newUtilities)
// }

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  plugins: [typographyPlugin],
  theme: {
    extend: {
      animation: {
        scroll: "scroll 40s linear infinite"
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 7))" }
        }
      }
    },
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }]
    },
    typography: typographyStyles
  }
}
export default config
