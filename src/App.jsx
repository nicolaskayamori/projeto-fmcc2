import { useState } from 'react';
import './App.css';
import Equation from './components/resultado/Equation';

function App() {
  const [ladoEsquerdo, setLadoEsquerdo] = useState(0);
  const [ladoDireito, setLadoDireito] = useState(0);
  const [modulo, setModulo] = useState(0);
  const [equations, setEquations] = useState([]);

  const addEquation = () => {
    const newEquation = {
      ladoEsquerdo: ladoEsquerdo,
      ladoDireito: ladoDireito,
      modulo: modulo,
    };
    setEquations([...equations, newEquation]);
  };

  return (
    <>
      <h1 className="titulo">Sistema do Teorema Chinês do Resto</h1>
      <Equation/>
      {equations.map((equation, index) => (
        <Equation
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          ladoEsquerdo={equation.ladoEsquerdo}
          ladoDireito={equation.ladoDireito}
          modulo={equation.modulo}
        />
      ))}
      <button type="button" onClick={addEquation}>
        Add equation
      </button>
      <button type='button' onClick={resolveTeorema}>Enviar</button>
    </>
  );
}

export default App;