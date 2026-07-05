import { m } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  highlight?: { word: string; render: (w: string) => ReactNode }
}

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as = 'h1',
  highlight,
}: Props) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
  const item = {
    hidden: { y: '110%', opacity: 0, filter: 'blur(6px)' },
    visible: {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const Wrapper = m[as] as ElementType
  return (
    <Wrapper variants={container} initial="hidden" animate="visible" className={className}>
      {words.map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]">
          <m.span variants={item} className="inline-block">
            {highlight && highlight.word === w ? highlight.render(w) : w}
          </m.span>
        </span>
      ))}
    </Wrapper>
  )
}
