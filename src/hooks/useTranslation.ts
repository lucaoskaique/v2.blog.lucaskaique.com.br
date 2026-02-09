import { useRouter } from "next/router"

import { getTranslation, Locale } from "@/lib/i18n"
import { getLocaleFromPathname } from "@/lib/locale"

export function useTranslation() {
  const router = useRouter()
  const locale = getLocaleFromPathname(router.asPath) as Locale
  const t = getTranslation(locale)

  return { t, locale }
}
