import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { useRef } from 'react'

type Props = {
  children: ReactNode
  className?: string
  max?: number
}

export function TiltCard({ children, className, max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { damping: 22, stiffness: 220 })
  const sy = useSpring(my, { damping: 22, stiffness: 220 })

  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const glareX = useTransform(sx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(sy, [0, 1], ['0%', '100%'])

  const handleMove = (e: ReactMouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      className={className}
    >
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(249,115,22,0.18), transparent 50%)`,
        }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  )
}
