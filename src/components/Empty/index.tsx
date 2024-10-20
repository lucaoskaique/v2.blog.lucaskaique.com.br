import Link from "next/link"

import { Button } from "../Button"

export type EmptyProps = {
  title: string
  description: string
  hasLink?: boolean
}
const Empty = ({ title, description, hasLink }: EmptyProps) => (
  <div className="flex flex-col items-center">
    <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
      404
    </p>
    <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
      {title}
    </h1>
    <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
      {description}
    </p>
    {hasLink && (
      <Link href="/" passHref className="mt-8">
        <Button as="a">Go back to Home</Button>
      </Link>
    )}
  </div>
)

export default Empty
