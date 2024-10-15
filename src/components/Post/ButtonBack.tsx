import { FC, ReactNode } from "react"

interface ButtonBackProps {
  href: string
  children: ReactNode
}

export const ButtonBack: FC<ButtonBackProps> = ({ href, children }) => (
  <a
    href={href}
    className="mb-6 ml-6 flex text-[color:var(--texts)] transition-colors duration-300 hover:text-[color:var(--highlight)] lg:ml-4">
    {children}
  </a>
)
