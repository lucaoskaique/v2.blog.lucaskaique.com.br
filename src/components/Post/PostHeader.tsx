import { FC, ReactNode } from "react"

interface PostHeaderProps {
  children: ReactNode
}

export const PostHeader: FC<PostHeaderProps> = ({ children }) => (
  <header className="mx-auto max-w-[70rem] px-20 pt-20 text-[color:var(--postColor)] lg:max-w-full lg:px-0 lg:pt-12">
    {children}
  </header>
)
