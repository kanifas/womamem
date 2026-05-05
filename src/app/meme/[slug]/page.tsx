import { getMemeBySlug } from '@/entities/meme/api/getMemeBySlug'

export default async function MemePage({ params }) {
  const meme = await getMemeBySlug(params.slug)

  if (!meme) return <div>Not found</div>

  return (
    <div className="p-4">
      <img src={meme.previewUrl} />
      <h1>{meme.title}</h1>
    </div>
  )
}