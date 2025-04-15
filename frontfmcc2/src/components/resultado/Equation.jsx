import React from 'react';
import { useState } from 'react'

const Equation = () => {
    const [ladoEsquerdo, setLadoEsquerdo] = useState(0);
    const [ladoDireito, setLadoDireito] = useState(0);
    const [modulo, setModulo] = useState(0);
    return (
        <div className='inputs'>
      <form className='inputs'>
        <input onBlur={(e) => setLadoEsquerdo(e.target.value)} type="text" placeholder="3x" inputMode="numeric" required />
        <p>≡</p>
        <input onBlur={(e) => setLadoDireito(e.target.value)} type="text" placeholder="5" inputMode="numeric" required />
        <p>(mod</p>
        <input onBlur={(e) => setModulo(e.target.value)} type="text" placeholder="10" inputMode="numeric" />
        <p>)</p>
      </form>
    </div>
    );
};

export default Equation;