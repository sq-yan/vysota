import { useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

// Закрываемая промо-полоса вверху. Высоту отдаёт в CSS-переменную --promo-h,
// на которую опирается верхний отступ шапки. Закрытие запоминается.
const KEY = 'vr-promo-dismissed'
const HEIGHT = '2.5rem'

export function PromoBar() {
  const [visible, setVisible] = useState(
    () => typeof window === 'undefined' || localStorage.getItem(KEY) !== '1',
  )

  // До первой отрисовки выставляем отступ, чтобы шапка не «прыгала».
  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--promo-h', visible ? HEIGHT : '0px')
  }, [visible])

  const close = () => {
    localStorage.setItem(KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[60] flex h-10 items-center justify-center bg-gradient-to-r from-flame-600 to-amber-500 px-10 text-black"
        >
          <Sparkles className="mr-2 h-4 w-4 shrink-0" />
          <p className="truncate text-sm font-medium">
            Первый заказ со скидкой 10% — успейте до конца месяца.{' '}
            <a href="#contact" className="underline underline-offset-2 hover:no-underline">
              Получить расчёт
            </a>
          </p>
          <button
            onClick={close}
            aria-label="Закрыть"
            className="absolute right-3 grid h-6 w-6 place-items-center rounded-full transition hover:bg-black/15"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
