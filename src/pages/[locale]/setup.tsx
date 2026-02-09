import { GetStaticPaths, GetStaticProps } from "next"

import { getSetupContent } from "@/lib/content"
import { Locale, locales } from "@/lib/i18n"
import Setup from "@/templates/Setup"
import { SetupContent } from "@/types"

interface SetupPageProps {
  content: SetupContent
}

export default function SetupPage({ content }: SetupPageProps) {
  return <Setup content={content} />
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
  const content = getSetupContent(locale)

  return {
    props: {
      content
    }
  }
}
