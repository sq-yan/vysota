import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'
import { subscribeSecret } from '../lib/secret'

export function Cursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const spring = { damping: 28, stiffness: 320, mass: 0.5 }
  const x = useSpring(mx, spring)
  const y = useSpring(my, spring)
  const [hovering, setHovering] = useState(false)
  const [cutter, setCutter] = useState(false)
  // Кастомный курсор только там, где есть точный указатель — известно сразу
  const [enabled] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  useEffect(() => subscribeSecret(s => setCutter(s.active)), [])

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      const interactive = t?.closest('a, button, [data-magnetic], [role="button"]')
      setHovering(!!interactive)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [enabled, mx, my])

  if (!enabled) return null

  return (
    <>
      <m.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[300] -translate-x-1/2 -translate-y-1/2"
      >
        {cutter ? (
          <m.img
            src="/logo-mark.png"
            alt=""
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: -28 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="h-10 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          />
        ) : (
          <m.div
            animate={{ scale: hovering ? 2.2 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="h-3 w-3 rounded-full bg-white mix-blend-difference"
          />
        )}
      </m.div>
      <m.div
        style={{ x: mx, y: my }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[280px] w-[280px] rounded-full bg-flame-500/15 blur-3xl" />
      </m.div>
    </>
  )
}
