import { BRAND } from '../data/site'
import { BrandMark } from '../components/BrandMark'

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-steel-400 sm:flex-row">
        <div className="flex items-center gap-2">
          <BrandMark className="h-6 w-auto" />
          <span className="font-display text-lg uppercase tracking-wider text-white">{BRAND}</span>
        </div>
        <div>© {new Date().getFullYear()} · Промышленный альпинизм</div>
      </div>
    </footer>
  )
}
