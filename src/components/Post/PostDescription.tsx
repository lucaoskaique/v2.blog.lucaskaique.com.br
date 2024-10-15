import { FC, ReactNode } from "react"

interface PostDescriptionProps {
  children: ReactNode
}

export const PostDescription: FC<PostDescriptionProps> = ({ children }) => (
  <h2 className="px-5 text-2xl font-extralight lg:px-4 lg:text-xl lg:leading-snug">
    {children}
  </h2>
)
