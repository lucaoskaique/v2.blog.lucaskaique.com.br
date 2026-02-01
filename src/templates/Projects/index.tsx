"use client"

import { type Metadata } from "next"
import { ComponentPropsWithoutRef, useMemo, useState } from "react"

import { Card } from "@/components/Card"
import { Container } from "@/components/Container"
import { GitHubRepository } from "@/types"

import Base from "../Base"

type ProjectCategory = "all" | "frontend" | "backend" | "fullstack"

function LinkIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GitHubIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        fill="currentColor"
      />
    </svg>
  )
}

function StarIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Returns a Tailwind color class based on the programming language
 */
function getLanguageColor(language: string): string {
  const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-500",
    Java: "bg-orange-600",
    Go: "bg-cyan-500",
    Rust: "bg-orange-500",
    Ruby: "bg-red-500",
    PHP: "bg-purple-500",
    Swift: "bg-orange-400",
    Kotlin: "bg-purple-600",
    Dart: "bg-blue-400",
    C: "bg-gray-500",
    "C++": "bg-pink-500",
    "C#": "bg-purple-700",
    HTML: "bg-orange-600",
    CSS: "bg-blue-600",
    Shell: "bg-green-600",
    Vue: "bg-green-600",
    React: "bg-blue-400"
  }

  return languageColors[language] || "bg-teal-500"
}

/**
 * Categorizes a repository based on its topics and language
 */
function categorizeRepository(repo: GitHubRepository): ProjectCategory {
  const topics = repo.topics.map((t) => t.toLowerCase())
  const language = repo.language?.toLowerCase() || ""

  const frontendIndicators = [
    "react",
    "vue",
    "nextjs",
    "angular",
    "svelte",
    "frontend",
    "ui",
    "css",
    "html",
    "tailwindcss"
  ]
  const backendIndicators = [
    "api",
    "backend",
    "server",
    "express",
    "fastapi",
    "django",
    "flask",
    "nestjs"
  ]

  const hasFrontend =
    topics.some((t) => frontendIndicators.includes(t)) ||
    ["typescript", "javascript"].includes(language)
  const hasBackend =
    topics.some((t) => backendIndicators.includes(t)) ||
    ["python", "go", "java", "ruby", "php", "c#"].includes(language)

  if (hasFrontend && hasBackend) return "fullstack"
  if (hasFrontend) return "frontend"
  if (hasBackend) return "backend"
  return "fullstack" // Default to fullstack if unclear
}

/**
 * Calculates language statistics from repositories
 */
function calculateLanguageStats(
  repositories: GitHubRepository[]
): Array<{ language: string; percentage: number; count: number }> {
  const languageCounts: Record<string, number> = {}
  let total = 0

  repositories.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
      total++
    }
  })

  const stats = Object.entries(languageCounts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: (count / total) * 100
    }))
    .sort((a, b) => b.count - a.count)

  // Group languages with < 5% into "Other"
  const mainLanguages = stats.filter((s) => s.percentage >= 5)
  const otherLanguages = stats.filter((s) => s.percentage < 5)

  if (otherLanguages.length > 0) {
    const otherPercentage = otherLanguages.reduce(
      (sum, s) => sum + s.percentage,
      0
    )
    const otherCount = otherLanguages.reduce((sum, s) => sum + s.count, 0)
    mainLanguages.push({
      language: "Other",
      percentage: otherPercentage,
      count: otherCount
    })
  }

  return mainLanguages
}

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source projects and repositories I've built and contributed to."
}

interface ProjectsProps {
  repositories: GitHubRepository[]
}

