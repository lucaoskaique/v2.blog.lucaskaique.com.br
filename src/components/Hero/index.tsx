import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "../SocialIcons"
import SocialLink from "../SocialLink"

export default function Hero() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Software Engineer, founder, and DJ in my spare time.
      </h1>
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I’m Spencer, a software designer and entrepreneur based in PoA. I’m the
        founder and CEO of LKS group, where we develop technologies that empower
        regular people to explore space on their own terms. I explore the world
        of technology and the intersection between music, art and programming. I
        write about these and other intriguing experiences.
      </p>
      <div className="mt-6 flex gap-6">
        <SocialLink href="#" aria-label="Follow on X" icon={XIcon} />
        <SocialLink
          href="#"
          aria-label="Follow on Instagram"
          icon={InstagramIcon}
        />
        <SocialLink href="#" aria-label="Follow on GitHub" icon={GitHubIcon} />
        <SocialLink
          href="#"
          aria-label="Follow on LinkedIn"
          icon={LinkedInIcon}
        />
      </div>
    </section>
  )
}
