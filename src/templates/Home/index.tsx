import { Card } from "@/components/Card"
import { Container } from "@/components/Container"
import Hero from "@/components/Hero"
import { Photos } from "@/components/Photos"
import { Post } from "@/types"
import { formatDate } from "@/utils/formatDate"

import Base from "../Base"

const Home = ({ posts }: { posts: Post[] }) => {
  return (
    <Base>
      <Container className="mt-9">
        <Hero />
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="flex flex-col gap-16">
          {posts.slice(0, 5).map((post) => (
            <div key={post.slug}>
              <Card as="article">
                <Card.Title href={`/posts/${post.slug}`}>
                  {post.frontmatter.title}
                </Card.Title>
                <Card.Eyebrow
                  as="time"
                  dateTime={post.frontmatter.date}
                  decorate>
                  {formatDate(post.frontmatter.date)}
                </Card.Eyebrow>
                <Card.Description>
                  {post.frontmatter.description}
                </Card.Description>
                <Card.Cta>Read article</Card.Cta>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Base>
  )
}

export default Home
