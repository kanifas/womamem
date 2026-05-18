'use client'

import { FC } from 'react'

import {
  closestCenter,
  DndContext,
} from '@dnd-kit/core'

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'

import { AdminVariantCard } from './AdminVariantCard'

import { VariantDraft } from '../model/types'

type Props = {
  variants: VariantDraft[]

  setVariants: (
    variants: VariantDraft[],
  ) => void
}

export const AdminVariantManager: FC<Props> = ({
  variants,
  setVariants,
}) => {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        const { active, over } = event

        if (!over) return

        if (active.id === over.id) return

        const oldIndex = variants.findIndex(
          (v) => v.id === active.id,
        )

        const newIndex = variants.findIndex(
          (v) => v.id === over.id,
        )

        const reordered = arrayMove(
          variants,
          oldIndex,
          newIndex,
        ).map((v, index) => ({
          ...v,
          sortOrder: index,
        }))

        setVariants(reordered)
      }}
    >
      <SortableContext
        items={variants.map((v) => v.id)}
        strategy={rectSortingStrategy}
      >
        <div
          className="
            grid
            grid-cols-2
            gap-4
            md:grid-cols-3
            xl:grid-cols-4
          "
        >
          {variants.map((variant, index) => {
            const hasAnotherOriginal = variants.some((v) => v.id !== variant.id && v.style === 'original')

            return (
              <AdminVariantCard
                key={variant.id}
                variant={variant}
                active={index === 0}
                disableOriginal={
                  hasAnotherOriginal
                }
                onChange={(nextVariant) => {
                  setVariants(
                    variants.map((v) =>
                      v.id === nextVariant.id
                        ? nextVariant
                        : nextVariant.style
                            === 'original'
                            && v.style === 'original'
                          ? {
                              ...v,
                              style: 'sticker',
                            }
                          : v,
                    ),
                  )
                }}
                onDelete={() => {
                  setVariants(
                    variants.filter(
                      (v) =>
                        v.id !== variant.id,
                    ),
                  )
                }}
              />
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}