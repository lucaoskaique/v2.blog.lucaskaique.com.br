import { Post } from "@/types"
import { formatDate } from "@/utils/formatDate"

import { Card } from "../Card"

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/posts/${post.slug}`}>
          {post.frontmatter.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.date}
          className="md:hidden"
          decorate>
          {formatDate(post.date)}
        </Card.Eyebrow>
        <Card.Description>{post.frontmatter.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.date}
        className="mt-1 hidden md:block">
        {formatDate(post.date)}
      </Card.Eyebrow>
    </article>
  )
}
