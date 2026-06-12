import { motion, useReducedMotion } from 'framer-motion'
import { useMouse } from '../hooks/useMouse'

export function MeshGradient() {
  const reduced = useReducedMotion()
  const { x, y } = useMouse()
  const px = typeof window !== 'undefined' ? (x / window.innerWidth - 0.5) * 40 : 0
  const py = typeof window !== 'undefined' ? (y / window.innerHeight - 0.5) * 40 : 0

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={reduced ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(249,115,22,0.18), rgba(234,88,12,0.05), rgba(251,146,60,0.18), rgba(6,7,10,0.0), rgba(249,115,22,0.18))',
          filter: 'blur(80px)',
          opacity: 0.45,
        }}
      />
      <motion.div
        animate={reduced ? undefined : { x: [0, 80, -40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: px, y: py }}
        className="absolute -top-32 left-[10%] h-[520px] w-[520px] rounded-full bg-flame-500/30 blur-[140px]"
      />
      <motion.div
        animate={reduced ? undefined : { x: [0, -80, 40, 0], y: [0, 30, -40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: -px, y: -py }}
        className="absolute top-1/3 right-[6%] h-[600px] w-[600px] rounded-full bg-amber-500/15 blur-[160px]"
      />
      <motion.div
        animate={reduced ? undefined : { x: [0, 50, -60, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-1/3 h-[460px] w-[460px] rounded-full bg-orange-700/20 blur-[140px]"
      />
      <div
        className="absolute inset-0 bg-grid-faint bg-[size:56px_56px] opacity-50"
        style={{
          maskImage:
            'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.9), transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.9), transparent 75%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, rgba(6,7,10,0.95), transparent)',
        }}
      />
    </div>
  )
}
