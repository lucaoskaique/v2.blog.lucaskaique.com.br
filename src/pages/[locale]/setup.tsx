import { GetStaticPaths } from "next"

import { locales } from "@/lib/i18n"
import Setup from "@/templates/Setup"

export default function SetupPage() {
  return <Setup />
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

export async function getStaticProps() {
  return {
    props: {}
  }
}
