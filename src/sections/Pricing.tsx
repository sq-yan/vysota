import { m } from 'framer-motion'
import { Check, FileText, Shield } from 'lucide-react'
import legal from '../data/legal.json'

// Тарифы БРИГАДИРа + реквизиты ИП. Секция обязательна для подключения
// эквайринга: ЮKassa проверяет сайт руками и требует видеть цену, оферту,
// политику конфиденциальности и реквизиты (ИНН + ОГРНИП) на живой странице.
export function Pricing() {
  return (
    <section id="tarify" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-flame-500/30 bg-flame-500/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-flame-300">
            <span className="h-1 w-1 rounded-full bg-flame-400" />
            Тарифы БРИГАДИРа
          </div>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.05] tracking-tight">
            Платит бригадир. Работягам — бесплатно
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
            Одна фиксированная цена за всю бригаду — не за каждого человека и не за
            каждый объект. Первые {legal.trialDays} дней — бесплатно, карта не нужна.
          </p>
        </m.div>

        {/* Тариф один — карточку не растягиваем на всю ширину, иначе она читается
            как пустая таблица; сетка вернётся сама, если тарифов станет больше */}
        <div
          className={`mt-12 grid gap-6 ${
            legal.plans.length > 1 ? 'md:grid-cols-2' : 'mx-auto max-w-xl'
          }`}
        >
          {legal.plans.map((plan, i) => (
            <m.div
              key={plan.code}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
            >
              <h3 className="font-display text-2xl tracking-tight">{plan.title}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl leading-none text-flame-400">
                  {plan.priceRub.toLocaleString('ru-RU')}
                </span>
                <span className="text-lg text-steel-300">₽ / мес</span>
              </div>
              <p className="mt-2 text-sm text-steel-400">{plan.note}</p>

              <ul className="mt-7 space-y-3">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-steel-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                    <span className="text-[15px] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={legal.app}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-flame-500 px-6 py-3.5 text-base font-semibold text-ink-950 shadow-glow-flame transition hover:bg-flame-400"
              >
                Попробовать бесплатно
              </a>
            </m.div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-steel-400">
          Оплата — банковской картой или через СБП, ежемесячно. Подписку можно отключить в
          любой момент: оплаченный период при этом досматривается до конца. Если платёж
          задержался, бригада продолжает работать ещё {legal.graceDays} дней — смены, фото и
          история объектов не блокируются никогда.
        </p>

        {/* Реквизиты — их ищет модерация платёжного провайдера и заказчики */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          id="rekvizity"
          className="mt-14 rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-9"
        >
          <h3 className="font-display text-xl tracking-tight">Реквизиты</h3>
          <dl className="mt-5 grid gap-x-10 gap-y-3 text-[15px] sm:grid-cols-2">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-steel-400">Исполнитель:</dt>
              <dd className="text-steel-200">{legal.entity}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-steel-400">ИНН:</dt>
              <dd className="text-steel-200">{legal.inn}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-steel-400">ОГРНИП:</dt>
              <dd className="text-steel-200">{legal.ogrnip}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-steel-400">Почта:</dt>
              <dd>
                <a
                  href={`mailto:${legal.email}`}
                  className="text-flame-300 underline underline-offset-2 transition hover:text-flame-200"
                >
                  {legal.email}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/oferta.html"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-steel-200 transition hover:border-flame-500/40 hover:text-white"
            >
              <FileText className="h-4 w-4 text-flame-400" />
              Публичная оферта
            </a>
            <a
              href="/politika.html"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-steel-200 transition hover:border-flame-500/40 hover:text-white"
            >
              <Shield className="h-4 w-4 text-flame-400" />
              Политика конфиденциальности
            </a>
          </div>
        </m.div>
      </div>
    </section>
  )
}
