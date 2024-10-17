import clsx from "clsx"
import Image from "next/image"

export function Photos() {
  const imagePaths = [
    "/images/photos/image-1.jpg",
    "/images/photos/image-2.jpg",
    "/images/photos/image-3.jpg",
    "/images/photos/image-4.jpg",
    "/images/photos/image-5.jpg"
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
              alt=""
              width={500} // Specify the width
              height={500} // Specify the height
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
