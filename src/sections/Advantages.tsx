import { motion } from 'framer-motion'
import { Award, Clock, ShieldCheck, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

type Adv = { icon: LucideIcon; title: string; text: string }

const ADVANTAGES: Adv[] = [
  {
    icon: ShieldCheck,
    title: 'Допуски и страховка',
    text: 'Все работы выполняются по нарядам с допуском к высоте. Страховой полис гражданской ответственности до 5 000 000 ₽.',
  },
  {
    icon: Award,
    title: 'Опыт 7+ лет',
    text: 'Сотни выполненных объектов — жилые дома, торговые и бизнес-центры, промышленные здания.',
  },
  {
    icon: Clock,
    title: 'Сроки и темп',
    text: 'Шов — 4 м/п в день на одного исполнителя. Срочные выезды на следующий день.',
  },
  {
    icon: Wrench,
    title: 'Своё оборудование',
    text: 'Снаряжение и материалы — наши. Не теряем время на согласования и закупки.',
  },
]

export function Advantages() {
  return (
    <section id="advantages" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Почему мы"
          title="Спокойно за результат"
          subtitle="Высота — это не просто работа. Это ответственность, на которой мы не экономим."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {ADVANTAGES.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex items-start gap-5 overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-flame-500/30"
            >
              <div
                aria-hidden
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-flame-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-flame-500/15 to-flame-700/5 ring-1 ring-flame-500/30">
                <a.icon className="h-7 w-7 text-flame-300" strokeWidth={1.7} />
              </div>
              <div className="relative">
                <h3 className="text-lg font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">{a.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
