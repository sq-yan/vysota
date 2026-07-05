import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, durationMs = 1600, start = true, delayMs = 0) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let timer = 0

    const run = () => {
      const startTime = performance.now()
      const tick = (now: number) => {
        if (reduce) {
          setValue(target)
          return
        }
        const t = Math.min(1, (now - startTime) / durationMs)
        // квартик ease-out: длинный мягкий хвост в конце — счёт «дотормаживает»
        const eased = 1 - Math.pow(1 - t, 4)
        setValue(target * eased)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // задержка старта — чтобы счёт начинался в момент появления блока, а не в t=0
    if (delayMs > 0) timer = window.setTimeout(run, delayMs)
    else run()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [target, durationMs, start, delayMs])

  return value
}
