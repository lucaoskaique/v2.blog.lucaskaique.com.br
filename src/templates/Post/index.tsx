import { useRouter } from "next/router"
import { NextSeo } from "next-seo"
import Prism from "prismjs"
import { ComponentPropsWithoutRef, useEffect } from "react"

import Comments from "@/components/Comments"
import { Container } from "@/components/Container"
import { Post } from "@/types"
import { formatDate } from "@/utils/formatDate"

import styles from "./post-body.module.css"
import Base from "../Base"

const PostTemplate = ({ post }: { post: Post }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [post])
  const router = useRouter()
  // const { previousPathname } = useContext(AppContext)
  return (
    <>
      <NextSeo
        title={`${post.frontmatter.title}`}
        description={post.frontmatter.description}
        openGraph={{
          url: `https://lucaskaique.com.br/${post.slug}`,
          title: `${post.frontmatter.title} - Lucas Kaíque`,
          description: post.frontmatter.description,
          images: [
            {
              url: `https://og-image-service.lucaskaique.com.br/api/param?title=${encodeURIComponent(
                post.frontmatter.title
              )}`,
              alt: `${post.frontmatter.title}`
            }
          ]
        }}
      />
      <Base>
        <Container className="mt-16 lg:mt-32">
          <div className="xl:relative">
            <div className="mx-auto max-w-2xl">
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0">
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>

              <article>
                <header className="flex flex-col">
                  <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    {post.frontmatter.title}
                  </h1>
                  <time
                    dateTime={post.frontmatter.date}
                    className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                    <span className="ml-3">
                      {formatDate(post.frontmatter.date)}
                    </span>
                  </time>
                </header>
                <div className="mt-8">
                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className={styles.content}
                  />
                </div>
              </article>
            </div>
            <div>
              <Comments title={post.frontmatter.title} />
            </div>
          </div>
        </Container>
      </Base>
    </>
  )
}

function ArrowLeftIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PostTemplate
