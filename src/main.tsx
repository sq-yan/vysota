import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
// Self-hosted шрифты (вариативные, cyrillic+latin через unicode-range) —
// без запросов к Google Fonts: быстрее на мобильных и не зависит от
// доступности Google из РФ.
import '@fontsource-variable/oswald/index.css'
import '@fontsource-variable/inter/index.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* strict: все компоненты используют <m.*>, полный <motion.*> в бандл не попадает */}
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </StrictMode>,
)
