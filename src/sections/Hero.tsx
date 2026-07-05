import { m, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, CircleDot, Shield, BadgeCheck } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MeshGradient } from '../components/MeshGradient'
import { MagneticButton } from '../components/MagneticButton'
import { SplitText } from '../components/SplitText'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { BrandMark } from '../components/BrandMark'
import { PHOTOS } from '../data/photos'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { subscribeSecret, getSecret, fall } from '../lib/secret'

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null)
  // Коллаж виден только на lg+; не рендерим его вовсе, чтобы телефоны не качали фото
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const imgY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const sideY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center px-5 pt-24 sm:px-8"
    >
      {/* Реальный бэкдроп — стеклянный фасад на закате. Под MeshGradient (-z-20),
          навигационные градиенты ниже (-z-10) уводят левый край в navy под текст. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <img
          src={PHOTOS.heroBg.src}
          srcSet={PHOTOS.heroBg.srcSet}
          // при object-cover на портретном экране видимая ширина кадра
          // ~ высота вьюпорта × аспект фото (1.78), иначе браузер возьмёт мыло
          sizes="(orientation: portrait) 178vh, 100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[62%_center] opacity-[0.78] [filter:saturate(0.95)_contrast(1.05)]"
        />
        {/* базовый скрим: сверху и снизу уводим в ink, чтобы контент дышал */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7,11,22,0.55) 0%, rgba(7,11,22,0.12) 32%, rgba(7,11,22,0.35) 78%, rgba(7,11,22,0.92) 100%)',
          }}
        />
      </div>

      <MeshGradient />

      {/* Navy-затемнение слева: текст на глубоком синем, тёплый свет уходит вправо */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,11,22,0.9) 0%, rgba(7,11,22,0.45) 38%, rgba(7,11,22,0) 65%)',
        }}
      />

      {/* Тёплое свечение справа — уход в navy, как на референсе */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-2/3"
        style={{
          background:
            'radial-gradient(60% 60% at 85% 40%, rgba(249,115,22,0.20), rgba(249,115,22,0.06) 45%, transparent 70%)',
        }}
      />

      {/* Призрачная фирменная «V» за контентом */}
      <BrandMark className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80vh] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />

      <m.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <m.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-flame-500/30 bg-flame-500/10 px-4 py-1.5 text-xs font-medium text-flame-300 backdrop-blur-sm"
          >
            <CircleDot className="h-3.5 w-3.5 animate-pulse" />
            Принимаем заказы — выезд в течение 24 часов
          </m.span>

          <h1 className="mt-8 font-display text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.9] tracking-tight">
            <SplitText as="span" text="Работаем там," className="block" />
            <SplitText as="span" text="где другие" className="block" delay={0.2} />
            <span className="block">
              <SplitText
                as="span"
                text="боятся"
                delay={0.45}
                highlight={{
                  word: 'боятся',
                  render: w => (
                    <span className="relative inline-block">
                      <span className="shimmer-flame bg-clip-text text-transparent">
                        {w}
                      </span>
                      <m.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          delay: 1.1,
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="shimmer-flame absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full"
                      />
                    </span>
                  ),
                }}
              />
            </span>
          </h1>

          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-steel-300 sm:text-xl"
          >
            Промышленный альпинизм в Москве — герметизация швов, мойка
            фасадов, покраска и монтаж на высоте без лесов. Работаем с УК,
            ТСЖ и бизнес-центрами. Договор, страховка до 5 млн ₽, фотоотчёт.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-flame-500 px-7 py-3.5 text-base font-semibold text-black shadow-glow-flame transition hover:bg-flame-400"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Получить расчёт</span>
              <ArrowUpRight className="relative h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              href="#services"
              strength={14}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-base font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/[0.08]"
            >
              Что мы делаем
            </MagneticButton>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 grid max-w-xl grid-cols-2 gap-y-7 border-t border-white/5 pt-8 sm:grid-cols-4"
          >
            <Stat value={7} suffix="+" label="лет на высоте" />
            <Stat value={350} suffix="+" label="объектов" />
            <InjuriesStat />
            <Stat value={24} suffix="/7" label="срочный выезд" />
          </m.div>
        </div>

        {isDesktop && <HeroCollage imgY={imgY} sideY={sideY} imgScale={imgScale} />}
      </m.div>

      <m.div
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-steel-400"
      >
        <ArrowDown className="h-5 w-5" />
      </m.div>
    </section>
  )
}

