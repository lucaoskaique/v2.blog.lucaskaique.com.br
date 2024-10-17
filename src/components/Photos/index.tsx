import clsx from "clsx"
import Image from "next/image"

export function Photos() {
  const imagePaths = [
    "https://res.cloudinary.com/lucaos/image/upload/v1687836848/lucaoskaique/Carnaval_PLANO_2020_-_5_wveomc.jpg",
    "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/COICE-01_elisacomandulli_1_m9kkr8.jpg",
    "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/elisa_comanduli_COICE_2022_-_1_f1hnrr.jpg",
    "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/pysales_Carnaval_PLANO_2020_-_10_ftr1wh.jpg",
    "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/pysales_Carnaval_PLANO_2020_-_7_fhn3rb.jpg",
    "https://res.cloudinary.com/lucaos/image/upload/v1687836847/lucaoskaique/Carnaval_PLANO_2020_-_1_t1u7zw.jpg"
  ]
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2"
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {imagePaths.map((image, imageIndex) => (
          <div
            key={image}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length]
            )}>
            <Image
              src={image}
              alt={`Photo ${imageIndex + 1}`}
              fill
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              quality={90}
              priority={imageIndex < 2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
