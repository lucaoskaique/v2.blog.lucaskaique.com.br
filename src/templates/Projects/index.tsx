import { type Metadata } from "next"
import { ComponentPropsWithoutRef } from "react"

import { Card } from "@/components/Card"
import { Container } from "@/components/Container"
import { GitHubRepository } from "@/types"

import Base from "../Base"

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

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source projects and repositories I've built and contributed to."
}

interface ProjectsProps {
  repositories: GitHubRepository[]
}

export default function Projects({ repositories }: ProjectsProps) {
  return (
    <Base>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Open-source projects and contributions
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I've worked on various open-source projects over the years. These
            are my public repositories on GitHub, sorted by popularity. If you
            see something interesting, feel free to check out the code and
            contribute if you have ideas for improvements.
          </p>
        </header>
        <div className="mt-16 sm:mt-20">
          {repositories.length === 0 ? (
            <div className="text-center text-zinc-600 dark:text-zinc-400">
              <p>No repositories available at the moment.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {repositories.map((repo) => (
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
                          className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                        >
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
                        <span className="inline-block h-3 w-3 rounded-full bg-teal-500 mr-1" />
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
      </Container>
    </Base>
  )
}