function HeroCollage({
  imgY,
  sideY,
  imgScale,
}: {
  imgY: ReturnType<typeof useTransform<number, number>>
  sideY: ReturnType<typeof useTransform<number, number>>
  imgScale: ReturnType<typeof useTransform<number, number>>
}) {
  const [secret, setSecret] = useState(getSecret())
  useEffect(() => subscribeSecret(setSecret), [])
  const { active } = secret
  const fellA = secret.fallen.includes('a')
  const fellB = secret.fallen.includes('b')

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto hidden h-[520px] w-full max-w-md lg:block"
    >
      {/* Карточка A — большая */}
      <Cuttable anchor="left-0 top-0 h-[420px] w-[78%]" active={active} fallen={fellA} onCut={() => fall('a')} dir={-1}>
        <m.div
          style={{ y: imgY, scale: imgScale }}
          animate={{ rotate: [-1.2, 1.2, -1.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_-20px_rgba(249,115,22,0.35)] will-change-transform"
        >
          <img
            src={PHOTOS.vysotnyeRaboty.src}
            srcSet={PHOTOS.vysotnyeRaboty.srcSet}
            sizes="340px"
            alt="Высотные работы — фасад"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover [filter:saturate(0.85)_contrast(1.05)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-ink-950/60 via-transparent to-flame-500/15 mix-blend-overlay"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/85 to-transparent"
          />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-flame-300">
                Действующий объект
              </div>
              <div className="mt-1 font-display text-2xl tracking-tight">Москва</div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] backdrop-blur-md">
              <CircleDot className="h-2.5 w-2.5 animate-pulse text-flame-400" />
              LIVE
            </div>
          </div>
        </m.div>
      </Cuttable>

      {/* Карточка B — боковая */}
      <Cuttable anchor="-right-2 bottom-0 h-[260px] w-[60%]" active={active} fallen={fellB} onCut={() => fall('b')} dir={1}>
        <m.div
          style={{ y: sideY }}
          animate={{ rotate: [3, -2, 3] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-full w-full overflow-hidden rounded-[24px] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] will-change-transform"
        >
          <img
            src={PHOTOS.montazhFasad.src}
            srcSet={PHOTOS.montazhFasad.srcSet}
            sizes="230px"
            alt="Промальп — монтаж на фасаде"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover [filter:saturate(0.9)_brightness(0.95)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/80"
          />
        </m.div>
      </Cuttable>

      {/* Плашка «Страховка» — гаснет вместе с карточкой A */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: fellA ? 0 : 1, y: fellA ? 24 : 0 }}
        transition={{ duration: 0.5, delay: fellA ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-6 top-12 z-20 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/90 px-3.5 py-2.5 text-xs text-white shadow-xl"
      >
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-flame-500/15 ring-1 ring-flame-500/30">
          <Shield className="h-4 w-4 text-flame-300" />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] uppercase tracking-[0.2em] text-steel-400">Страховка</div>
          <div className="font-semibold">До 5 000 000 ₽</div>
        </div>
      </m.div>

      {/* Плашка «Официально» — гаснет вместе с карточкой B */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: fellB ? 0 : 1, y: fellB ? 24 : 0 }}
        transition={{ duration: 0.5, delay: fellB ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-4 top-40 z-20 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/90 px-3.5 py-2.5 text-xs text-white shadow-xl"
      >
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-flame-500/15 ring-1 ring-flame-500/30">
          <BadgeCheck className="h-4 w-4 text-flame-300" />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] uppercase tracking-[0.2em] text-steel-400">Официально</div>
          <div className="font-semibold">Договор · ИП</div>
        </div>
      </m.div>
    </m.div>
  )
}

// Обёртка «режущейся» карточки: держит позицию/размер, сверху трос с зоной
// реза (виден в режиме-ножа), внутри — падающий слой поверх параллакса.
function Cuttable({
  anchor,
  active,
  fallen,
  onCut,
  dir,
  children,
}: {
  anchor: string
  active: boolean
  fallen: boolean
  onCut: () => void
  dir: number
  children: ReactNode
}) {
  return (
    <div className={`absolute ${anchor}`}>
      {active && !fallen && (
        <div className="absolute bottom-full left-1/2 z-30 flex -translate-x-1/2 flex-col items-center">
          {/* Тонкий трос, уходящий вверх (появляется из-за верхнего края) */}
          <div className="relative h-[440px] w-[1.5px] bg-gradient-to-b from-transparent via-amber-200/45 to-amber-300/80">
            {/* широкая невидимая зона реза по всей длине троса */}
            <div
              onPointerEnter={onCut}
              onMouseEnter={onCut}
              className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2"
            />
          </div>
          {/* карабин в точке крепления к карточке */}
          <div className="h-3 w-2.5 rounded-[3px] border-[1.5px] border-amber-300/80" />
        </div>
      )}
      <m.div
        className="absolute inset-0"
        animate={
          fallen
            ? { y: '125vh', rotate: dir * 30, opacity: [1, 1, 0.85] }
            : { y: 0, rotate: 0, opacity: 1 }
        }
        transition={
          fallen
            ? { duration: 1.2, ease: [0.4, 0, 1, 1] }
            : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {children}
      </m.div>
    </div>
  )
}

// Счётчик «травм»: ∅ пока никто не упал, иначе число с pop-анимацией на каждый
// инкремент (key меняется → перемонтирование → эффект проигрывается заново).
function InjuriesStat() {
  const [n, setN] = useState(getSecret().fallen.length)
  useEffect(() => subscribeSecret(s => setN(s.fallen.length)), [])

  return (
    <div>
      <m.div
        key={n}
        initial={n > 0 ? { scale: 0.3, opacity: 0, rotate: -12 } : false}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 14 }}
        className={`font-display text-4xl tracking-tight sm:text-5xl ${n > 0 ? 'text-red-500 drop-shadow-[0_0_18px_rgba(239,68,68,0.5)]' : 'text-flame-400'}`}
      >
        {n === 0 ? '∅' : n}
      </m.div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-steel-400">травм</div>
    </div>
  )
}

function Stat({
  value,
  suffix,
  label,
  raw,
}: {
  value: number
  suffix?: string
  label: string
  raw?: string
}) {
  return (
    <div>
      <div className="font-display text-4xl tracking-tight text-flame-400 sm:text-5xl">
        {raw ? raw : <AnimatedNumber value={value} suffix={suffix} />}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-steel-400">{label}</div>
    </div>
  )
}
