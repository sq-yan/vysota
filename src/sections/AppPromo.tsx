import { m } from 'framer-motion'
import { Smartphone, Download, MapPin, Camera, FileText, WifiOff } from 'lucide-react'
import cover from '../assets/brigadir-cover.jpg'

const FEATURES = [
  { icon: MapPin, text: 'Табель с геометкой — видно, кто на объекте' },
  { icon: Camera, text: 'Фотоотчёты с датой и местом — доверие заказчика' },
  { icon: FileText, text: 'Акты и табели в PDF за минуту' },
  { icon: WifiOff, text: 'Работает без связи — синхронизируется сам' },
]

// Промо нашего приложения БРИГАДИР — та же франшиза, тот же бренд.
export function AppPromo() {
  return (
    <section id="app" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-flame-500/30 bg-flame-500/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-flame-300">
                <span className="h-1 w-1 rounded-full bg-flame-400" />
                Наше приложение
              </div>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4.75rem)] leading-[0.95] tracking-tight">
                БРИГА
                <span className="shimmer-flame bg-clip-text text-transparent">ДИР</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-steel-300 sm:text-lg">
                Пульт управления объектом: мы делаем приложение, которым сами управляем
                бригадами. Смены, фото, акты — без блокнотов и чатов.
              </p>
            </m.div>

            <ul className="mt-8 space-y-3">
              {FEATURES.map(({ icon: Icon, text }, i) => (
                <m.li
                  key={text}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 text-steel-300"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-flame-400" />
                  <span className="text-base leading-relaxed">{text}</span>
                </m.li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                disabled
                aria-disabled="true"
                title="Станет доступно с официальным релизом"
                className="inline-flex cursor-not-allowed items-center gap-3 rounded-full bg-white/10 px-6 py-3.5 text-base font-semibold text-steel-400"
              >
                <Download className="h-5 w-5" />
                Скачать приложение
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border border-flame-500/30 bg-flame-500/5 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-flame-300">
                <Smartphone className="h-3.5 w-3.5" />
                скоро релиз
              </span>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel-400">
              Скачивание откроется на этой странице с официальным релизом. На закрытый
              бета-тест будут выделены несколько строительных компаний —{' '}
              <a
                href="#contact"
                className="text-flame-300 underline underline-offset-2 transition hover:text-flame-200"
              >
                оставьте заявку
              </a>
              , если хотите попасть в их число.
            </p>
          </div>

          <m.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[300px]"
          >
            <m.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 shadow-[0_30px_80px_-30px_rgba(249,115,22,0.45)]"
            >
              <img
                src={cover}
                alt="Экран приложения БРИГАДИР: пульт управления объектом"
                loading="lazy"
                className="w-full rounded-[1.6rem]"
              />
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
