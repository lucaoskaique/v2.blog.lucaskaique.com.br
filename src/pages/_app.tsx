import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import Script from "next/script"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"
import { useEffect } from "react"

import SEO from "../../next-seo.config"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialize highlight.js when scripts are loaded and route changes
    const initHighlight = () => {
      if (typeof window !== "undefined" && (window as any).hljs) {
        // Re-highlight all code blocks
        document.querySelectorAll("pre code").forEach((block) => {
          ;(window as any).hljs.highlightElement(block)
        })
      }
    }

    // Run after a short delay to ensure scripts and DOM are ready
    const timer = setTimeout(initHighlight, 200)
    return () => clearTimeout(timer)
  }, [router.asPath]) // Re-run when route changes

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
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/toml.min.js"
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
