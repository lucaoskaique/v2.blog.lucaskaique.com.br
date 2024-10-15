import { FC, ReactNode } from "react"

interface MainContentProps {
  children: ReactNode
}

export const MainContent: FC<MainContentProps> = ({ children }) => (
  <section className="prose prose-lg mx-auto max-w-[70rem] px-20 py-8 lg:max-w-full lg:px-0">
    {children}
  </section>
)
