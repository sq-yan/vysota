import { m } from 'framer-motion'

const BRANDS = ['SIKA', 'TIKKURILA', 'KNAUF', 'CAPAROL', 'PENOSIL', 'РОГНЕДА']

export function TrustStrip() {
  return (
    <section className="relative border-y border-white/5 bg-ink-950/40 px-5 py-14 sm:px-8 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        <div className="text-center text-[11px] uppercase tracking-[0.3em] text-steel-400">
          Работаем с проверенными материалами
        </div>
        <div className="mt-7 grid grid-cols-3 items-center gap-x-6 gap-y-6 sm:grid-cols-6">
          {BRANDS.map((b, i) => (
            <m.div
              key={b}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center justify-center"
            >
              <span className="font-display text-2xl tracking-[0.18em] text-steel-300/70 transition-all duration-300 hover:text-flame-300 sm:text-3xl">
                {b}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
