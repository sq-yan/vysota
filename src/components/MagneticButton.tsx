import { m, useMotionValue, useSpring } from 'framer-motion'
import type { ElementType, MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { useRef } from 'react'

type Props = {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  strength?: number
  target?: string
  rel?: string
}

export function MagneticButton({
  href,
  onClick,
  children,
  className,
  strength = 22,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { damping: 16, stiffness: 220, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const handleMove = (e: ReactMouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) / (r.width / 2)
    const dy = (e.clientY - cy) / (r.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = (href ? m.a : m.button) as ElementType
  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-magnetic
      className={className}
    >
      {children}
    </Comp>
  )
}
