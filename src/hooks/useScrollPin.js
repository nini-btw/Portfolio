import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Drives a "pinned section with discrete panels" scroll interaction.
 *
 * The wrapper element is expected to occupy `count * 100vh` of page height
 * and contain a `position: sticky; top: 0` child that visually stays fixed
 * on screen while the wrapper's extra height scrolls underneath it. This
 * hook tracks which panel should be active based on how far the page has
 * scrolled through the wrapper, and — once the user stops scrolling —
 * snaps the page to the nearest panel boundary so panels always settle on
 * a discrete "screen", never mid-transition.
 *
 * @param {import('react').RefObject<HTMLElement>} wrapperRef
 * @param {number} count - number of panels (0 disables the hook)
 * @returns {{ activeIndex: number, scrollToIndex: (index: number) => void }}
 */
export function useScrollPin(wrapperRef, count) {
  const [activeIndex, setActiveIndex] = useState(0)
  const snapTimeout = useRef(null)
  const countRef = useRef(count)
  countRef.current = count

  const getTargetScrollY = useCallback(
    (index) => {
      const wrapper = wrapperRef.current
      if (!wrapper) return null
      const rect = wrapper.getBoundingClientRect()
      const vh = window.innerHeight
      return window.scrollY + rect.top + index * vh
    },
    [wrapperRef]
  )

  const scrollToIndex = useCallback(
    (index) => {
      const target = getTargetScrollY(index)
      if (target !== null) window.scrollTo({ top: target, behavior: 'smooth' })
    },
    [getTargetScrollY]
  )

  useEffect(() => {
    if (count === 0) return undefined

    function handleScroll() {
      const wrapper = wrapperRef.current
      if (!wrapper) return
      const rect = wrapper.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = -rect.top / vh
      const progress = Math.min(Math.max(raw, 0), countRef.current - 1)
      const index = Math.round(progress)

      setActiveIndex((prev) => (prev === index ? prev : index))

      clearTimeout(snapTimeout.current)
      // Only auto-snap while the wrapper is actually pinned/in-range —
      // avoids fighting normal scrolling through the rest of the page.
      if (raw >= -0.05 && raw <= countRef.current - 0.95) {
        snapTimeout.current = setTimeout(() => {
          const target = getTargetScrollY(index)
          if (target !== null && Math.abs(window.scrollY - target) > 2) {
            // Instant, not smooth: a smooth re-scroll kicking in after the user
            // has already stopped scrolling leaves the page visibly animating
            // on its own for hundreds of ms — during which a panel mid-transition
            // can render behind the fixed navbar. Snapping instantly collapses
            // that unsafe window to effectively nothing. `scrollToIndex` below
            // (the deliberate dot-click navigation) stays smooth on purpose.
            window.scrollTo({ top: target, behavior: 'instant' })
          }
        }, 120)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(snapTimeout.current)
    }
  }, [wrapperRef, count, getTargetScrollY])

  return { activeIndex, scrollToIndex }
}
