import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Project from './pages/project/project'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Project />
  </StrictMode>,
)
