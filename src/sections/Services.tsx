import { m } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Droplets,
  HardHat,
  PaintRoller,
  Sparkles,
  Wind,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { TiltCard } from '../components/TiltCard'

type Service = { icon: LucideIcon; title: string; text: string }

const SERVICES: Service[] = [
  {
    icon: HardHat,
    title: 'Промышленный альпинизм',
    text: 'Высотные работы в Москве на жилых домах, БЦ и промышленных объектах — без лесов и автовышек. Любая сложность, любой этаж.',
  },
  {
    icon: Building2,
    title: 'Капремонт межпанельных швов',
    text: 'Демонтаж старого утеплителя, замена ППУ, наружная герметизация и финишное покрытие. Работаем с УК и ТСЖ по договору. Гарантия до 5 лет.',
  },
  {
    icon: Droplets,
    title: 'Герметизация',
    text: 'Швов, кровли, оконных и балконных примыканий. Подбираем герметик под основание и климат.',
  },
  {
    icon: Sparkles,
    title: 'Мойка окон и фасадов',
    text: 'Витражи, балконы, фасадное остекление высотных зданий, бизнес-центров и жилых комплексов. Без разводов и потёков, в любую погоду.',
  },
  {
    icon: Wind,
    title: 'Кондиционеры',
    text: 'Монтаж, демонтаж и обслуживание внешних блоков на любом этаже. Безопасно для отделки и соседей.',
  },
  {
    icon: PaintRoller,
    title: 'Малярные и штукатурные работы',
    text: 'Фасады, балконы, козырьки, подъезды — от подготовки основания до финишного покрытия.',
  },
]

export function Services() {
  return (
    <section id="services" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Услуги"
          title="Что мы умеем"
          subtitle="Полный цикл высотных работ — от заявки до акта приёмки."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <m.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-flame-500/40">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-flame-500/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-flame-500/10 ring-1 ring-flame-500/20">
                  <s.icon className="h-6 w-6 text-flame-400" strokeWidth={1.7} />
                  <div className="absolute inset-0 rounded-2xl bg-flame-500/0 transition-colors duration-300 group-hover:bg-flame-500/10" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-300">{s.text}</p>
                <div className="mt-7 inline-flex items-center gap-1.5 text-sm text-flame-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Узнать подробнее
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </TiltCard>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
