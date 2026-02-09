import { GetStaticPaths, GetStaticProps } from "next"

import { getAllPostPreviews } from "@/lib/api"
import { Locale, locales } from "@/lib/i18n"
import PostsTemplate from "@/templates/Posts"
import { PostPreview } from "@/types"

const PostsPage = ({ posts }: { posts: PostPreview[] }) => {
  return <PostsTemplate posts={posts} />
}

export default PostsPage

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

  return {
    props: {
      posts
    }
  }
}
