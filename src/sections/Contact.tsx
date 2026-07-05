import { m, useInView } from 'framer-motion'
import { Phone, Send } from 'lucide-react'
import { useRef } from 'react'
import { MagneticButton } from '../components/MagneticButton'
import { PHONE_DISPLAY, PHONE_TEL, TELEGRAM_URL } from '../data/site'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  // «Маячок» крутится только пока блок на экране
  const inView = useInView(ref)

  return (
    <section id="contact" ref={ref} className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <m.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-flame-500/20 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 sm:p-16"
        >
          <m.div
            aria-hidden
            animate={inView ? { rotate: 360 } : undefined}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-1/2"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(249,115,22,0.5) 30deg, transparent 60deg, transparent 360deg)',
              opacity: 0.25,
            }}
          />
          <div className="absolute inset-[1px] rounded-[34px] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950" />
          <div
            aria-hidden
            className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-flame-500/25 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-amber-500/15 blur-[140px]"
          />

          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-flame-400">
              Связаться
            </div>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight">
              Расскажите
              <br />
              <span className="bg-gradient-to-r from-flame-300 via-flame-500 to-amber-400 bg-clip-text text-transparent">
                о задаче
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-steel-300">
              Выезд и расчёт бесплатно. Перезвоним в течение часа по будням. Работаем по всей Москве и Подмосковью.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton
                href={PHONE_TEL}
                className="group inline-flex items-center gap-3 rounded-full bg-flame-500 px-7 py-4 text-base font-semibold text-black shadow-glow-flame transition hover:bg-flame-400"
              >
                <Phone className="h-5 w-5" />
                {PHONE_DISPLAY}
              </MagneticButton>
              <MagneticButton
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                strength={14}
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-base font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/[0.08]"
              >
                <Send className="h-5 w-5" />
                Telegram
              </MagneticButton>
            </div>

            <div className="mt-10 text-sm text-steel-400">
              Работаем по будням 9:00–20:00, в выходные — по согласованию.
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
