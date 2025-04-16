import { useState } from 'react';
import Equation from './components/resultado/Equation';

function App() {
  const [equations, setEquations] = useState([]);
  const [serverResponse, setServerResponse] = useState('');

  // Função para adicionar uma nova equação
  const addEquation = () => {
    setEquations([...equations, { left: '', right: 0, mod: 0 }]);
    setServerResponse('');
  };

  // Função para atualizar uma equação específica com base no índice
  const updateEquation = (index, updatedData) => {
    const updatedEquations = [...equations];
    updatedEquations[index] = updatedData;
    setEquations(updatedEquations);
  };

  // Função para enviar as equações
  const resolveTeorema = async () => {
    const jsonEquations = JSON.stringify(equations);

    try {
        const response = await fetch('http://localhost:8080/equacoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define que o corpo da requisição está em JSON
            },
            body: jsonEquations, // Passa o corpo da requisição (json)
        });

        const data = await response.text(); // Pega a resposta do servidor
        setServerResponse(data);

      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
  };

  return (
    <>
      <h1 className="titulo">Sistema do Teorema Chinês do Resto</h1>

      {/* Mapeia as equações e renderiza um campo de input para cada uma */}
      {equations.map((equation, index) => (
        <Equation
          key={index}
          index={index}  // Passa o índice
          data={equation}  // Passa os dados da equação
          updateEquation={updateEquation}  // Passa a função de atualização
        />
      ))}

      <div className="botoes">
        <button className="buttonEquation" onClick={addEquation}>
          Adicionar Equação
        </button>
        <button onClick={resolveTeorema}>Enviar</button>
      </div>

      <div className="resposta">
        <h2>Resposta do servidor:</h2>
        <div>
            {serverResponse.split('\n').map((linha, index) => (
              <p key={index}>{linha}</p>
            ))}
          </div>
      </div>
    </>
  );
}

export default App;