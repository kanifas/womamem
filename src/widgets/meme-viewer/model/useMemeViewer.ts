import { TMeme } from '@/entities'

type UseMemeViewer = {
  currentIndex: number
  memes: TMeme[]

  next: () => void
  prev: () => void

  open: (index: number) => void
  close: () => void
}