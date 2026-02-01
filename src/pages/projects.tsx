import { getGitHubRepositories } from "@/lib/api"
import Projects from "@/templates/Projects"
import { GitHubRepository } from "@/types"

interface ProjectsPageProps {
  repositories: GitHubRepository[]
}

export default function ProjectsPage({ repositories }: ProjectsPageProps) {
  return <Projects repositories={repositories} />
}

export async function getStaticProps() {
  const repositories = await getGitHubRepositories("lucaoskaique")

  return {
    props: {
      repositories
    },
    // Revalidate every hour in production
    revalidate: 3600
  }
}
