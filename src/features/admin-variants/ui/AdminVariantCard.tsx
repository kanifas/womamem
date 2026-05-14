'use client'

import { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'
import { VariantDraft } from '../model/types'

type Props = {
  variant: VariantDraft
  active: boolean
  onDelete: () => void
}

export const AdminVariantCard: FC<Props> = ({
  variant,
  active,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: variant.id })

  const style = {
    transform: CSS.Transform.toString(
      transform,
    ),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        relative
        overflow-hidden
        rounded-2xl
        border
        bg-zinc-900
        ${
          active
            ? 'border-white'
            : 'border-zinc-800'
        }
      `}
    >
      {/* preview badge */}
      {active && (
        <div
          className="
            absolute
            left-2
            top-2
            z-20
            rounded-full
            bg-white
            px-2
            py-1
            text-xs
            font-medium
            text-black
          "
        >
          Preview
        </div>
      )}

      {/* delete */}
      <button
        type="button"
        onClick={onDelete}
        className="
          absolute
          right-2
          top-2
          z-20
          rounded-full
          bg-black/70
          px-2
          py-1
          text-xs
          text-white
        "
      >
        ✕
      </button>

      {/* content */}
      <MediaRenderer
        src={variant.fileUrl}
        format={variant.format}
        className="
          aspect-square
          w-full
          object-cover
        "
      />

      {/* meta */}
      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-zinc-800
          p-2
          text-xs
          text-zinc-400
        "
      >
        <span>{variant.format}</span>

        <span>{variant.style}</span>
      </div>
    </div>
  )
}