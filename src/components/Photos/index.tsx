import Image from "next/image"
import React from "react"

interface ImageInfo {
  src: string
  alt: string
}

const originalImages: ImageInfo[] = [
  {
    src: "https://avatars.githubusercontent.com/u/20323741?s=400&u=a7bb29a8c468f43c93263967dad8afeba24e5b22&v=4",
    alt: "Photo 1"
  },
  {
    src: "https://res.cloudinary.com/lucaos/image/upload/v1687836848/lucaoskaique/Carnaval_PLANO_2020_-_5_wveomc.jpg",
    alt: "Photo 2"
  },
  {
    src: "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/COICE-01_elisacomandulli_1_m9kkr8.jpg",
    alt: "Photo 3"
  },
  {
    src: "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/elisa_comanduli_COICE_2022_-_1_f1hnrr.jpg",
    alt: "Photo 4"
  },
  {
    src: "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/pysales_Carnaval_PLANO_2020_-_10_ftr1wh.jpg",
    alt: "Photo 5"
  },
  {
    src: "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/pysales_Carnaval_PLANO_2020_-_7_fhn3rb.jpg",
    alt: "Photo 6"
  },
  {
    src: "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/Carnaval_PLANO_2020_-_1_t1u7zw.jpg",
    alt: "Photo 7"
  }
]

export function Photos() {
  const rotations: string[] = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2"
  ]

  const images = [...originalImages, ...originalImages]

  return (
    <div className="mt-16 overflow-hidden sm:mt-20">
      <div className="slider">
        <div className="slide-track flex justify-start gap-5 py-4 sm:gap-8">
          {images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={`slide relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl ${rotations[index % rotations.length]}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
                quality={100}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider {
          /* background: white;
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.125);
          height: 100px;
          margin: auto;
          overflow: hidden;
          position: relative;
          width: 960px; */
        }

        /* .slider::before,
        .slider::after {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          content: "";
          height: 100px;
          position: absolute;
          width: 200px;
          z-index: 2;
        }

        .slider::after {
          right: 0;
          top: 0;
          transform: rotateZ(180deg);
        }

        .slider::before {
          left: 0;
          top: 0;
        } */

        .slide-track {
          animation: scroll 40s linear infinite;
          display: flex;
          width: calc(250px * 14);
        }

        .slide {
          /* height: 100px;
          width: 250px; */
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-250px * 7));
          }
        }
      `}</style>
    </div>
  )
}
