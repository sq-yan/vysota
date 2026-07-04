import { Cursor } from './components/Cursor'
import { PromoBar } from './components/PromoBar'
import { ScrollProgress } from './components/ScrollProgress'
import { SecretHud } from './components/SecretHud'
import { useLenis } from './hooks/useLenis'
import { Advantages } from './sections/Advantages'
import { Cases } from './sections/Cases'
import { Contact } from './sections/Contact'
import { Content } from './sections/Content'
import { Footer } from './sections/Footer'
import { Gallery } from './sections/Gallery'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { MarqueeStrip } from './sections/MarqueeStrip'
import { Process } from './sections/Process'
import { Reviews } from './sections/Reviews'
import { Services } from './sections/Services'
import { TrustStrip } from './sections/TrustStrip'

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
        <Content />
        <Process />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
