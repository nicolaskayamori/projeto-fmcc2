import React from 'react';

const Equation = ({ index, data, updateEquation }) => {
  const handleChange = (field, value) => {
    const updated = { ...data, [field]: field === 'left' ? value : Number(value) };
    updateEquation(index, updated);  // Chama a função de atualização passada como prop
  };

  return (
    <div className="inputs">
      <input
        type="text"
        placeholder="3x"
        value={data.left}
        onChange={(e) => handleChange('left', e.target.value)}  // Atualiza o valor
      />
      <p>≡</p>
      <input
        type="number"
        placeholder="5"
        value={data.right}
        onChange={(e) => handleChange('right', e.target.value)}  // Atualiza o valor
      />
      <p>(mod</p>
      <input
        type="number"
        placeholder="10"
        value={data.mod}
        onChange={(e) => handleChange('mod', e.target.value)}  // Atualiza o valor
      />
      <p>)</p>
    </div>
  );
};

export default Equation;