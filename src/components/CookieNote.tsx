import { useEffect, useState } from 'react'
import { METRIKA_ID } from '../data/site'

// Плашка про cookie и статистику посещений.
//
// Показывается только если счётчик реально подключён: нет счётчика — нет
// cookie, и предупреждать не о чем. Плашка ничего не блокирует и ничего не
// «спрашивает» — счётчик собирает обезличенную статистику, для которой согласие
// не требуется; наша задача — честно сообщить и дать ссылку на политику.

const KEY = 'vr_cookie_note_seen'

export function CookieNote() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!METRIKA_ID) return
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      // приватный режим без localStorage — плашку просто не показываем
    }
  }, [])

  if (!show) return null

  const hide = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      // не смогли запомнить — покажем ещё раз, не страшно
    }
    setShow(false)
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-[200] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-ink-950/95 p-4 backdrop-blur-md sm:inset-x-6 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p className="text-sm leading-relaxed text-steel-300">
          Сайт собирает обезличенную статистику посещений через Яндекс.Метрику и использует
          файлы cookie — так мы понимаем, какие разделы людям полезны. Подробности — в{' '}
          <a
            href="/politika.html"
            className="text-flame-300 underline underline-offset-2 transition hover:text-flame-200"
          >
            политике конфиденциальности
          </a>
          .
        </p>
        <button
          onClick={hide}
          className="shrink-0 rounded-full bg-flame-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-flame-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-400"
        >
          Понятно
        </button>
      </div>
    </div>
  )
}
