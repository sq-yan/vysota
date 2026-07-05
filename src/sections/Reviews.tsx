import { m } from 'framer-motion'
import { Star, Quote, ArrowUpRight, MessageCircle } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { REVIEWS } from '../data/reviews'
import { TELEGRAM_URL } from '../data/site'

export function Reviews() {
  const avg =
    REVIEWS.length > 0
      ? (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)
      : null

  return (
    <section id="reviews" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            kicker="Отзывы"
            title="Что говорят клиенты"
            subtitle="Живые отзывы с реальных объектов. Оставить свой можно через Telegram — публикуем после проверки."
          />
          {avg && (
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">
              <div className="font-display text-4xl leading-none text-flame-400">{avg}</div>
              <div className="leading-tight">
                <Stars value={5} className="mb-1" />
                <div className="text-xs text-steel-400">{REVIEWS.length} отзыва</div>
              </div>
            </div>
          )}
        </div>

        {REVIEWS.length > 0 ? (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <m.article
                key={r.name + i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-flame-500/30"
              >
                <Quote className="h-7 w-7 text-flame-500/40" />
                <Stars value={r.rating} className="mt-4" />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-steel-200">{r.text}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <div className="font-medium text-white">{r.name}</div>
                    {r.role && <div className="text-xs text-steel-400">{r.role}</div>}
                  </div>
                  <div className="text-xs text-steel-500">{r.date}</div>
                </div>
              </m.article>
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
            <p className="text-lg text-steel-300">Отзывов пока нет — станьте первым.</p>
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-white/8 bg-gradient-to-br from-flame-500/10 to-transparent p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="font-display text-2xl tracking-tight text-white">Работали с нами?</div>
            <p className="mt-1 text-sm text-steel-300">
              Оставьте отзыв в Telegram — это помогает другим выбрать проверенную бригаду.
            </p>
          </div>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-flame-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-flame-400"
          >
            <MessageCircle className="h-4 w-4" />
            Оставить отзыв
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Stars({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < value ? 'fill-flame-400 text-flame-400' : 'text-steel-600'}`}
        />
      ))}
    </div>
  )
}
