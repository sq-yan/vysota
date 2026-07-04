import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { subscribeSecret, getSecret, setActive } from '../lib/secret'

// Подсказка режима-ножа + выход по Esc. Сами падающие карточки живут в Hero.
export function SecretHud() {
  const [state, setState] = useState(getSecret())
  const active = state.active
  const allCut = state.fallen.length >= 2

  useEffect(() => subscribeSecret(setState), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-10 z-[140] flex flex-col items-center gap-2 px-4 text-center"
        >
          <motion.div
            key={allCut ? 'done' : 'go'}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="font-display text-3xl tracking-tight text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-4xl"
          >
            {allCut ? 'Ну ты и диверсант 🔪' : 'Перережь тросы курсором-ножом'}
          </motion.div>
          <div className="text-xs uppercase tracking-[0.3em] text-steel-400">
            <button
              onClick={() => setActive(false)}
              className="pointer-events-auto transition-colors hover:text-flame-300"
            >
              Esc — выход
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
