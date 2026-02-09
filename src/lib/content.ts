import fs from 'fs'
import yaml from 'js-yaml'
import { join } from 'path'

import {
  AboutContent,
  PageContent,
  ProjectsContent,
  ResumeContent,
  SetupContent,
  SiteContent,
  SpeakingContent
} from '@/types'

const contentDirectory = join(process.cwd(), 'content')

export function getPageContent<T>(
  filename: string,
  locale: string = 'pt-BR'
): T {
  const fullPath = join(contentDirectory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const data = yaml.load(fileContents) as PageContent<T>

  return data[locale as keyof PageContent] || data['pt-BR']
}

// Helper functions for each page
export function getAboutContent(locale: string = 'pt-BR'): AboutContent {
  return getPageContent<AboutContent>('about.yml', locale)
}

export function getProjectsContent(locale: string = 'pt-BR'): ProjectsContent {
  return getPageContent<ProjectsContent>('projects.yml', locale)
}

export function getSetupContent(locale: string = 'pt-BR'): SetupContent {
  return getPageContent<SetupContent>('setup.yml', locale)
}

export function getSpeakingContent(locale: string = 'pt-BR'): SpeakingContent {
  return getPageContent<SpeakingContent>('speaking.yml', locale)
}

export function getSiteContent(locale: string = 'pt-BR'): SiteContent {
  return getPageContent<SiteContent>('site.yml', locale)
}

export function getResumeContent(locale: string = 'pt-BR'): ResumeContent {
  return getPageContent<ResumeContent>('resume.yml', locale)
}
