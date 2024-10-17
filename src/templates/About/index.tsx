import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react"

import { Container } from "@/components/Container"
import links from "@/components/Hero/content"
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  SoundCloudIcon,
  XIcon,
  YoutubeIcon
} from "@/components/SocialIcons"

import Base from "../Base"

const getIconComponent = (label: string) => {
  switch (label.toLowerCase()) {
    case "github":
      return GitHubIcon
    case "X":
      return XIcon
    case "youtube":
      return YoutubeIcon
    case "instagram":
      return InstagramIcon
    case "soundcloud":
      return SoundCloudIcon
    case "linkedin":
      return LinkedInIcon
    default:
      return null
  }
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon
}: {
  className?: string
  href: string
  icon: ComponentType<{ className?: string }>
  children: ReactNode
}) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        href={href}
        className="group flex text-sm font-bold text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <Base>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={"/images/card.webp"}
                alt=""
                width={500}
                height={500}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Lucas Kaique. I’m from Goiás and I live in Porto Alegre, where
              I develop the future.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Hi, I’m a Senior Software Engineer and I’ve been coding since I
                was 14 years old, where my passion for solving problems and
                designing elegant solutions comes to life. Specializing in
                back-end technologies like NodeJS, C#, and Go, I am also able to
                create beautiful and engaging front-end experiences with React
                and Next.js.
              </p>
              <p>
                My focus is on creating robust, efficient and user-friendly
                applications that enhance user interaction and deliver value. In
                addition to the world of programming, I have a vibrant career as
                a DJ and event producer.
              </p>
              <p>
                These roles have highlighted my creative streak, giving me the
                opportunity to orchestrate memorable experiences through music
                and events. This combination of analytical programming and
                artistic production skills shapes my unique approach to work,
                allowing me to bring fresh, innovative ideas to the table.
              </p>
              <p>
                Whether you’re looking for a sophisticated software solution or
                an unforgettable event, I’m your go-to professional. I look
                forward to using my specific skills to deliver unique results.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul>
              {links.map((link) => {
                const IconComponent = getIconComponent(link.label)
                return IconComponent ? (
                  <SocialLink
                    className="mt-4"
                    key={link.label}
                    href={link.url}
                    aria-label={`Follow on ${link.label}`}
                    icon={IconComponent}>
                    {`Follow on ${link.label}`}
                  </SocialLink>
                ) : null
              })}
              <SocialLink
                href="mailto:spencer@planetaria.tech"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
                me@lucaskaique.com.br
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </Base>
  )
}
