import { MemeModalClient } from './MemeModalClient'
import { getMemes } from '@/entities/meme/api/getMemes'

type Props = {
  params: {
    slug: string
  }
}

export default async function MemeModal({ params }: Props) {
  const { slug } = await params
  const memes = await getMemes()

  return (
    <MemeModalClient
      initialSlug={slug}
      memes={memes}
    />
  )
}