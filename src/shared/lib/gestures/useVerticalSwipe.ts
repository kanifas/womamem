'use client'

import {
  RefObject,
  useRef,
} from 'react'

type Params = {
  containerRef: RefObject<HTMLDivElement | null>

  onNext: () => void
  onPrev: () => void
}

export const useVerticalSwipe = ({
  containerRef,
  onNext,
  onPrev,
}: Params) => {
  const pointerStartY = useRef(0)
  const pointerStartX = useRef(0)

  const dragging = useRef(false)

  const lockedDirection = useRef<
    'vertical'
    | 'horizontal'
    | null
  >(null)

  const lastMoveTime = useRef(0)

  const velocityY = useRef(0)

  const currentTranslateY =
    useRef(0)

  const animateTo = (
    target: number,
  ) => {
    const element =
      containerRef.current

    if (!element) {
      return
    }

    element.style.transition =
      'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)'

    element.style.transform = `
      translate3d(
        0,
        ${target}px,
        0
      )
    `

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.transition =
          ''
      })
    })
  }

  const handlePointerDown = (
    e: React.PointerEvent,
  ) => {
    dragging.current = true

    pointerStartY.current =
      e.clientY

    pointerStartX.current =
      e.clientX

    velocityY.current = 0

    currentTranslateY.current = 0

    lockedDirection.current = null

    lastMoveTime.current =
      performance.now()
  }

  const handlePointerMove = (
    e: React.PointerEvent,
  ) => {
    if (!dragging.current) {
      return
    }

    const deltaX =
      e.clientX
      - pointerStartX.current

    const deltaY =
      e.clientY
      - pointerStartY.current

    if (
      !lockedDirection.current
    ) {
      const absX =
        Math.abs(deltaX)

      const absY =
        Math.abs(deltaY)

      if (
        absX < 8
        && absY < 8
      ) {
        return
      }

      lockedDirection.current =
        absY > absX
          ? 'vertical'
          : 'horizontal'

      if (
        lockedDirection.current
        !== 'vertical'
      ) {
        return
      }
    }

    const resistedDelta =
      deltaY * 0.92

    const now =
      performance.now()

    const deltaTime =
      now
      - lastMoveTime.current

    if (deltaTime > 0) {
      velocityY.current =
        (
          resistedDelta
          - currentTranslateY.current
        ) / deltaTime
    }

    lastMoveTime.current = now

    currentTranslateY.current =
      resistedDelta

    const element =
      containerRef.current

    if (!element) {
      return
    }

    element.style.transform = `
      translate3d(
        0,
        ${resistedDelta}px,
        0
      )
    `
  }

  const handlePointerUp = () => {
    dragging.current = false

    const deltaY =
      currentTranslateY.current

    const distanceThreshold = 120

    const velocityThreshold = 0.7

    if (
      deltaY < -distanceThreshold
      || velocityY.current
      < -velocityThreshold
    ) {
      animateTo(-window.innerHeight)

      setTimeout(() => {
        onNext()

        const element =
          containerRef.current

        if (!element) {
          return
        }

        element.style.transform =
          'translate3d(0,0,0)'
      }, 220)

      return
    }

    if (
      deltaY > distanceThreshold
      || velocityY.current
      > velocityThreshold
    ) {
      animateTo(window.innerHeight)

      setTimeout(() => {
        onPrev()

        const element =
          containerRef.current

        if (!element) {
          return
        }

        element.style.transform =
          'translate3d(0,0,0)'
      }, 220)

      return
    }

    animateTo(0)
  }

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  }
}