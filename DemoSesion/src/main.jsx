import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import useAuthLocalStorage from './SesionLocal/useAuthLocalStorage.jsx';
import AppLocalStorage from './SesionLocal/AppLocalStorage.jsx';  
import AppCookie from './cookieSesion/AppCookie.jsx';
import UseAuthCookie  from './cookieSesion/UseAuthCookie.jsx';
import AppCookieHttpOnly from './CookieHttpOnly/AppCookieHttpOnly.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppCookieHttpOnly />
  </StrictMode>,
)
