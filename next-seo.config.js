/* eslint-disable import/no-anonymous-default-export */
export default {
  titleTemplate: "%s | Lucas Kaique Blog",
  defaultTitle: "Desenvolvimento Web, Musica e Tecnologia.",
  description: "Um blog sobre tecnologia, programação e desenvolvimento web.",
  canonical: "https://blog.lucaskaique.com.br/",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://blog.lucaskaique.com.br",
    site_name: "Lucas Kaique Blog",
    title: "Desenvolvimento Web, Musica e Tecnologia",
    description: "Um blog sobre tecnologia, programação e desenvolvimento web.",
    images: [
      {
        url: "https://blog.lucaskaique.com.br/android-chrome-192x192.png",
        width: 1200,
        height: 630,
        alt: "Desenvolvimento Web, Musica e Tecnologia",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    handle: "@lucaoskaique",
    site: "@lucaoskaique",
    cardType: "summary_large_image"
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },
    {
      name: "theme-color",
      content: "#ffffff"
    }
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico"
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180"
    },
    {
      rel: "manifest",
      href: "/manifest.json"
    },
    {
      rel: "privacy-policy",
      href: "/politica-de-privacidade"
    }
  ]
}
