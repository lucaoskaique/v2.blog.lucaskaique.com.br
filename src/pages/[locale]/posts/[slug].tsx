import { GetStaticPaths, GetStaticProps } from "next"

import { getAllPosts, getPostBySlug } from "@/lib/api"
import { Locale, locales } from "@/lib/i18n"
import markdownToHtml from "@/lib/markdownToHtml"
import PostTemplate from "@/templates/Post"
import { Post } from "@/types"

interface PostIndexProps {
  post: Post
}

export default function PostIndex({ post }: PostIndexProps) {
  return <PostTemplate post={post} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = (params?.locale as Locale) || "pt-BR"
  const slug = params?.slug as string
  const post = getPostBySlug(slug, locale)

  // Return 404 if post not found
  if (!post) {
    return {
      notFound: true
    }
  }

  const content = await markdownToHtml(post.content || "")

  console.log("\n=== SLUG.TSX getStaticProps ===")
  console.log("Slug:", slug)
  console.log("Locale:", locale)
  console.log("post.content (before markdownToHtml):", post.content)
  console.log("content (after markdownToHtml):", content)
  console.log("content includes <img>?", content.includes("<img"))

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = locales.flatMap((locale) => {
    const posts = getAllPosts(locale)
    return posts.map((post) => ({
      params: { locale, slug: post.slug }
    }))
  })

  return {
    paths,
    fallback: false
  }
}
