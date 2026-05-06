import { getMemeBySlug } from '@/entities/server'

type Props = {
  params: {
    slug: string
  }
}

export default async function MemePage({ params }: Props) {
  const { slug } = await params
  const meme = await getMemeBySlug(slug)

  if (!meme) return <div>Not found</div>

  return (
    <div className="p-4">
      <img src={meme.previewUrl} />
      <h1>{meme.title}</h1>
    </div>
  )
}