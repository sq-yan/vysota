import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { useLenis } from './hooks/useLenis'
import { Advantages } from './sections/Advantages'
import { Cases } from './sections/Cases'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Gallery } from './sections/Gallery'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { MarqueeStrip } from './sections/MarqueeStrip'
import { Process } from './sections/Process'
import { Services } from './sections/Services'
import { TrustStrip } from './sections/TrustStrip'

export default function App() {
  useLenis()

  return (
    <div className="relative min-h-screen bg-ink-950 text-white">
      <ScrollProgress />
      <Cursor />
      <Header />
      <main className="relative">
        <Hero />
        <TrustStrip />
        <MarqueeStrip />
        <Services />
        <Advantages />
        <Cases />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
