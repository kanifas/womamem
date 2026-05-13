import { TMeme } from '@/entities'

type UseMemeViewer = {
  currentMemeIndex: number
  currentVariantIndex: number

  memes: TMeme[]

  next: () => void
  prev: () => void

  open: (index: number) => void
  close: () => void
}