import { FC } from 'react'
import { TComment } from '../model/types'

type Props = {
  comment: TComment
}

export const CommentCard: FC<Props> = ({
  comment,
}) => {
  return (
    <div className="flex gap-3 py-3">
      <img
        src={comment.avatar}
        className="
          h-10
          w-10
          rounded-full
          object-cover
        "
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">
            {comment.author}
          </div>

          <div
            className="
              text-xs
              text-zinc-500
            "
          >
            {comment.createdAt}
          </div>
        </div>

        <div
          className="
            mt-1
            break-words
            text-sm
          "
        >
          {comment.text}
        </div>
      </div>
    </div>
  )
}