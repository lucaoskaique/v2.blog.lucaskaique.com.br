import { getAllPosts } from "@/lib/api"
import PostsTemplate from "@/templates/Posts"
import { Post } from "@/types"

const PostsPage = ({ posts }: { posts: Post[] }) => {
  return <PostsTemplate posts={posts} />
}

export default PostsPage

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts
    }
  }
}
