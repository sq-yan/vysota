import type { ReactNode } from 'react'

type Props = { items: ReactNode[]; className?: string }

export function Marquee({ items, className }: Props) {
  const doubled = [...items, ...items]
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent"
        aria-hidden
      />
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-6">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
