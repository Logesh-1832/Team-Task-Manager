import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Project from './pages/project/project'
import Task from './pages/task/task.tsx'
import Sidebar from './pages/Modules/Components/sidebar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
