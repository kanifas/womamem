'use client'

import { FC, PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RemoveScroll } from 'react-remove-scroll'

type Props = PropsWithChildren<{
  isOpen?: boolean
  onClose?: () => void
}>

export const BottomSheet: FC<Props> = ({
  isOpen = false,
  onClose = () => {},
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll>
          <>
            {/* backdrop */}
            <motion.div
              className="
                fixed
                inset-0
                z-90
                bg-black/60
                backdrop-blur-sm
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* sheet */}
            <motion.div
              className="
                fixed
                bottom-0
                left-0
                right-0
                z-[100]

                max-h-[85vh]
                overflow-hidden

                rounded-t-3xl
                border-t
                border-[var(--color-border)]

                bg-[var(--color-card)]
                shadow-2xl
              "
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 30,
              }}

              drag="y"
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              dragElastic={0.15}

              onDragEnd={(e, info) => {
                if (
                  info.offset.y > 120 ||
                  info.velocity.y > 700
                ) {
                  onClose()
                }
              }}
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
                  overflow-y-auto
                  px-4
                  pb-[max(env(safe-area-inset-bottom),24px)]
                "
              >
                {children}
              </div>
            </motion.div>
          </>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}