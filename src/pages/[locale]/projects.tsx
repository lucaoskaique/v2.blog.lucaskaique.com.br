import { GetStaticPaths, GetStaticProps } from "next"

import { getGitHubRepositories } from "@/lib/api"
import { locales } from "@/lib/i18n"
import Projects from "@/templates/Projects"
import { GitHubRepository } from "@/types"

interface ProjectsPageProps {
  repositories: GitHubRepository[]
}

export default function ProjectsPage({ repositories }: ProjectsPageProps) {
  return <Projects repositories={repositories} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = locales.map((locale) => ({
    params: { locale }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const repositories = await getGitHubRepositories("lucaoskaique")

  return {
    props: {
      repositories
    },
    // Revalidate every hour in production
    revalidate: 3600
  }
}
