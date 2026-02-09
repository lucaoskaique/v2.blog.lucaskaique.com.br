import fs from "fs"
import { GetStaticPaths, GetStaticProps } from "next"

import { getAllPostPreviews } from "@/lib/api"
//TODO: implementar algolia
// import { buildAlgoliaIndexes } from "@/lib/buildAlgoliaIndexes"
import { getResumeContent } from "@/lib/content"
import { generateRss } from "@/lib/generateRSS"
import { generateSitemap } from "@/lib/generateSitemap"
import { Locale, locales } from "@/lib/i18n"
import Home from "@/templates/Home"
import { PostPreview, Role } from "@/types"

export default function Index({
  posts,
  resume
}: {
  posts: PostPreview[]
  resume: Role[]
}) {
  // if (posts) return <p>{JSON.stringify(posts[0], null, 2)}</p>

  return <Home posts={posts} resume={resume} />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = (params?.locale as Locale) || "pt-BR"
  const posts = getAllPostPreviews(locale)
  const resumeContent = getResumeContent(locale)

  if (process.env.NODE_ENV !== "development") {
    // Use full posts for RSS/Sitemap generation
    const { getAllPosts } = await import("@/lib/api")
    const fullPosts = getAllPosts(locale)

    await generateSitemap(fullPosts)

    const rss = await generateRss(fullPosts)
    fs.writeFileSync("./public/feed.xml", rss)

    //TODO: implementar algolia
    // await buildAlgoliaIndexes(posts)
  }

  return {
    props: {
      posts,
      resume: resumeContent.roles
    }
  }
}
