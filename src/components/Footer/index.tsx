import Link from "next/link"
import { ReactNode } from "react"

import { ContainerInner, ContainerOuter } from "@/components/Container"
import { useTranslation } from "@/hooks/useTranslation"
import { getLocalizedPath } from "@/lib/locale"

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400">
      {children}
    </Link>
  )
}

export function Footer() {
  const { locale } = useTranslation()

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href={getLocalizedPath("/about", locale)}>About</NavLink>
                {/* <NavLink href={getLocalizedPath("/projects", locale)}>Projects</NavLink> */}
                <NavLink href={getLocalizedPath("/speaking", locale)}>Speaking</NavLink>
                <NavLink href={getLocalizedPath("/setup", locale)}>Setup</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Lucas Kaique. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