export default function Projects({ repositories }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  // Calculate language statistics
  const languageStats = useMemo(
    () => calculateLanguageStats(repositories),
    [repositories]
  )

  // Filter repositories based on selected category and language
  const filteredRepositories = useMemo(() => {
    let filtered = repositories

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (repo) => categorizeRepository(repo) === selectedCategory
      )
    }

    // Filter by language
    if (selectedLanguage && selectedLanguage !== "Other") {
      filtered = filtered.filter((repo) => repo.language === selectedLanguage)
    } else if (selectedLanguage === "Other") {
      const mainLanguages = languageStats
        .filter((s) => s.language !== "Other")
        .map((s) => s.language)
      filtered = filtered.filter(
        (repo) => repo.language && !mainLanguages.includes(repo.language)
      )
    }

    return filtered
  }, [repositories, selectedCategory, selectedLanguage, languageStats])

  const categories: Array<{ id: ProjectCategory; label: string }> = [
    { id: "all", label: "All Projects" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Fullstack" }
  ]

  return (
    <Base>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Open-source projects and contributions
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;ve worked on various open-source projects over the years.
            These are my public repositories on GitHub, sorted by popularity. If
            you see something interesting, feel free to check out the code and
            contribute if you have ideas for improvements.
          </p>
        </header>

        {repositories.length > 0 && (
          <>
            {/* Category Tabs */}
            <div className="mt-12 border-b border-zinc-200 dark:border-zinc-700">
              <nav className="-mb-px flex gap-6" aria-label="Project categories">
                {categories.map((category) => {
                  const isActive = selectedCategory === category.id
                  const count =
                    category.id === "all"
                      ? repositories.length
                      : repositories.filter(
                          (r) => categorizeRepository(r) === category.id
                        ).length

                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setSelectedLanguage(null) // Reset language filter
                      }}
                      className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-teal-500 text-teal-600 dark:text-teal-400"
                          : "border-transparent text-zinc-600 hover:border-zinc-300 hover:text-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
                      }`}>
                      {category.label}
                      <span
                        className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                          isActive
                            ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Language Filter Sidebar */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Languages
                  </h3>
                  <div className="mt-4 space-y-3">
                    <button
                      onClick={() => setSelectedLanguage(null)}
                      className={`flex w-full items-center justify-between text-left text-sm transition-colors ${
                        selectedLanguage === null
                          ? "font-medium text-teal-600 dark:text-teal-400"
                          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                      }`}>
                      <span>All Languages</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-500">
                        {filteredRepositories.length}
                      </span>
                    </button>
                    {languageStats.map((stat) => (
                      <button
                        key={stat.language}
                        onClick={() => setSelectedLanguage(stat.language)}
                        className={`flex w-full items-center justify-between text-left text-sm transition-colors ${
                          selectedLanguage === stat.language
                            ? "font-medium text-teal-600 dark:text-teal-400"
                            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                        }`}>
                        <span className="flex items-center gap-2">
                          <span
                            className={`inline-block h-3 w-3 rounded-full ${getLanguageColor(stat.language)}`}
                          />
                          <span>{stat.language}</span>
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-500">
                          {stat.percentage.toFixed(1)}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Repository Grid */}
              <div className="lg:col-span-3">
                {filteredRepositories.length === 0 ? (
                  <div className="text-center text-zinc-600 dark:text-zinc-400">
                    <p>No repositories match the selected filters.</p>
                  </div>
                ) : (
                  <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
                    {filteredRepositories.map((repo) => (
                      <Card as="li" key={repo.id}>
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                          <GitHubIcon className="h-7 w-7 fill-zinc-700 dark:fill-zinc-400" />
                        </div>
                        <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                          <Card.Link href={repo.html_url}>{repo.name}</Card.Link>
                        </h2>
                        <Card.Description>
                          {repo.description || "No description available"}
                        </Card.Description>
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                            {repo.topics.slice(0, 5).map((topic) => (
                              <span
                                key={topic}
                                className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="relative z-10 mt-6 flex items-center gap-4 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1">
                              <StarIcon className="h-4 w-4 fill-current" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                          )}
                          {repo.language && (
                            <div className="flex items-center">
                              <span
                                className={`inline-block h-3 w-3 rounded-full mr-1 ${getLanguageColor(repo.language)}`}
                              />
                              <span>{repo.language}</span>
                            </div>
                          )}
                        </div>
                        {repo.homepage && (
                          <p className="relative z-10 mt-4 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                            <LinkIcon className="h-6 w-6 flex-none" />
                            <span className="ml-2 truncate">{repo.homepage}</span>
                          </p>
                        )}
                      </Card>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}

        {repositories.length === 0 && (
          <div className="mt-16 text-center text-zinc-600 dark:text-zinc-400">
            <p>No repositories available at the moment.</p>
          </div>
        )}
      </Container>
    </Base>
  )
}
