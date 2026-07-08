import { lazy, Suspense } from 'react'
import { Cursor } from './components/Cursor'
import { PromoBar } from './components/PromoBar'
import { ScrollProgress } from './components/ScrollProgress'
import { SecretHud } from './components/SecretHud'
import { useLenis } from './hooks/useLenis'
import { Advantages } from './sections/Advantages'
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
      <Cursor />
      <SecretHud />
      <PromoBar />
      <Header />
      <main className="relative">
        <Hero />
        <TrustStrip />
        <MarqueeStrip />
        <Services />
        <Advantages />
        <Cases />
        <Gallery />
        <Suspense fallback={<section className="min-h-[480px]" />}>
          <Content />
        </Suspense>
        <Process />
        <SpecialOffer />
        <Reviews />
        <AppPromo />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
