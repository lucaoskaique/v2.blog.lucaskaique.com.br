import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"

import CookieConsent from "@/components/CookieConsent"

import SEO from "../../next-seo.config"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange>
      <div className="flex w-full">
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </div>
      <CookieConsent />
    </ThemeProvider>
  )
}
