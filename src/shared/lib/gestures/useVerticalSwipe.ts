'use client'

import {
  RefObject,
  useRef,
} from 'react'

type Params = {
  containerRef: RefObject<HTMLDivElement | null>

  onNext: () => void
  onPrev: () => void

  canGoNext: boolean
  canGoPrev: boolean
}

export const useVerticalSwipe = ({
  containerRef,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
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

  const currentTranslateY = useRef(0)

  const animateTo = (
    target: number,
    initialVelocity = 0,
    onComplete?: () => void,
  ) => {
    const element = containerRef.current

    if (!element) {
      return
    }

    let position = currentTranslateY.current
    // ultra-native TikTok feel:
    // let velocity = initialVelocity * 8
    // const stiffness = 0.07
    // const damping = 0.62
    let velocity = initialVelocity * 10
    const stiffness = 0.075
    const damping = 0.68
    const epsilon = 0.5

    const animate = () => {
      const distance = target - position
      const springForce = distance * stiffness

      velocity += springForce

      velocity *= damping

      position += velocity

      // Это (два ниже if) убирает
      // микродрожание
      // lingering frames
      // subpixel wobble
      // tail oscillation.
      if (Math.abs(target - position) < epsilon) {
        position = target
      }
      if (Math.abs(velocity) < 0.01) {
        velocity = 0
      }

      element.style.transform = `
        translate3d(
          0,
          ${position}px,
          0
        )
      `

      if (Math.abs(velocity) < epsilon && Math.abs(distance) < epsilon) {
        element.style.transform = `
          translate3d(
            0,
            ${target}px,
            0
          )
        `

        currentTranslateY.current = target
        onComplete?.()
        return
      }

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
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

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) {
      return
    }

    const deltaX = e.clientX - pointerStartX.current
    const deltaY = e.clientY - pointerStartY.current

    if (!lockedDirection.current) {
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

    const tryingToGoNext = deltaY < 0
    const tryingToGoPrev =  deltaY > 0
    const blocked = (tryingToGoNext && !canGoNext) || (tryingToGoPrev && !canGoPrev)

    const absDelta = Math.abs(deltaY)

    const direction = deltaY < 0 ? -1 : 1

    const resistanceFactor = blocked ? 0.006 : 0.015

    const resistedDelta = (1 - (1 / (absDelta * resistanceFactor + 1)))
      * absDelta
      * direction

    const now = performance.now()

    const deltaTime = now - lastMoveTime.current

    if (deltaTime > 0) {
      velocityY.current = (resistedDelta - currentTranslateY.current) / deltaTime
    }

    lastMoveTime.current = now

    currentTranslateY.current = resistedDelta

    const element = containerRef.current

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
      canGoNext
      && (
        deltaY < -distanceThreshold
        || velocityY.current
        < -velocityThreshold
      )
    ) {
      animateTo(
        -window.innerHeight,
        velocityY.current,
        () => {
          onNext()

          const element =
            containerRef.current

          if (!element) {
            return
          }

          element.style.transform =
            'translate3d(0,0,0)'

          currentTranslateY.current = 0
        },
      )

      return
    }

    if (
      canGoPrev
      && (
        deltaY > distanceThreshold
        || velocityY.current
        > velocityThreshold
      )
    ) {
      animateTo(
        window.innerHeight,
        velocityY.current,
        () => {
          onPrev()

          const element =
            containerRef.current

          if (!element) {
            return
          }

          element.style.transform =
            'translate3d(0,0,0)'

          currentTranslateY.current = 0
        },
      )

      return
    }

    animateTo(
      0,
      velocityY.current,
    )
  }

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  }
}

// масса
// физичность
// плавность
// native feel

// Следующий шаг После этого уже можно:

// rubber band edges Rubber-band physics (как iOS)
// resistance zones
// overscroll physics
// predictive next rendering
// horizontal variant swipe
// media lifecycle manager