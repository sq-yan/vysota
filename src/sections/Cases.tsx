import { m, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, MapPin, Maximize2, Calendar } from 'lucide-react'
import { useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { SectionHeader } from './SectionHeader'
import { PHOTOS, type Photo } from '../data/photos'

type CaseItem = {
  title: string
  category: string
  meta: string
  area: string
  days: string
  location: string
  image: Photo
  sizes: string
  span: string
  big?: boolean
}

const SIZES_LARGE = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 580px'
const SIZES_SMALL = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px'

const CASES: CaseItem[] = [
  {
    title: 'Капремонт швов высотки',
    category: 'Швы',
    meta: '120 п.м. · 4 дня',
    area: '120 п.м.',
    days: '4 дня',
    location: 'Москва, Юго-Запад',
    image: PHOTOS.germetizatsiyaShvov,
    sizes: SIZES_LARGE,
    span: 'lg:col-span-2 lg:row-span-2',
    big: true,
  },
  {
    title: 'Мойка фасада БЦ',
    category: 'Мойка',
    meta: '6 этажей · 1 день',
    area: '6 этажей',
    days: '1 день',
    location: 'Москва, бизнес-центр',
    image: PHOTOS.moykaFasada,
    sizes: SIZES_LARGE,
    span: 'lg:col-span-2',
  },
  {
    title: 'Ремонт фасада',
    category: 'Фасад',
    meta: '320 м² · 6 дней',
    area: '320 м²',
    days: '6 дней',
    location: 'Москва, жилой дом',
    image: PHOTOS.remontShvov,
    sizes: SIZES_SMALL,
    span: 'lg:col-span-1',
  },
  {
    title: 'Монтаж на фасаде ЖК',
    category: 'Монтаж',
    meta: '8 точек · 2 дня',
    area: '8 точек',
    days: '2 дня',
    location: 'Москва, жилой комплекс',
    image: PHOTOS.montazhZhk,
    sizes: SIZES_SMALL,
    span: 'lg:col-span-1',
  },
]

export function Cases() {
  return (
    <section id="cases" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Объекты"
          title="С чем работали"
          subtitle="Каждый объект фиксируем фото и видео. Работаем по Москве и Подмосковью."
        />
        <div className="mt-14 grid auto-rows-[280px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CASES.map((c, i) => (
            <CaseCard key={c.title} caseData={c} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-steel-400">
          Кейсы — типовые примеры работ. Фотоотчёты с новых объектов добавляем по мере публикации.
        </div>
      </div>
    </section>
  )
}

function CaseCard({ caseData: c, index }: { caseData: CaseItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1])
  // Бесконечный блик — только на десктопе и только пока карточка на экране
  const desktop = useMediaQuery('(min-width: 1024px)')
  const inView = useInView(ref)
  const shimmer = desktop && inView

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-white/8 bg-ink-800 ${c.span}`}
    >
      <m.img
        src={c.image.src}
        srcSet={c.image.srcSet}
        sizes={c.sizes}
        alt={c.title}
        loading="lazy"
        decoding="async"
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 will-change-transform [filter:brightness(0.55)_saturate(0.9)] group-hover:[filter:brightness(0.75)_saturate(1.1)]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-flame-700/20 via-transparent to-amber-500/10 mix-blend-overlay opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-15 mix-blend-overlay"
      />
      {shimmer && (
        <m.div
          aria-hidden
          animate={{ x: ['-120%', '120%'] }}
          transition={{
            duration: 9 + index * 1.2,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.8,
          }}
          className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent"
        />
      )}

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-flame-500/40 bg-flame-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-flame-200 backdrop-blur-sm">
            {c.category}
          </span>
          <m.div
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full border border-white/20 bg-black/30 p-2 backdrop-blur-sm transition-colors duration-300 group-hover:border-flame-400 group-hover:bg-flame-500 group-hover:text-black"
          >
            <ArrowUpRight className="h-4 w-4" />
          </m.div>
        </div>

        <div>
          <h3
            className={`font-display tracking-tight ${c.big ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}
          >
            {c.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-steel-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-flame-400" />
              {c.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5 text-flame-400" />
              {c.area}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-flame-400" />
              {c.days}
            </span>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-flame-500/0 transition-all duration-500 group-hover:ring-flame-500/30 group-hover:[box-shadow:0_0_60px_-10px_rgba(249,115,22,0.4)_inset]"
      />
    </m.div>
  )
}
