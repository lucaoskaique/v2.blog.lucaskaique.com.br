import { GetStaticPaths, GetStaticProps } from "next"

import { getAboutContent } from "@/lib/content"
import { Locale, locales } from "@/lib/i18n"
import About from "@/templates/About"
import { AboutContent } from "@/types"

interface AboutPageProps {
  content: AboutContent
}

export default function AboutPage({ content }: AboutPageProps) {
  return <About content={content} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = locales.map((locale) => ({
    params: { locale }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = (params?.locale as Locale) || "pt-BR"
  const content = getAboutContent(locale)

  return {
    props: {
      content
    }
  }
}
