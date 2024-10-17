import rehypePrism from "rehype-prism"
import { remark } from "remark"
import headings from "remark-autolink-headings"
import remarkGfm from "remark-gfm"
import html from "remark-html"
import remarkOembed from "remark-oembed"
import slug from "remark-slug"

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .use(remarkGfm)
    .use(rehypePrism, { plugins: ["line-numbers"] })
    .use(remarkOembed as never)
    .use(slug as never)
    .use(headings as never, {
      behavior: "wrap",
      linkProperties: {
        className: "anchor"
      }
    })
    .process(markdown)

  return result.toString()
}
