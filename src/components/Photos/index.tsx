/* eslint-disable jsx-a11y/no-static-element-interactions */
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

interface ImageInfo {
  src: string
  alt: string
}

export function Photos() {
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

  const [visibleImages, setVisibleImages] =
    useState<ImageInfo[]>(originalImages)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const rotations: string[] = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2"
  ]

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      const handleScroll = () => {
        const scrollLeft = carousel.scrollLeft
        const width = carousel.clientWidth

        if (scrollLeft < width) {
          carousel.scrollLeft += width
        } else if (scrollLeft > width * 2) {
          carousel.scrollLeft -= width
        }

        updateVisibleImages()
      }

      const updateVisibleImages = () => {
        const index = Math.floor(
          carousel.scrollLeft / (carousel.clientWidth / originalImages.length)
        )
        const newVisibleImages = [
          ...originalImages.slice(
            (index - 1 + originalImages.length) % originalImages.length
          ),
          ...originalImages,
          ...originalImages.slice(0, (index + 1) % originalImages.length)
        ]
        setVisibleImages(newVisibleImages)
      }

      carousel.addEventListener("scroll", handleScroll)
      updateVisibleImages()

      return () => carousel.removeEventListener("scroll", handleScroll)
    }
  }, [originalImages])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= walk
    }
    setStartX(x)
  }

  return (
    <div className="mt-16 overflow-hidden sm:mt-20">
      <div
        ref={carouselRef}
        className="flex justify-start gap-5 overflow-x-scroll py-4 sm:gap-8"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}>
        {visibleImages.map((image, imageIndex) => (
          <div
            key={`${image.src}-${imageIndex}`}
            className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl ${rotations[imageIndex % rotations.length]}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              quality={90}
              priority={imageIndex < originalImages.length * 2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
