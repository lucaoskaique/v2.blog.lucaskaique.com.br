import { FC, ReactNode } from "react"

interface PostTitleProps {
  children: ReactNode
}

export const PostTitle: FC<PostTitleProps> = ({ children }) => (
  <h1 className="mx-auto my-4 px-5 text-4xl font-bold lg:px-4 lg:text-2xl lg:leading-tight">
    {children}
  </h1>
)
