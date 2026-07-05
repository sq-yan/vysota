import { m, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { PHOTOS, type Photo } from '../data/photos'
import { BRAND } from '../data/site'
import { Lightbox, type LightboxItem } from '../components/Lightbox'

const SIZES_SMALL = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 370px'
const SIZES_WIDE = '(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 745px'

const TILES = [
  { photo: PHOTOS.uborkaSnega, caption: 'Уборка снега и кровля', span: 'row-span-2 col-span-1', sizes: SIZES_SMALL },
  { photo: PHOTOS.montazhFasad, caption: 'Монтаж на фасаде', span: 'col-span-1', sizes: SIZES_SMALL },
  { photo: PHOTOS.remontShvov, caption: 'Ремонт фасада', span: 'col-span-1', sizes: SIZES_SMALL },
  { photo: PHOTOS.moykaFasada, caption: 'Мойка остекления', span: 'col-span-2', sizes: SIZES_WIDE },
  { photo: PHOTOS.montazhZhk, caption: 'Монтаж на ЖК', span: 'col-span-1', sizes: SIZES_SMALL },
  { photo: PHOTOS.vysotnyeRaboty, caption: 'Высотные работы', span: 'col-span-1', sizes: SIZES_SMALL },
]

const ITEMS: LightboxItem[] = TILES.map(t => ({ photo: t.photo, caption: t.caption }))

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="gallery" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Атмосфера"
          title="Высота вблизи"
          subtitle="Фото и видео с реальных объектов — процесс работ, снаряжение, результат до и после. Наведите на кадр, чтобы приблизить, или откройте на весь экран."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {TILES.map((t, i) => (
            <Tile
              key={t.photo.src + i}
              photo={t.photo}
              sizes={t.sizes}
              caption={t.caption}
              span={t.span}
              index={i}
              onOpen={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      <Lightbox items={ITEMS} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </section>
  )
}

function Tile({
  photo,
  sizes,
  caption,
  span,
  index,
  onOpen,
}: {
  photo: Photo
  sizes: string
  caption: string
  span: string
  index: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Лёгкий параллакс по вертикали. База scale 1.12 перекрывает сдвиг, чтобы
  // не оголялись края; зум по наведению добавляется поверх через whileHover.
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Открыть фото: ${caption}`}
      className={`group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/8 bg-ink-800 outline-none ring-flame-500/0 transition-[box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-flame-500/60 hover:shadow-[0_25px_60px_-20px_rgba(249,115,22,0.35)] ${span}`}
      style={{ minHeight: 180 }}
    >
      <m.img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes={sizes}
        alt={caption}
        loading="lazy"
        decoding="async"
        style={{ y }}
        initial={{ scale: 1.12 }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 will-change-transform [filter:brightness(0.6)_saturate(0.85)] group-hover:[filter:brightness(0.9)_saturate(1.05)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-flame-700/20 via-transparent to-amber-500/10 mix-blend-overlay opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Иконка «раскрыть» — подсказка, что кадр кликабелен */}
      <div
        aria-hidden
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink-950/50 text-white/85 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100"
      >
        <Maximize2 className="h-4 w-4" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="text-[10px] uppercase tracking-[0.25em] text-flame-300">{BRAND}</div>
        <div className="mt-1 font-display text-xl tracking-tight text-white sm:text-2xl">
          {caption}
        </div>
      </div>
    </m.div>
  )
}
