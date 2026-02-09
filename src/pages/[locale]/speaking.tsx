import { GetStaticPaths } from "next"

import { locales } from "@/lib/i18n"
import Speaking from "@/templates/Speaking"

export default function SpeakingPage() {
  return <Speaking />
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
