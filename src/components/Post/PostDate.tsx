import { FC, ReactNode } from "react"

interface PostDateProps {
  children: ReactNode
}

export const PostDate: FC<PostDateProps> = ({ children }) => (
  <p className="px-5 text-base font-thin lg:px-4">{children}</p>
)
