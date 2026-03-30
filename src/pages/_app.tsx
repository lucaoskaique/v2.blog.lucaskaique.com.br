import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"

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
    </ThemeProvider>
  )
}
