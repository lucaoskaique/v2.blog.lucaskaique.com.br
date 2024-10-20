/* eslint-disable import/no-anonymous-default-export */
export default {
  titleTemplate: "%s | Lucas Kaíque Blog",
  defaultTitle: "Lucas Kaíque - Tecnologia, Musica e Desenvolvimento Web.",
  description:
    "Um blog sobre tecnologia, programação, música e desenvolvimento web.",
  canonical: "https://lucaskaique.com.br/",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lucaskaique.com.br/",
    site_name: "Lucas Kaíque",
    title: "Lucas Kaíque - Tecnologia, Musica e Desenvolvimento Web.",
    description: "Um blog sobre tecnologia, programação e desenvolvimento web.",
    images: [
      {
        url: "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/pysales_Carnaval_PLANO_2020_-_7_fhn3rb.jpg",
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
      content: "#000"
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
