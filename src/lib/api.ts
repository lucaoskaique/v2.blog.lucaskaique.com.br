import fs from "fs"
import matter from "gray-matter"
import { join } from "path"

import { Post } from "@/types"

const postsDirectory = join(process.cwd(), "posts")

export function getPostBySlug(slug: string): Post | null {
  if (!slug) return null

  try {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const postData = data as Post["frontmatter"]

    const date = new Date(postData.date).toString()

    return {
      slug: realSlug,
      date: new Date(postData.date).toString(),
      frontmatter: {
        ...postData,
        date
      },
      content
    }
  } catch (error) {
    console.error("Error reading the file:", error)
    return null
  }
}

export function getAllPosts(): Post[] {
  const slugs = fs.readdirSync(postsDirectory)
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.md$/, "")))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) =>
      new Date(post2.date) > new Date(post1.date) ? 1 : -1
    )

  return posts
}
