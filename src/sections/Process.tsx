import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './SectionHeader'

const STEPS = [
  {
    n: '01',
    title: 'Заявка',
    text: 'Позвоните или напишите в Telegram — опишите задачу. Поможем определить, что именно нужно.',
  },
  {
    n: '02',
    title: 'Осмотр и расчёт',
    text: 'Бесплатный выезд на объект, фото и точная смета без скрытых пунктов.',
  },
  {
    n: '03',
    title: 'Работы',
    text: 'Аккуратно, в оговорённые сроки, без ущерба отделке и соседям. Каждый день — фотоотчёт в мессенджер.',
  },
  {
    n: '04',
    title: 'Сдача',
    text: 'Принимаете лично или по видео. Подписываем КС-2, КС-3 или акт оказанных услуг — по вашей форме. Гарантия в договоре.',
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="process" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          kicker="Как работаем"
          title="Четыре шага до результата"
          subtitle="Без лишних согласований — от звонка до закрытого акта."
        />

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-7 top-0 bottom-0 hidden w-px bg-white/10 sm:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-7 top-0 hidden w-px origin-top bg-gradient-to-b from-flame-500 via-flame-400 to-amber-300 shadow-[0_0_12px_rgba(249,115,22,0.6)] sm:block"
          />

          <div className="space-y-12 sm:space-y-24">
            {STEPS.map((s, i) => (
              <Step key={s.n} step={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.3'],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1])
  const x = useTransform(scrollYProgress, [0, 1], [-20, 0])
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const dotGlow = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="relative grid grid-cols-[auto_1fr] items-start gap-6 sm:gap-10"
    >
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-flame-500/40 bg-ink-900/80 backdrop-blur-md sm:h-16 sm:w-16">
        <motion.div
          style={{ scale: dotScale, opacity: dotGlow }}
          className="absolute inset-0 rounded-full bg-flame-500/30 blur-xl"
        />
        <span className="relative font-display text-xl text-flame-400 sm:text-2xl">{step.n}</span>
      </div>
      <div className="pt-2">
        <div className="text-[11px] uppercase tracking-[0.25em] text-flame-400">
          Шаг {index + 1}
        </div>
        <h3 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">{step.title}</h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-steel-300">{step.text}</p>
      </div>
    </motion.div>
  )
}
