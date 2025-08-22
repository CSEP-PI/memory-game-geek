import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import { Login } from './pages/Login'
import { Lobby } from './pages/Lobby'
import { Game } from './pages/Game'
import { Ranking } from './pages/Ranking'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/lobby' element={<Lobby/>}/>
        <Route path='/game/:animeId/:dificuldade' element={<Game/>}/>
        <Route path='/ranking' element={<Ranking/>}/>
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
