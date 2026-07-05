import { m, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <m.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-flame-500 via-amber-400 to-flame-300 shadow-[0_0_16px_rgba(249,115,22,0.6)]"
    />
  )
}
