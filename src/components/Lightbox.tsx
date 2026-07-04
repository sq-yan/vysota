import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Photo } from '../data/photos'

export type LightboxItem = { photo: Photo; caption: string }

// Полноэкранный просмотр фото галереи: клик по плитке открывает кадр крупно.
// Закрытие — крестик, клик по фону, Esc. Листание — стрелки на экране и ← →.
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onNavigate: (next: number) => void
}) {
  const open = index !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index! + 1) % items.length)
      if (e.key === 'ArrowLeft') onNavigate((index! - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    // блокируем прокрутку фона, пока открыт просмотр
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, index, items.length, onClose, onNavigate])

  const current = open ? items[index!] : null

  return createPortal(
    <AnimatePresence>
      {current && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-xl sm:p-10"
        >
          {/* Закрыть */}
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/15 hover:text-white sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Назад */}
          <button
            onClick={e => {
              e.stopPropagation()
              onNavigate((index! - 1 + items.length) % items.length)
            }}
            aria-label="Предыдущее фото"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/15 hover:text-white sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Вперёд */}
          <button
            onClick={e => {
              e.stopPropagation()
              onNavigate((index! + 1) % items.length)
            }}
            aria-label="Следующее фото"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/15 hover:text-white sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.figure
            key={current.photo.src}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative flex max-h-full max-w-5xl flex-col items-center"
          >
            <img
              src={current.photo.src}
              srcSet={current.photo.srcSet}
              sizes="(max-width: 1024px) 100vw, 1024px"
              alt={current.caption}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
            />
            <figcaption className="mt-4 text-center">
              <span className="font-display text-xl tracking-tight text-white sm:text-2xl">
                {current.caption}
              </span>
              <span className="ml-3 text-sm text-steel-400">
                {index! + 1} / {items.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
