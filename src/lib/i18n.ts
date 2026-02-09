export const locales = ["pt-BR", "en"] as const

export const defaultLocale: Locale = "pt-BR"

export type Locale = "pt-BR" | "en"

export const localeNames: Record<Locale, string> = {
  "pt-BR": "Português",
  en: "English"
}

export const translations = {
  "pt-BR": {
    home: "Início",
    posts: "Posts",
    about: "Sobre",
    projects: "Projetos",
    speaking: "Palestras",
    setup: "Setup",
    readMore: "Leia mais",
    readingTime: "min de leitura",
    publishedOn: "Publicado em",
    updatedOn: "Atualizado em",
    tags: "Tags",
    categories: "Categorias",
    recentPosts: "Posts Recentes",
    allPosts: "Todos os Posts",
    noPosts: "Nenhum post encontrado",
    search: "Buscar",
    searchPlaceholder: "Buscar posts...",
    prevPost: "Post Anterior",
    nextPost: "Próximo Post",
    backToHome: "Voltar para o Início",
    privacy: "Política de Privacidade",
    language: "Idioma"
  },
  en: {
    home: "Home",
    posts: "Posts",
    about: "About",
    projects: "Projects",
    speaking: "Speaking",
    setup: "Setup",
    readMore: "Read more",
    readingTime: "min read",
    publishedOn: "Published on",
    updatedOn: "Updated on",
    tags: "Tags",
    categories: "Categories",
    recentPosts: "Recent Posts",
    allPosts: "All Posts",
    noPosts: "No posts found",
    search: "Search",
    searchPlaceholder: "Search posts...",
    prevPost: "Previous Post",
    nextPost: "Next Post",
    backToHome: "Back to Home",
    privacy: "Privacy Policy",
    language: "Language"
  }
} as const

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}

export function formatLocaleForUrl(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const localePrefix = formatLocaleForUrl(locale)
  return `${localePrefix}${path}`
}
