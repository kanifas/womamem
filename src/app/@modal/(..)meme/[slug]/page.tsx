import { getMemeBySlug } from '@/entities/meme/api/getMemeBySlug'
import { useRouter } from 'next/navigation'

export default async function MemeModal({ params }) {
  const meme = await getMemeBySlug(params.slug)

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
      <img src={meme.previewUrl} className="max-h-[90%]" />
    </div>
  )
}