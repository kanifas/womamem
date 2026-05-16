'use client'

import {
  FC,
  PropsWithChildren,
  useRef,
  useState,
} from 'react'

import { motion } from 'framer-motion'

type Props = PropsWithChildren<{
  open: boolean
  onClose: () => void
}>

export const BottomSheet: FC<Props> = ({
  open,
  onClose,
  children,
}) => {
  const [snap, setSnap] = useState<
    'collapsed' |
    'medium' |
    'expanded'
  >('medium')

  const scrollRef =
    useRef<HTMLDivElement>(null)

  const bottomRef =
    useRef<HTMLDivElement>(null)

  const inputRef =
    useRef<HTMLInputElement>(null)

  if (!open) return null

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
      <motion.div
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={0.15}
        dragMomentum={false}
        initial={{ y: '100%' }}
        animate={{
          y:
            snap === 'collapsed'
              ? '70%'
              : snap === 'medium'
                ? '35%'
                : '5%',
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 30,
        }}
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