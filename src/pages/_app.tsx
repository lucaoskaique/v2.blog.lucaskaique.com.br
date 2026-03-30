import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Script from "next/script"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"
import { useEffect } from "react"

import SEO from "../../next-seo.config"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize highlight.js when scripts are loaded
    const initHighlight = () => {
      if (typeof window !== "undefined" && (window as any).hljs) {
        ;(window as any).hljs.highlightAll()
      }
    }

    // Run after a short delay to ensure scripts are loaded
    const timer = setTimeout(initHighlight, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange>
      <div className="flex w-full">
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />

        {/* Highlight.js for syntax highlighting */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/rust.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/typescript.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/javascript.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/bash.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/json.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/yaml.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/python.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/sql.min.js"
          strategy="afterInteractive"
        />
      </div>
    </ThemeProvider>
  )
}
