import fs from "fs"
import matter from "gray-matter"
import { join } from "path"

import { GitHubRepository, Post } from "@/types"

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

/**
 * Fetches all GitHub repositories for a given username
 * Handles pagination to get all repositories
 * @param username - GitHub username
 * @returns Array of GitHub repositories sorted by stars
 */
export async function getGitHubRepositories(
  username: string
): Promise<GitHubRepository[]> {
  try {
    const repos: GitHubRepository[] = []
    let page = 1
    const perPage = 100
    let hasMore = true

    // Fetch all pages of repositories
    while (hasMore) {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json"
      }

      // Add authorization if GITHUB_TOKEN is available
      if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
      }

      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
        {
          headers,
          // Don't use Next.js caching, use standard fetch
          cache: "no-store"
        }
      )

      if (!response.ok) {
        console.error(
          `Failed to fetch GitHub repositories: ${response.status} ${response.statusText}`
        )
        // Return empty array on error to allow build to continue
        return []
      }

      const data = (await response.json()) as GitHubRepository[]

      if (data.length === 0) {
        hasMore = false
      } else {
        repos.push(...data)
        page++
        // If we got less than perPage, we're on the last page
        if (data.length < perPage) {
          hasMore = false
        }
      }
    }

    // Filter out forked repositories and sort by stars
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return []
  }
}
