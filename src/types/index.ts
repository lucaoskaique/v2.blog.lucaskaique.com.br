// ============================================================================
// Post Types
// ============================================================================
export interface Post {
  frontmatter: PostFrontmatter
  content: string
  slug: string
  date: string
  locale?: string
}

export interface PostPreview {
  frontmatter: PostFrontmatter
  slug: string
  date: string
  locale?: string
}

interface PostFrontmatter {
  title: string
  "main-class": string
  description: string
  date: string
  locale?: string
}

// ============================================================================
// GitHub Types
// ============================================================================
export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  fork: boolean
  updated_at: string
  language: string | null
}

// ============================================================================
// Content Types (CMS/YAML)
// ============================================================================
export interface PageContent<T = any> {
  "pt-BR": T
  en: T
}

export interface AboutContent {
  title: string
  heading: string
  intro: string
  paragraphs: string[]
  email: string
}

export interface ProjectsContent {
  title: string
  heading: string
  intro: string
  categoryLabels: {
    all: string
    frontend: string
    backend: string
    fullstack: string
  }
  filterLabel: string
  githubLabel: string
  websiteLabel: string
  starsLabel: string
}

export interface SetupSection {
  category: string
  items: Array<{
    name: string
    description: string
  }>
}

export interface SetupContent {
  title: string
  heading: string
  intro: string
  sections: SetupSection[]
}

export interface Talk {
  title: string
  event: string
  date: string
  description: string
  slides?: string
  video?: string
}

export interface SpeakingContent {
  title: string
  heading: string
  intro: string
  upcomingTitle: string
  pastTitle: string
  noUpcoming: string
  talks: Talk[]
}

export interface SiteContent {
  siteName: string
  siteDescription: string
  navigation: {
    home: string
    about: string
    posts: string
    projects: string
    speaking: string
    setup: string
  }
  footer: {
    rights: string
    builtWith: string
  }
}

export interface Role {
  company: string
  title: string
  logo: string
  start: string
  end: string
}

export interface ResumeContent {
  roles: Role[]
}

// ============================================================================
// Component Props Types
// ============================================================================
export interface RoleProps {
  company: string
  title: string
  logo: string
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}
