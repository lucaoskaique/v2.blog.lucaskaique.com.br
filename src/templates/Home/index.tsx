import Image from "next/image"
import { ComponentPropsWithoutRef } from "react"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Container } from "@/components/Container"
import Hero from "@/components/Hero"
import { Photos } from "@/components/Photos"
import { Post } from "@/types"
import { formatDate } from "@/utils/formatDate"

import Base from "../Base"

const resume: Array<RoleProps> = [
  {
    company: "ScaleIP",
    title: "Senior FullStack Engineer (contractor)",
    logo: "https://scaleip.com/favicon.ico",
    start: "2024",
    end: "2024"
  },
  {
    company: "Dev em Dobro",
    title: "Senior Software Engineer and Educator",
    logo: "https://devemdobro.com/wp-content/uploads/2022/07/01-cod.png",
    start: "2023",
    end: "2024"
  },
  {
    company: "Tech4Humans",
    title: "Senior Backend Software Engineer",
    logo: "https://cdn.prod.website-files.com/65155fabb679475d43638cde/653ba727faf096baab78c334_favicon.png",
    start: "2022",
    end: "2023"
  },
  {
    company: "Duo Studio Interativo",
    title: "Tech Lead, Senior Software Engineer",
    logo: "https://duo.studio/img/home/favicon.png",
    start: "2021",
    end: "2023"
  },
  {
    company: "Stefanini Brasil",
    title: "Full-Stack Software Engineer",
    logo: "https://stefanini.com.br/favicon.ico",
    start: "2021",
    end: "2021"
  },
  {
    company: "Banrisul",
    title: "Full-Stack Software Engineer",
    logo: "https://banrisul.com.br/favicon.ico",
    start: "2019",
    end: "2021"
  },
  {
    company: "UERGS",
    title: "IT Support Intern",
    logo: "https://uergs.edu.br/themes/uergs/ico/favicon.ico",
    start: "2018",
    end: "2019"
  },
  {
    company: "Instituto Federal de Gois (IFG)",
    title: "Calculus Professor Assistent, University",
    logo: "http://www.ifg.edu.br/templates/padraogoverno01/favicon.ico",
    start: "2015",
    end: "2016"
  },
  {
    company: "Instituto Mix",
    title: "Developer and IT Instructor",
    logo: "https://institutomix.com.br/favicon.webp",
    start: "2014",
    end: "2016"
  },
  {
    company: "MMtec",
    title: "Industrial Engineering Technician",
    logo: "https://www.mmtec.com.br/wp-content/uploads/2016/07/mmtec-faviconmodelo.jpg",
    start: "2013",
    end: "2014"
  }
]

function MailIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

interface RoleProps {
  company: string
  title: string
  logo: string
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: RoleProps }) {
  const startLabel =
    typeof role.start === "string" ? role.start : role.start.label
  const startDate =
    typeof role.start === "string" ? role.start : role.start.dateTime

  const endLabel = typeof role.end === "string" ? role.end : role.end.label
  const endDate = typeof role.end === "string" ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={role.logo}
          width={50}
          height={50}
          alt=""
          className="h-7 w-7"
          unoptimized
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}>
          <time dateTime={startDate}>{startLabel}</time>{" "}
          <span aria-hidden="true">—</span>{" "}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        variant="secondary"
        href="/path-to-your-cv.pdf"
        className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
      </Button>
    </div>
  )
}

const Home = ({ posts }: { posts: Post[] }) => {
  return (
    <Base>
      <Container className="mt-9">
        <Hero />
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {posts.slice(0, 5).map((post) => (
              <div key={post.slug}>
                <Card as="article">
                  <Card.Title href={`/posts/${post.slug}`}>
                    {post.frontmatter.title}
                  </Card.Title>
                  <Card.Eyebrow
                    as="time"
                    dateTime={post.frontmatter.date}
                    decorate>
                    {formatDate(post.frontmatter.date)}
                  </Card.Eyebrow>
                  <Card.Description>
                    {post.frontmatter.description}
                  </Card.Description>
                  <Card.Cta>Read article</Card.Cta>
                </Card>
              </div>
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </Base>
  )
}

export default Home
