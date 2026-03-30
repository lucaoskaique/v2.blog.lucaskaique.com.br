import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <Head>
        {/* Syntax highlighting with highlight.js - VS Code dark theme */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css"
        />
      </Head>
      <body className="h-full bg-zinc-50 dark:bg-black">
        <div className="">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
