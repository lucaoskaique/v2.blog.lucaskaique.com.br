import fs from "fs"

import { getAllPosts } from "@/lib/api"
//TODO: implementar algolia
// import { buildAlgoliaIndexes } from "@/lib/buildAlgoliaIndexes"
import { generateRss } from "@/lib/generateRSS"
import { generateSitemap } from "@/lib/generateSitemap"
import Home from "@/templates/Home"
import { Post } from "@/types"

export default function Index({ posts }: { posts: Post[] }) {
  // if (posts) return <p>{JSON.stringify(posts[0], null, 2)}</p>

  return <Home posts={posts} />
}

export async function getStaticProps() {
  const posts = getAllPosts()

  if (process.env.NODE_ENV !== "development") {
    await generateSitemap(posts)

    const rss = await generateRss(posts)
    fs.writeFileSync("./public/feed.xml", rss)

    //TODO: implementar algolia
    // await buildAlgoliaIndexes(posts)
  }

  return {
    props: {
      posts
    }
  }
}
