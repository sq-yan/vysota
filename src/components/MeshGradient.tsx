import { m, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

// Фоновая «дышащая» подсветка Hero. На десктопе — три анимированных блоба
// с mouse-parallax (через motion values, без ре-рендеров), на мобильных —
// статичные градиенты без blur-анимаций: бюджетные GPU не тянут
// одновременно blur(140px) и бесконечные keyframes.
export function MeshGradient() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const lite = useMediaQuery('(max-width: 1023px), (pointer: coarse)')
  // Когда Hero ушёл за экран — бесконечные анимации останавливаем.
  const inView = useInView(ref, { margin: '20% 0px 20% 0px' })
  const animate = !lite && !reduced && inView

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { damping: 40, stiffness: 90 })
  const sy = useSpring(py, { damping: 40, stiffness: 90 })
  const nsx = useMotionValue(0)
  const nsy = useMotionValue(0)

  useEffect(() => {
    if (lite || reduced) return
    const onMove = (e: MouseEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 40)
      py.set((e.clientY / window.innerHeight - 0.5) * 40)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [lite, reduced, px, py])

  useEffect(() => {
    // зеркальные значения для второго блоба
    const ux = sx.on('change', v => nsx.set(-v))
    const uy = sy.on('change', v => nsy.set(-v))
    return () => {
      ux()
      uy()
    }
  }, [sx, sy, nsx, nsy])

  if (lite) {
    return (
      <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Статичная версия: тот же характер света одним слоем градиентов */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 45% at 20% 0%, rgba(249,115,22,0.16), transparent 70%), radial-gradient(50% 45% at 90% 40%, rgba(245,158,11,0.10), transparent 70%), radial-gradient(45% 40% at 35% 100%, rgba(194,65,12,0.12), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: 'linear-gradient(to top, rgba(7,11,22,0.95), transparent)' }}
        />
      </div>
    )
  }

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <m.div
        animate={animate ? { rotate: 360 } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(249,115,22,0.18), rgba(234,88,12,0.05), rgba(251,146,60,0.18), rgba(7,11,22,0.0), rgba(249,115,22,0.18))',
          filter: 'blur(80px)',
          opacity: 0.45,
        }}
      />
      {/* Параллакс — на обёртке, keyframes — на вложенном слое: у framer
          x/translateX одно свойство, на одном элементе они бы конфликтовали */}
      <m.div style={{ x: sx, y: sy }} className="absolute -top-32 left-[10%]">
        <m.div
          animate={animate ? { x: [0, 80, -40, 0], y: [0, 50, -30, 0] } : undefined}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="h-[520px] w-[520px] rounded-full bg-flame-500/30 blur-[140px]"
        />
      </m.div>
      <m.div style={{ x: nsx, y: nsy }} className="absolute top-1/3 right-[6%]">
        <m.div
          animate={animate ? { x: [0, -80, 40, 0], y: [0, 30, -40, 0] } : undefined}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="h-[600px] w-[600px] rounded-full bg-amber-500/15 blur-[160px]"
        />
      </m.div>
      <m.div
        animate={animate ? { x: [0, 50, -60, 0], y: [0, -50, 30, 0] } : undefined}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-1/3 h-[460px] w-[460px] rounded-full bg-orange-700/20 blur-[140px]"
      />
      <div
        className="absolute inset-0 bg-grid-faint bg-[size:56px_56px] opacity-50"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.9), transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.9), transparent 75%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: 'linear-gradient(to top, rgba(7,11,22,0.95), transparent)' }}
      />
    </div>
  )
}
