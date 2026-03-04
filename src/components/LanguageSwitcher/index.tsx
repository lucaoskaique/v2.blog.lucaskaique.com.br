import { Globe } from 'lucide-react'
import { useRouter } from 'next/router'

import { Locale, localeNames, locales } from '@/lib/i18n'
import { getLocaleFromPathname, getLocalizedPath, removeLocaleFromPathname } from '@/lib/locale'

const LOCALE_COOKIE = 'NEXT_LOCALE'

export default function LanguageSwitcher() {
  const router = useRouter()
  const currentLocale = getLocaleFromPathname(router.asPath)
  const pathWithoutLocale = removeLocaleFromPathname(router.asPath)

  const handleLocaleChange = (newLocale: Locale) => {
    // Set the cookie to persist the user's preference
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year

    // Build the new URL with the new locale
    const newPath = getLocalizedPath(pathWithoutLocale, newLocale)

    // Navigate to the new locale path
    router.push(newPath)
  }

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        <select
          value={currentLocale}
          onChange={(e) => handleLocaleChange(e.target.value as Locale)}
          className="bg-transparent border border-zinc-300 dark:border-zinc-600 rounded-md px-2 py-1 text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 cursor-pointer"
          aria-label="Select language"
        >
          {locales.map((locale) => (
            <option key={locale} value={locale} className="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
              {localeNames[locale]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
