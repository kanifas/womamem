export type Meme = {
  id: string
  title: string
  description?: string
  slug: string
  previewUrl?: string
  previewVariantId?: string
  createdAt: string

  viewsCount: number
  likesCount: number
  commentsCount: number

  isActive: boolean

  variants: MemeVariant[]
}

export type MemeVariant = {
  id: string
  memeId: string
  type: 'image' | 'video' | 'sketch' | 'pixel' | 'gif'
  fileUrl: string
  thumbnailUrl: string
  width: number
  height: number
  sortOrder: number
  createdAt: string
}