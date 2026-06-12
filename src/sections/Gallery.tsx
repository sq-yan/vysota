import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './SectionHeader'
import { GALLERY_PHOTOS } from '../data/photos'

const TILES = [
  { src: GALLERY_PHOTOS[0], caption: 'Высотные работы', span: 'row-span-2 col-span-1', h: 520 },
  { src: GALLERY_PHOTOS[1], caption: 'Снаряжение и страховка', span: 'col-span-1', h: 250 },
  { src: GALLERY_PHOTOS[2], caption: 'Промышленные объекты', span: 'col-span-1', h: 250 },
  { src: GALLERY_PHOTOS[3], caption: 'Конструкции', span: 'col-span-2', h: 260 },
  { src: GALLERY_PHOTOS[4], caption: 'Фасады и окна', span: 'col-span-1', h: 260 },
  { src: GALLERY_PHOTOS[5], caption: 'Высотки', span: 'col-span-1', h: 260 },
]

export function Gallery() {
  return (
    <section id="gallery" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Атмосфера"
          title="Высота вблизи"
          subtitle="Фотографии с объектов, на которых работаем — снаряжение, конструкции, виды на город."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {TILES.map((t, i) => (
            <Tile key={t.src + i} src={t.src} caption={t.caption} span={t.span} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Tile({
  src,
  caption,
  span,
  index,
}: {
  src: string
  caption: string
  span: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-ink-800 ${span}`}
      style={{ minHeight: 180 }}
    >
      <motion.img
        src={src}
        alt={caption}
        loading="lazy"
        decoding="async"
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 will-change-transform [filter:brightness(0.6)_saturate(0.85)] group-hover:[filter:brightness(0.85)_saturate(1)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-flame-700/20 via-transparent to-amber-500/10 mix-blend-overlay opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <motion.div
        initial={false}
        className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="text-[10px] uppercase tracking-[0.25em] text-flame-300">VYSOTA</div>
        <div className="mt-1 font-display text-xl tracking-tight text-white sm:text-2xl">
          {caption}
        </div>
      </motion.div>
    </motion.div>
  )
}
