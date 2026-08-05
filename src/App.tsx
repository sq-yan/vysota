import { lazy, Suspense } from 'react'
import { CookieNote } from './components/CookieNote'
import { PromoBar } from './components/PromoBar'
import { ScrollProgress } from './components/ScrollProgress'
import { SecretHud } from './components/SecretHud'
import { useLenis } from './hooks/useLenis'
import { AppPromo } from './sections/AppPromo'
import { Cases } from './sections/Cases'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Founders } from './sections/Founders'
import { SpecialOffer } from './sections/SpecialOffer'
import { Gallery } from './sections/Gallery'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { MarqueeStrip } from './sections/MarqueeStrip'
import { Pricing } from './sections/Pricing'
import { Process } from './sections/Process'
import { Reviews } from './sections/Reviews'
import { Services } from './sections/Services'
import { TrustStrip } from './sections/TrustStrip'

// Секция с QR-кодом тянет qrcode.react — выносим в отдельный чанк,
// чтобы не грузить его в критический бандл (секция глубоко под сгибом)
const Content = lazy(() =>
  import('./sections/Content').then(mod => ({ default: mod.Content })),
)

export default function App() {
  useLenis()

  return (
    <div className="relative min-h-screen bg-ink-950 text-white">
      <ScrollProgress />
      <CookieNote />
      <SecretHud />
      <PromoBar />
      <Header />
      <main className="relative">
        <Hero />
        <TrustStrip />
        <MarqueeStrip />
        <Services />
        {/* Здесь стоял блок «Почему мы» (Advantages) — снят 05.08.2026 по
            просьбе Дениса Викторовича. Место освобождено под калькулятор
            стоимости: клиент выбирает вид работ (межпанельный шов, вскрытие,
            силатерм и т.д.), вводит метраж и сразу видит сумму.
            Старый блок при необходимости достаётся из истории git. */}
        <Cases />
        <Gallery />
        <Suspense fallback={<section className="min-h-[480px]" />}>
          <Content />
        </Suspense>
        <Process />
        <SpecialOffer />
        <Reviews />
        <AppPromo />
        <Pricing />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
