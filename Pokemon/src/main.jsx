import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PokemonCard from './PokemonCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokemonCard />
  </StrictMode>,
)
