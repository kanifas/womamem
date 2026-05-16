'use client'

import {
  FC,
  PropsWithChildren,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react'

import {
  motion,
  useMotionValue,
  animate,
} from 'framer-motion'

type Props = PropsWithChildren<{
  open: boolean
  onClose: () => void
}>

export const BottomSheet: FC<Props> = ({
  open,
  onClose,
  children,
}) => {
  const [snap, setSnap] = useState<'collapsed' | 'medium' | 'expanded'>('medium')
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const y = useMotionValue(0)

  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000

  const snapPoints = useMemo(() => ({
    collapsed: viewportHeight * 0.7,
    medium: viewportHeight * 0.35,
    expanded: viewportHeight * 0.05,
  }), [viewportHeight])

  useEffect(() => {
    animate(
      y,
      snapPoints[snap],
      {
        type: 'spring',
        stiffness: 320,
        damping: 34,
      },
    )
  }, [snap, snapPoints, y])

  if (!open) return null

  return (
    <div
      className="
        fixed
        inset-0
        z-200
        bg-black/50
      "
      onClick={onClose}
    >
      <motion.div
        style={{ y }}
        dragElastic={0.15}
        dragMomentum={false}
        initial={false}

        onClick={(e) => {
          e.stopPropagation()
        }}
        className="
          absolute
          inset-x-0
          bottom-0
          flex
          h-[100dvh]
          flex-col
          rounded-t-3xl
          border-t
          border-[var(--color-border)]
          bg-[var(--color-card)]
        "
      >
        {/* handle */}
        <motion.div
          drag="y"
          dragConstraints={{
            top: 0,
            bottom: 0,
          }}
          dragElastic={0.12}
          dragMomentum={false}
          onDrag={(e, info) => {
            const nextY = snapPoints[snap] + info.offset.y
            y.set(nextY)
          }}
          onDragEnd={(e, info) => {
            const offset = info.offset.y
            const velocity = info.velocity.y

            if (offset > 120 || velocity > 900) {
              if (snap === 'expanded') {
                setSnap('medium')
                return
              }

              if (snap === 'medium') {
                setSnap('collapsed')
                return
              }

              onClose()
              return
            }

            if (offset < -120 || velocity < -900) {
              if (snap === 'collapsed') {
                setSnap('medium')
                return
              }

              if (snap === 'medium') {
                setSnap('expanded')
              }
            }
          }}
          className="
            flex
            justify-center
            py-3
            cursor-grab
            active:cursor-grabbing
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
        </motion.div>

        {/* content */}
        <div
          ref={scrollRef}
          className="
            flex-1
            overflow-y-auto
            overscroll-contain
            px-4
          "
        >
          {children}

          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div
          className="
            border-t
            border-[var(--color-border)]
            p-3
            pb-[max(env(safe-area-inset-bottom),12px)]
          "
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Написать комментарий..."
            onFocus={() => {
              setSnap('expanded')

              requestAnimationFrame(() => {
                bottomRef.current?.scrollIntoView({
                  behavior: 'smooth',
                })
              })
            }}
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
      </motion.div>
    </div>
  )
}