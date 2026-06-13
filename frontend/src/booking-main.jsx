import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookingApp from './components/BookingApp'

createRoot(document.getElementById('booking-root')).render(
  <StrictMode>
    <BookingApp />
  </StrictMode>,
)
