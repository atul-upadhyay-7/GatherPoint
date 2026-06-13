import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CustomerLoginApp from './components/CustomerLoginApp'

createRoot(document.getElementById('customer-login-root')).render(
  <StrictMode>
    <CustomerLoginApp />
  </StrictMode>,
)