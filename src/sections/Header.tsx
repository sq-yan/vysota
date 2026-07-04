import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BRAND } from '../data/site'
import { BrandMark } from '../components/BrandMark'

const LINKS = [
  { href: '#services', label: 'Услуги' },
  { href: '#advantages', label: 'Почему мы' },
  { href: '#cases', label: 'Объекты' },
  { href: '#process', label: 'Как работаем' },
  { href: '#contact', label: 'Контакты' },
]

export function Header() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(7,11,22,0)', 'rgba(7,11,22,0.7)'])
  const border = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)'])
  const blur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(14px)'])

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: border, backdropFilter: blur, WebkitBackdropFilter: blur }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2">
          <BrandMark className="h-7 w-7 text-white" />
          <span className="font-display text-lg uppercase tracking-wide sm:text-xl">{BRAND}</span>
        </a>
        <nav className="hidden gap-7 text-sm text-steel-300 lg:flex">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="relative transition-colors hover:text-white">
              <span>{l.label}</span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-flame-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full border border-flame-500/40 bg-flame-500/10 px-4 py-2 text-sm font-medium text-flame-200 backdrop-blur-md transition hover:bg-flame-500 hover:text-black"
        >
          Рассчитать
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.header>
  )
}
