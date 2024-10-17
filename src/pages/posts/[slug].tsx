import { GetStaticPaths, GetStaticProps } from "next"

import { getAllPosts, getPostBySlug } from "@/lib/api"
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
  const slug = params?.slug as string
  const post = getPostBySlug(slug)
  const content = await markdownToHtml(post?.content || "")

  // get prev/next posts
  const allPosts = getAllPosts()
  const currentPostIndex = allPosts.findIndex((p) => p.slug === slug)
  const nextPost = allPosts[currentPostIndex - 1] ?? null
  const prevPost = allPosts[currentPostIndex + 1] ?? null

  return {
    props: {
      post: {
        ...post,
        content
      },
      prevPost,
      nextPost
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: false
  }
}
