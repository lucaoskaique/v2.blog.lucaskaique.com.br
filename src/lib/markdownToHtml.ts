import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"
import headings from "remark-autolink-headings"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import slug from "remark-slug"
import { unified } from "unified"

/**
 * Remove indentação excessiva do markdown (comum quando vem de YAML com `body: >`)
 */
function normalizeIndentation(markdown: string): string {
  const lines = markdown.split("\n")

  // Encontra a menor indentação (ignorando linhas vazias)
  let minIndent = Infinity
  for (const line of lines) {
    if (line.trim().length === 0) continue
    const indent = line.match(/^(\s*)/)?.[1].length ?? 0
    if (indent < minIndent) {
      minIndent = indent
    }
  }

  // Remove a indentação comum de todas as linhas
  if (minIndent > 0 && minIndent !== Infinity) {
    return lines
      .map((line) => {
        if (line.trim().length === 0) return line
        return line.slice(minIndent)
      })
      .join("\n")
  }

  return markdown
}

export default async function markdownToHtml(markdown: string) {
  // Normaliza indentação antes de processar
  const normalizedMarkdown = normalizeIndentation(markdown)

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
    .process(normalizedMarkdown)

  return String(result)
}
