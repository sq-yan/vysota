import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../hooks/useCountUp'

type Props = {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function AnimatedNumber({ value, suffix = '', prefix = '', decimals = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const v = useCountUp(value, 1800, inView)
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  )
}
