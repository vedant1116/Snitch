import './App.css'
import Register from '../features/auth/pages/Register.jsx'
import { routes } from './app.routes'
import { RouterProvider } from 'react-router'
function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
     <RouterProvider router={routes}/>
    </div>
  )
}

export default App
