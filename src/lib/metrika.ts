// Счётчик посещаемости сайта — Яндекс.Метрика.
//
// Почему не Google Analytics: данные ушли бы в США, а это трансграничная
// передача персональных данных — отдельное уведомление регулятору и лишний
// раздел в политике. Мы этот путь уже проходим с пуш-уведомлениями и повторять
// не хотим. Метрика российская, данные остаются в России.
//
// Счётчик не подключён, пока не задан номер: пустой ID = никакого кода на
// странице вообще, а не «тихо ничего не считает».

import { METRIKA_ID } from '../data/site'

/** Цели: что именно человек сделал. Названия видны в интерфейсе Метрики. */
export type Goal =
  | 'download_apk' // нажал «Скачать для Android»
  | 'open_web_app' // нажал «Открыть веб-версию»
  | 'call' // нажал на телефон
  | 'telegram' // ушёл в телеграм
  | 'lead_form' // отправил заявку

type Ym = (id: number, action: string, ...args: unknown[]) => void

declare global {
  interface Window {
    ym?: Ym & { a?: unknown[]; l?: number }
  }
}

export function initMetrika(): void {
  if (!METRIKA_ID || typeof window === 'undefined') return
  if (window.ym) return // уже подключён (например, после hot-reload)

  // Стандартная вставка Метрики, переписанная руками: официальный сниппет —
  // это минифицированный кусок, который нечитаем и который стыдно держать в
  // репозитории без объяснения.
  const ym: Window['ym'] = function (...args: unknown[]) {
    ;(window.ym!.a = window.ym!.a || []).push(args)
  } as Ym
  ym.l = Date.now()
  window.ym = ym

  const s = document.createElement('script')
  s.async = true
  s.src = 'https://mc.yandex.ru/metrika/tag.js'
  document.head.appendChild(s)

  window.ym(METRIKA_ID, 'init', {
    // куда человек кликает — нужно, чтобы понять, доходят ли до «Скачать»
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    // запись сессий: для отца это буквально видео, как клиент ползает по сайту
    webvisor: true,
  })
}

/** Отметить цель. Молчит, если счётчик не подключён. */
export function goal(name: Goal): void {
  if (!METRIKA_ID) return
  window.ym?.(METRIKA_ID, 'reachGoal', name)
}
