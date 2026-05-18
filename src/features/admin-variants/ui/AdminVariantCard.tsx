'use client'

import { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Select,
  Tag,
} from 'antd'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'
import { VariantDraft } from '../model/types'

type Props = {
  variant: VariantDraft
  active: boolean

  onDelete: () => void

  onChange: (
    next: VariantDraft,
  ) => void

  disableOriginal: boolean
}

const STYLE_OPTIONS = [
  'original',
  'sketch',
  'pixel',
  'vector',
  'animated',
  'sticker',
]

export const AdminVariantCard: FC<Props> = ({
  variant,
  active,
  onDelete,
  onChange,
  disableOriginal,
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
      {/* drag area */}
      <div
        {...listeners}
        className="
          absolute
          inset-x-0
          top-0
          z-30
          flex
          cursor-grab
          justify-center
          bg-black/40
          py-1
          text-xs
          text-white
          backdrop-blur
        "
      >
        drag
      </div>

      {/* preview badge */}
      {active && (
        <div
          className="
            absolute
            left-2
            top-8
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
          top-8
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

      {/* media */}
      <div
        className="
          aspect-[9/16]
          overflow-hidden
          bg-black
        "
      >
        <MediaRenderer
          src={variant.fileUrl}
          format={variant.format}
          poster={variant.posterUrl}
          className="
            h-full
            w-full
          "
          fit="contain"
        />
      </div>

      {/* controls */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-t
          border-zinc-800
          p-3
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <Tag color="blue">
            {variant.format}
          </Tag>

          {variant.posterUrl && (
            <Tag color="green">
              poster
            </Tag>
          )}
        </div>

        {/* style */}
        <Select
          size="small"
          value={variant.style}
          options={STYLE_OPTIONS.map(
            (style) => ({
              label: style,
              value: style,
              disabled:
                style === 'original'
                && disableOriginal,
            }),
          )}
          onChange={(style) => {
            onChange({
              ...variant,
              style,
            })
          }}
        />

        {/* poster upload */}
        {variant.format === 'video' && (
          <label
            className="
              flex
              cursor-pointer
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-zinc-700
              p-3
              text-xs
              text-zinc-400
              transition
              hover:border-zinc-500
            "
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files?.[0]

                if (!file) {
                  return
                }

                onChange({
                  ...variant,
                  posterFile: file,
                  posterUrl:
                    URL.createObjectURL(
                      file,
                    ),
                })
              }}
            />

            {variant.posterUrl
              ? 'Change poster'
              : 'Upload poster'}
          </label>
        )}
      </div>
    </div>
  )
}