'use client'

import { BottomSheet } from './BottomSheet'
import { useBottomSheetStore } from '../model/store'

export const CommentsSheet = () => {
  const isOpen = useBottomSheetStore(
    (s) => s.isOpen,
  )

  const type = useBottomSheetStore(
    (s) => s.type,
  )

  const close = useBottomSheetStore(
    (s) => s.close,
  )

  return (
    <BottomSheet
      isOpen={isOpen && type === 'comments'}
      onClose={close}
    >
      <div className="pb-10">
        <h2
          className="
            mb-4
            text-xl
            font-semibold
          "
        >
          Комментарии
        </h2>

        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="
                rounded-2xl
                border
                border-[var(--color-border)]
                bg-[var(--color-bg)]
                p-4
              "
            >
              <div className="mb-2 text-sm font-medium">
                user_{i}
              </div>

              <div className="text-sm opacity-80">
                Lorem ipsum dolor sit amet.
              </div>
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  )
}