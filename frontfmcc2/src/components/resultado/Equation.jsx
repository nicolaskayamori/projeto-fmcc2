import React from 'react';

const Equation = ({ index, data, updateEquation }) => {
  // Validação para o campo left (formato como "7x", "-12x", etc.)
  const handleLeftChange = (e) => {
    const value = e.target.value;
    // Permite: números inteiros (positivos ou negativos) seguidos de 'x'
    if (/^-?\d*x?$/.test(value)) {
      const updated = { ...data, left: value };
      updateEquation(index, updated);
    }
  };

  // Validação para números inteiros (right)
  const handleRightChange = (e) => {
    const value = e.target.value;
    // Permite apenas inteiros (positivos ou negativos)
    if (/^-?\d*$/.test(value)) {
      const updated = { ...data, right: value === '' ? '' : Number(value) };
      updateEquation(index, updated);
    }
  };

  // Validação para módulo (números positivos)
  const handleModChange = (e) => {
    const value = e.target.value;
    // Permite apenas números positivos (sem sinal)
    if (/^\d*$/.test(value)) {
      const updated = { ...data, mod: value === '' ? '' : Number(value) };
      updateEquation(index, updated);
    }
  };

  // Garante que o campo left sempre termine com 'x'
  const handleLeftBlur = () => {
    if (data.left && !data.left.endsWith('x')) {
      const updated = { ...data, left: data.left + 'x' };
      updateEquation(index, updated);
    }
  };

  return (
    <div className="inputs">
      <input
        type="text"
        placeholder="3x"
        value={data.left}
        onChange={handleLeftChange}
        onBlur={handleLeftBlur}
      />
      <p>≡</p>
      <input
        type="text"
        placeholder="5"
        value={data.right}
        onChange={handleRightChange}
      />
      <p>(mod</p>
      <input
        type="text"
        placeholder="10"
        value={data.mod}
        onChange={handleModChange}
      />
      <p>)</p>
    </div>
  );
};

export default Equation;