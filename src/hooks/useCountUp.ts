import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, durationMs = 1600, start = true) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      if (reduce) {
        setValue(target)
        return
      }
      const t = Math.min(1, (now - startTime) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs, start])

  return value
}
