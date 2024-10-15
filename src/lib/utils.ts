import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// a function to calculate reading time
export const timeToRead = (text: string) => {
  const words = text.split(" ")
  const minutes = Math.ceil(words.length / 200)
  return `${minutes} min de leitura`
}

// a function to return only unique values
export const unique = <T>(val: T, index: number, self: T[]): boolean => {
  return self.indexOf(val) === index
}
