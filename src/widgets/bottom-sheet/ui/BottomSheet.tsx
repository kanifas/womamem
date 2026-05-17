'use client'

import {
  FC,
  PropsWithChildren,
} from 'react'

type Props = PropsWithChildren<{
  open: boolean
  onClose: () => void
}>

export const BottomSheet: FC<Props> = ({
  open,
  onClose,
  children,
}) => {
  if (!open) {
    return null
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        bg-black/50
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="
          absolute
          inset-x-0
          bottom-0
          flex
          h-[70dvh]
          flex-col
          rounded-t-3xl
          border-t
          border-[var(--color-border)]
          bg-[var(--color-card)]
        "
      >
        {/* handle */}
        <div
          className="
            flex
            justify-center
            py-3
          "
        >
          <div
            className="
              h-1.5
              w-14
              rounded-full
              bg-zinc-500
            "
          />
        </div>

        {/* content */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-4
          "
        >
          {children}
        </div>

        {/* input */}
        <div
          className="
            border-t
            border-[var(--color-border)]
            p-3
          "
        >
          <input
            type="text"
            placeholder="Написать комментарий..."
            className="
              w-full
              rounded-2xl
              border
              border-[var(--color-border)]
              bg-[var(--color-bg)]
              px-4
              py-3
              text-[16px]
              outline-none
            "
          />
        </div>
      </div>
    </div>
  )
}