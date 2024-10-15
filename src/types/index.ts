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
