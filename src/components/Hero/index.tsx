import links from "./content"
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  SoundCloudIcon,
  XIcon,
  YoutubeIcon
} from "../SocialIcons"
import SocialLink from "../SocialLink"

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

export default function Hero() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Software Engineer, founder, and DJ in my spare time.
      </h1>
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I’m Lucas Kaique, a software engineer and entrepreneur based in PoA. I’m
        the founder and CEO of LKS Services, where we develop technologies that
        empower regular people to explore space on their own terms. I explore
        the world of technology and the intersection between music, art and
        programming. I write about these and other intriguing experiences.
      </p>
      <div className="mt-6 flex gap-6">
        {links.map((link) => {
          const IconComponent = getIconComponent(link.label)
          return IconComponent ? (
            <SocialLink
              key={link.label}
              href={link.url}
              aria-label={`Follow on ${link.label}`}
              icon={IconComponent}
            />
          ) : null
        })}
      </div>
    </section>
  )
}
