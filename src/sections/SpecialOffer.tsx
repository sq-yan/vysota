import { m } from 'framer-motion'
import { BadgePercent, ArrowRight } from 'lucide-react'

// Рекламный блок-баннер. ТЕКСТ-ПЛЕЙСХОЛДЕР: акция синхронизирована с PromoBar —
// финальную формулировку даёт Денис Викторович, поменять тут и в PromoBar разом.
export function SpecialOffer() {
  return (
    <section id="offer" className="relative px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-flame-500/25 bg-gradient-to-r from-flame-600/15 via-ink-800 to-ink-900 p-8 sm:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-flame-500/15 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-flame-500/15">
                <BadgePercent className="h-6 w-6 text-flame-400" />
              </div>
              <div>
                <div className="font-display text-2xl leading-tight sm:text-3xl">
                  Скидка 10% на первый заказ
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-300 sm:text-base">
                  Оставьте заявку до конца месяца — зафиксируем цену со скидкой на любые
                  высотные работы. Расчёт бесплатный.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-flame-500 px-6 py-3.5 text-base font-semibold text-black transition hover:bg-flame-400"
            >
              Получить расчёт
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </m.div>
      </div>
    </section>
  )
}
