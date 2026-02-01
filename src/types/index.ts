export interface Post {
  frontmatter: PostFrontmatter
  content: string
  slug: string
  date: string
}

interface PostFrontmatter {
  title: string
  "main-class": string
  description: string
  date: string
}

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
