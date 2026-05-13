import { MemeVariantFormat } from '@/entities'
import { getMemeBySlug } from '@/entities/server'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'

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
      <MediaRenderer
        src={meme.variants[0]?.fileUrl}
        // TODO: Сделать MemeVariantFormat одним источником правдв в БД а не в ентитис
        format={meme.variants[0]?.format as MemeVariantFormat}
      />
      <h1>{meme.title}</h1>
    </div>
  )
}