// Единый источник фактов о бизнесе для React-части.
// ВНИМАНИЕ: index.html (title, OG-теги, JSON-LD) не может импортировать TS —
// при смене бренда/телефона обновлять index.html синхронно с этим файлом.
// Номер счётчика Яндекс.Метрики. 0 — счётчик не подключён, кода на странице нет.
//
// Как получить: metrika.yandex.ru → «Добавить счётчик» → сайт vysota-vr.ru,
// включить вебвизор → скопировать номер (8 цифр) и вписать сюда.
// Цели («Скачать», «Веб-версия», «Звонок», «Телеграм», «Заявка») отправляются
// из кода — в Метрике их надо создать как цели типа «JavaScript-событие»
// с идентификаторами: download_apk, open_web_app, call, telegram, lead_form.
export const METRIKA_ID = 0

export const BRAND = 'Вертикальные Решения'
export const PHONE_DISPLAY = '+7 (916) 505-40-54'
export const PHONE_TEL = 'tel:+79165054054'
export const TELEGRAM_URL = 'https://t.me/dosick'
export const YOUTUBE_URL = 'https://youtube.com/@vertical_resh'

// Основатели (блок «Кто за этим стоит»)
export const FOUNDERS = [
  {
    name: 'Налдеев Денис Викторович',
    role: 'Основатель · производство и контроль работ',
    photo: '/founder-denis.jpg',
  },
] as const
