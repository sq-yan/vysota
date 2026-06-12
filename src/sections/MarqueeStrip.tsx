import { Marquee } from '../components/Marquee'

const ITEMS = [
  'Герметизация швов',
  'Мойка фасадов',
  'Капремонт',
  'Монтаж кондиционеров',
  'Малярные работы',
  'Штукатурка',
  'Высотные окна',
  'Кровля',
  'Покраска',
  'Промальп',
]

export function MarqueeStrip() {
  const items = ITEMS.map((t, i) => (
    <span
      key={`${t}-${i}`}
      className="inline-flex items-center gap-6 font-display text-3xl tracking-wider text-steel-300/80 sm:text-4xl"
    >
      <span>{t}</span>
      <span className="text-flame-500/60">/</span>
    </span>
  ))
  return (
    <div className="relative border-y border-white/5 bg-white/[0.015] py-8 backdrop-blur-sm">
      <Marquee items={items} />
    </div>
  )
}
