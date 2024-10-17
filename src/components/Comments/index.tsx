import React, { FC, useEffect, useRef } from "react"

interface CommentsProps {
  title: string
}

const Comments: FC<CommentsProps> = ({ title }) => {
  const commentBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createUtterancesScript = () => {
      const theme = localStorage.getItem("theme") || "dark"
      const utterancesTheme = theme === "dark" ? "github-dark" : "github-light"

      const scriptEl = document.createElement("script")
      scriptEl.async = true
      scriptEl.setAttribute("src", "https://utteranc.es/client.js")
      scriptEl.setAttribute("crossorigin", "anonymous")
      scriptEl.setAttribute("repo", "lucaoskaique/blog.lucaskaique.com.br")
      scriptEl.setAttribute("issue-term", "title")
      scriptEl.setAttribute("theme", utterancesTheme)

      commentBox.current?.appendChild(scriptEl)
    }

    if (commentBox.current && commentBox.current.children.length === 0) {
      createUtterancesScript()
    }

    const watchThemeSwitch = new MutationObserver((mutations) => {
      const utterances = document.querySelector(
        ".utterances-frame"
      ) as HTMLIFrameElement
      if (!utterances) return

      for (const mutation of mutations) {
        if (mutation.attributeName !== "class") continue
        const target = mutation.target as Element
        const theme = target.classList.contains("dark")
          ? "github-dark"
          : "github-light"

        const message = {
          type: "set-theme",
          theme: theme
        }

        utterances.contentWindow?.postMessage(message, "https://utteranc.es")
      }
    })

    watchThemeSwitch.observe(document.body, { attributes: true })

    return () => {
      watchThemeSwitch.disconnect()
    }
  }, [title])

  return <div ref={commentBox} />
}

export default Comments
