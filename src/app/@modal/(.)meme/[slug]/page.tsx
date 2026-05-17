import { MemeModalClient } from './MemeModalClient'
import { getMemes } from '@/entities/server'

type Props = {
  params: {
    slug: string
  }
}

export default async function MemeModal({ params }: Props) {
  const { slug } = await params
  const data = await getMemes({
    limit: 50,
  })

  return (
    <MemeModalClient
      initialSlug={slug}
      memes={data.items}
    />
  )
}