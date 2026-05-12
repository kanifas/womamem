import { FC } from 'react'
import { getMemes } from '@/entities/server'
import { FeedClient } from './FeedClient'

export const Feed: FC = async () => {
  const memes = await getMemes()
  console.log(
    JSON.stringify(memes, null, 2)
  )

  return <FeedClient memes={memes} />
}