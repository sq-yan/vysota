import { m } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { PlayCircle, ArrowUpRight, ScanLine } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { YOUTUBE_URL } from '../data/site'

export function Content() {
  return (
    <section id="content" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              kicker="Видео"
              title="Смотрите наш контент"
              subtitle="Снимаем реальные объекты: до и после, процесс работ на высоте, снаряжение и разбор нюансов. Наведите камеру телефона на QR-код или откройте канал."
            />
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-flame-500 px-6 py-3.5 text-base font-semibold text-black transition hover:bg-flame-400"
            >
              <PlayCircle className="h-5 w-5" />
              Открыть YouTube-канал
              <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <m.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-8"
          >
            <div className="rounded-2xl bg-white p-4 shadow-[0_20px_60px_-20px_rgba(249,115,22,0.4)]">
              <QRCodeSVG value={YOUTUBE_URL} size={190} bgColor="#ffffff" fgColor="#0b1220" level="M" marginSize={1} />
            </div>
            <div className="flex items-center gap-2 text-sm text-steel-300">
              <ScanLine className="h-4 w-4 text-flame-400" />
              Наведите камеру — откроется канал
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
