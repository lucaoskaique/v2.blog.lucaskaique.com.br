import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"
import headings from "remark-autolink-headings"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import slug from "remark-slug"
import { unified } from "unified"

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(slug as never)
    .use(headings as never, {
      behavior: "wrap",
      linkProperties: {
        className: "anchor"
      }
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)

  return String(result)
}
