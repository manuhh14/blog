import { useState } from 'react'
import { Rutas } from './rutas/Rutas'
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='layout'>
    
      <Rutas/>
    </div>
  )
}

export default App
