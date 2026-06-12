import { Mountain } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-steel-400 sm:flex-row">
        <div className="flex items-center gap-2">
          <Mountain className="h-5 w-5 text-flame-500" strokeWidth={2.5} />
          <span className="font-display text-lg tracking-wider text-white">VYSOTA</span>
        </div>
        <div>© {new Date().getFullYear()} · Промышленный альпинизм</div>
      </div>
    </footer>
  )
}
