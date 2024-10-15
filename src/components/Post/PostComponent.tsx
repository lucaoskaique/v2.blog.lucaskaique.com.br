import { FC, ReactNode } from "react"

import { ButtonBack } from "./ButtonBack"
import { MainContent } from "./MainContent"
import { PostDate } from "./PostDate"
import { PostDescription } from "./PostDescription"
import { PostHeader } from "./PostHeader"
import { PostTitle } from "./PostTitle"

interface PostComponentProps {
  title: string
  description: string
  date: string
  content: ReactNode
}

// Example usage
const PostComponent: FC<PostComponentProps> = ({
  title,
  description,
  date,
  content
}) => (
  <article>
    <PostHeader>
      <ButtonBack href="#">Back</ButtonBack>
      <PostTitle>{title}</PostTitle>
      <PostDescription>{description}</PostDescription>
      <PostDate>{date}</PostDate>
    </PostHeader>
    <MainContent>{content}</MainContent>
  </article>
)

export default PostComponent
