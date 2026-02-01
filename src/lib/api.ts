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
  // Use mock data in development if GITHUB_TOKEN is not set
  if (process.env.NODE_ENV === "development" && !process.env.GITHUB_TOKEN) {
    console.log("Using mock GitHub repository data (no GITHUB_TOKEN set)")
    return getMockRepositories()
  }

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

/**
 * Returns mock repository data for development/testing
 */
function getMockRepositories(): GitHubRepository[] {
  return [
    {
      id: 1,
      name: "entregacao-app",
      full_name: "lucaoskaique/entregacao-app",
      description:
        "Sistema Automatizado de Coletas e Entregas - Automated Collection and Delivery System",
      html_url: "https://github.com/lucaoskaique/entregacao-app",
      homepage: "https://entregacao.vercel.app",
      stargazers_count: 7,
      forks_count: 2,
      topics: ["nextjs", "typescript", "tailwindcss", "delivery", "automation"],
      fork: false,
      updated_at: "2024-01-15T10:30:00Z",
      language: "TypeScript"
    },
    {
      id: 2,
      name: "resgatemais",
      full_name: "lucaoskaique/resgatemais",
      description:
        "Organização Audiovisual da Sociedade Civil - Civil Society Audiovisual Organization",
      html_url: "https://github.com/lucaoskaique/resgatemais",
      homepage: null,
      stargazers_count: 5,
      forks_count: 1,
      topics: ["nextjs", "react", "social"],
      fork: false,
      updated_at: "2024-01-10T08:20:00Z",
      language: "JavaScript"
    },
    {
      id: 3,
      name: "mp4-to-mp3-ffmpeg",
      full_name: "lucaoskaique/mp4-to-mp3-ffmpeg",
      description:
        "Video to audio converter using FFmpeg - Simple and efficient media conversion tool",
      html_url: "https://github.com/lucaoskaique/mp4-to-mp3-ffmpeg",
      homepage: "",
      stargazers_count: 4,
      forks_count: 0,
      topics: ["ffmpeg", "converter", "video", "audio", "python"],
      fork: false,
      updated_at: "2023-12-20T15:45:00Z",
      language: "Python"
    },
    {
      id: 4,
      name: "portfolio-v2",
      full_name: "lucaoskaique/portfolio-v2",
      description:
        "Personal portfolio website built with Next.js and modern web technologies",
      html_url: "https://github.com/lucaoskaique/portfolio-v2",
      homepage: "https://lucaskaique.com.br",
      stargazers_count: 3,
      forks_count: 1,
      topics: ["portfolio", "nextjs", "react", "tailwindcss"],
      fork: false,
      updated_at: "2024-02-01T12:00:00Z",
      language: "TypeScript"
    },
    {
      id: 5,
      name: "github-api-explorer",
      full_name: "lucaoskaique/github-api-explorer",
      description:
        "A tool to explore GitHub repositories and user profiles with a clean interface",
      html_url: "https://github.com/lucaoskaique/github-api-explorer",
      homepage: null,
      stargazers_count: 2,
      forks_count: 0,
      topics: ["github-api", "react", "typescript"],
      fork: false,
      updated_at: "2023-11-15T09:30:00Z",
      language: "TypeScript"
    },
    {
      id: 6,
      name: "blog-cms",
      full_name: "lucaoskaique/blog-cms",
      description:
        "Content Management System for blogs with markdown support",
      html_url: "https://github.com/lucaoskaique/blog-cms",
      homepage: "",
      stargazers_count: 1,
      forks_count: 0,
      topics: ["cms", "markdown", "nodejs"],
      fork: false,
      updated_at: "2023-10-05T14:20:00Z",
      language: "JavaScript"
    }
  ]
}
