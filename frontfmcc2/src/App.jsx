import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [ladoEsquerdo, setLadoEsquerdo] = useState(0);
  const [ladoDireito, setLadoDireito] = useState(0);
  const [modulo, setModulo] = useState(0);

  return (
    <>
    <h1 className='titulo'>Sistema do Teorema Chinês do Resto</h1>
    <div className='inputs'>
      <form className='inputs'>
        <input onBlur={(e) => setLadoEsquerdo(e.target.value)} type="text" placeholder="3x" inputMode="numeric" required />
        <p>≡</p>
        <input onBlur={(e) => setLadoDireito(e.target.value)} type="text" placeholder="5" inputMode="numeric" required />
        <p>(mod</p>
        <input onBlur={(e) => setModulo(e.target.value)} type="text" placeholder="10" inputMode="numeric" />
        <p>)</p>
        <button type='submit' className='buttonSubmit'>
          Enviar
        </button>
      </form>
    </div>
  </>
  )
}

export default App
