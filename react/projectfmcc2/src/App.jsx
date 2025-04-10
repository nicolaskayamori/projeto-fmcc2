import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Sistema do Teorema Chinês do Resto</h1>
    <div className='inputs'>
      <input type="text" placeholder="3x" inputMode="numeric" />
      <p>≡</p>
      <input type="text" placeholder="5" inputMode="numeric" />
      <p>(mod</p>
      <input type="text" placeholder="10" inputMode="numeric" />
      <p>)</p>
    </div>
  </>
  )
}

export default App
