import { defaultLocale, type Locale, locales } from "./i18n"

/**
 * Get the current locale from a pathname
 * @param pathname - The current pathname
 * @returns The current locale or default locale
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }

  return defaultLocale
}

/**
 * Build a localized path
 * @param path - The path without locale (e.g., '/about', '/posts/my-post')
 * @param locale - The target locale
 * @returns The localized path (e.g., '/pt-BR/about', '/en/posts/my-post')
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path

  // Build the localized path
  return `/${locale}${cleanPath ? `/${cleanPath}` : ""}`
}

/**
 * Remove locale from pathname
 * @param pathname - The pathname with locale
 * @returns The pathname without locale
 */
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    const remainingPath = segments.slice(1).join("/")
    return remainingPath ? `/${remainingPath}` : "/"
  }

  return pathname
}
