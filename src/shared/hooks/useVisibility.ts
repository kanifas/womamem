'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

export const useVisibility = (
  threshold = 0.6,
) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return {
    ref,
    isVisible,
  }
}