export type Meme = {
  id: string
  title: string
  description?: string
  slug: string

  createdAt: Date

  viewsCount: number
  likesCount: number
  commentsCount: number

  isActive: boolean

  variants: MemeVariant[]
}

export type MemeVariantStyle =
  | 'original'
  | 'sketch'
  | 'pixel'
  | 'animated'
  | 'sticker'

export type MemeVariantFormat =
  | 'image'
  | 'video'
  | 'gif'
  | 'webp'
  | 'apng'

export type MemeVariantRole =
  | 'content'
  | 'preview'
  | 'sticker'

export type MemeVariant = {
  id: string
  memeId: string
  style: MemeVariantStyle
  format: MemeVariantFormat
  role: MemeVariantRole
  fileUrl: string
  thumbnailUrl?: string
  width?: number
  height?: number
  sortOrder: number
  createdAt: Date
}
