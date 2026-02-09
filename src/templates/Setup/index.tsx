import { ComponentPropsWithoutRef, ReactNode } from "react"

import { Card } from "@/components/Card"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { SetupContent } from "@/types"

import Base from "../Base"

function ToolsSection({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul className="space-y-16">{children}</ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children
}: {
  title: string
  href?: string
  children: ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description as="div">{children}</Card.Description>
    </Card>
  )
}

interface SetupProps {
  content: SetupContent
}

export default function Setup({ content }: SetupProps) {
  return (
    <Base>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {content.heading}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {content.intro}
          </p>
        </header>

        <div className="mt-16 sm:mt-20">
          <div className="space-y-20">
            {content.sections.map((section) => (
              <ToolsSection key={section.category} title={section.category}>
                {section.items.map((item) => (
                  <Tool key={item.name} title={item.name}>
                    {item.description}
                  </Tool>
                ))}
              </ToolsSection>
            ))}
          </div>
        </div>
      </Container>
    </Base>
  )
}
