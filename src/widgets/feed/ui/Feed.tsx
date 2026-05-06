import { FC } from 'react'
import { getMemes } from '@/entities'
import { FeedClient } from './FeedClient'

export const Feed: FC = async () => {
  const memes = await getMemes()

  return <FeedClient memes={memes} />
}