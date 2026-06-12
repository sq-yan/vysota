import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const spring = { damping: 28, stiffness: 320, mass: 0.5 }
  const x = useSpring(mx, spring)
  const y = useSpring(my, spring)
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
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
  }, [mx, my])

  if (!enabled) return null

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{ scale: hovering ? 2.2 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="h-3 w-3 rounded-full bg-white"
        />
      </motion.div>
      <motion.div
        style={{ x: mx, y: my }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[280px] w-[280px] rounded-full bg-flame-500/15 blur-3xl" />
      </motion.div>
    </>
  )
}
