import { m } from 'framer-motion'

type Props = {
  kicker: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ kicker, title, subtitle, align = 'left' }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-flame-500/30 bg-flame-500/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-flame-300">
        <span className="h-1 w-1 rounded-full bg-flame-400" />
        {kicker}
      </div>
      <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4.75rem)] leading-[0.95] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-steel-300 sm:text-lg">
          {subtitle}
        </p>
      )}
    </m.div>
  )
}
