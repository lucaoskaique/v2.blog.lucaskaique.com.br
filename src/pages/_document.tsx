import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="pt-BR" className="h-full antialiased">
      <Head />
      <body className="h-full bg-zinc-50 dark:bg-black">
        <div className="">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
