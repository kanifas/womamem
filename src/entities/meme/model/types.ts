export type Meme = {
  id: string
  title: string
  description?: string
  slug: string
  previewUrl?: string
  previewVariantId?: string
  createdAt: Date

  viewsCount: number
  likesCount: number
  commentsCount: number

  isActive: boolean

  variants: MemeVariant[]
}

export const memeVariantTypes = [
  'image',
  'video',
  'sketch',
  'pixel',
  'gif',
] as const

export type MemeVariantType = (typeof memeVariantTypes)[number]

export type MemeVariant = {
  id: string
  memeId: string
  type: MemeVariantType
  fileUrl: string
  thumbnailUrl?: string
  width?: number
  height?: number
  sortOrder: number
  createdAt: Date
}
