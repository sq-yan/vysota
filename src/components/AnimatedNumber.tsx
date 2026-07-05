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
  // margin 0: считалка стартует, как только цифра попала в кадр. Было -15% —
  // статы Hero стоят у низа первого экрана, в срез не попадали и висели на нуле
  // до скролла. Небольшой положительный низ (10%) — запуск чуть заранее.
  const inView = useInView(ref, { once: true, margin: '0px 0px 10% 0px' })
  const v = useCountUp(value, 1800, inView)
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  )
}
