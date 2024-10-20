import { ComponentPropsWithoutRef, ReactNode } from "react"

import { Card } from "@/components/Card"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"

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
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Setup() {
  return (
    <Base>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software I use, gadgets I love, and other things I recommend.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I get asked a lot about the things I use to build software, stay
            productive, or buy to fool myself into thinking I’m being productive
            when I’m really just procrastinating. Here’s a big list of all of my
            favorite stuff.
          </p>
        </header>

        <div className="mt-16 sm:mt-20">
          <div className="space-y-20">
            <ToolsSection title="Workstation">
              <Tool title="Desktop Custom">
                <>
                  <p>
                    I’m a fan of pc builds since I was a kid, I had numerous
                    builds, once you are into it, there’s no turning back.
                  </p>
                  <br />
                  <li>-AMD Ryzen 9 5900X</li>
                  <li>-Radeon RX 570 Series</li>
                  <li>-2x16GB de RAM DDR4</li>
                  <li>-Microfone BM800</li>
                  <li>-Edifier R980T</li>
                </>
              </Tool>
              <Tool title="2 x 27' superframe monitor">
                The only display on the market if you want to invest too much
                and doesn’t care about colours and stuff.
              </Tool>
            </ToolsSection>
            <ToolsSection title="Development tools">
              <Tool title="VS code">
                I don’t care if it’s missing all of the fancy IDE features
                everyone else relies on I just wanna code alone.
              </Tool>
              <Tool title="WSL">
                Using WSL for development changed my life as a developer, much
                better now.
              </Tool>
            </ToolsSection>
            <ToolsSection title="Design">
              <Tool title="Figma">
                We started using Figma as just a design tool but now it’s become
                our virtual whiteboard for the entire company. Never would have
                expected the collaboration features to be the real hook.
              </Tool>
            </ToolsSection>
            <ToolsSection title="Productivity">
              <Tool title="Obsidian">
                It’s not the newest kid on the block but it’s still the fastest
                and no polution like notion that you get lost with so many
                things created.
              </Tool>
            </ToolsSection>
          </div>
        </div>
      </Container>
    </Base>
  )
}
