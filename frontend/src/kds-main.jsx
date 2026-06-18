import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KdsApp from './components/KdsApp'

createRoot(document.getElementById('kds-root')).render(
  <StrictMode>
    <KdsApp />
  </StrictMode>,
)
