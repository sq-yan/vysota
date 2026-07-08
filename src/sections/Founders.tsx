import { m } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { FOUNDERS } from '../data/site'

function initials(name: string): string {
  const [last, first] = name.split(' ')
  return `${(first ?? '')[0] ?? ''}${(last ?? '')[0] ?? ''}`
}

// Кто за этим стоит: семейное дело, отвечаем именами.
export function Founders() {
  return (
    <section id="founders" className="relative px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Кто за этим стоит"
          title="Основатели"
          subtitle="Семейное дело: работы ведём сами и отвечаем за результат своими именами."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <m.div
              key={f.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-flame-500/10 font-display text-2xl text-flame-300">
                {initials(f.name)}
              </div>
              <div>
                <div className="font-display text-xl leading-tight">{f.name}</div>
                <div className="mt-1 text-sm text-steel-400">{f.role}</div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
