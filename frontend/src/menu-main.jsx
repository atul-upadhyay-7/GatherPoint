import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MenuApp from './components/MenuApp'

createRoot(document.getElementById('menu-root')).render(
  <StrictMode>
    <MenuApp />
  </StrictMode>,
)
