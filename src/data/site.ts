// Единый источник фактов о бизнесе для React-части.
// ВНИМАНИЕ: index.html (title, OG-теги, JSON-LD) не может импортировать TS —
// при смене бренда/телефона обновлять index.html синхронно с этим файлом.
export const BRAND = 'Вертикальные Решения'
export const PHONE_DISPLAY = '+7 (916) 505-40-54'
export const PHONE_TEL = 'tel:+79165054054'
export const TELEGRAM_URL = 'https://t.me/dosick'
export const YOUTUBE_URL = 'https://youtube.com/@vertical_resh'

// Основатели (блок «Кто за этим стоит»)
// TODO: подгрузить реальные фото основателей, когда отфоткаются (заменят инициалы)
export const FOUNDERS = [
  { name: 'Налдеев Денис Викторович', role: 'Основатель · производство и контроль работ' },
  { name: 'Налдеев Олег Денисович', role: 'Сооснователь · продукт и цифровые сервисы' },
] as const
