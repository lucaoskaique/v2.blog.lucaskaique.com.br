import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { GoogleTagManager } from "@next/third-parties/google"
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
      <GoogleTagManager gtmId="GTM-TWGHHR26" />
      <div className="flex w-full">
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
