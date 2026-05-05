export type Meme = {
  id: string
  title: string
  slug: string
  description?: string
  previewUrl?: string

  likesCount: number
  commentsCount: number
}