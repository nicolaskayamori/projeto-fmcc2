import { useState } from 'react';
import Equation from './components/resultado/Equation';
import { FaExclamationTriangle } from 'react-icons/fa';

function App() {
  const [equations, setEquations] = useState([{ left: '', right: 0, mod: 0 }]);
  const [serverResponse, setServerResponse] = useState('');
  const [mostraPopup, setMostraPopup] = useState(false);

  // Função para adicionar uma nova equação
  const addEquation = () => {
    setEquations([...equations, { left: '', right: 0, mod: 0 }]);
    setServerResponse('');
  };

  const removeEquation = () => {
    if (equations.length > 1) {
      setEquations(equations.slice(0, -1));
      setServerResponse('');
    } else {
      setMostraPopup(true); // Mostra o popup
    }
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
        setServerResponse('Erro ao enviar requisição (o servidor nao esta ligado)', error);
      }
  };

  const Popup = () => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => setMostraPopup(false), 200); // Tempo igual à duração da animação
    };

    return (
      <div className={`popup-overlay ${isClosing ? 'closing' : ''}`}>
        <div className={`popup-content popup-animation ${isClosing ? 'closing' : ''}`}>
          <FaExclamationTriangle className="popup-icon" />
          <p>Você não pode remover a única equação restante!</p>
          <button onClick={handleClose}>Fechar</button>
        </div>
      </div>
    );
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
        <button className='buttonSubmit' onClick={resolveTeorema}>Enviar</button>
        <button className='buttonRemove' onClick={removeEquation}>Remover Equação</button>
      </div>

      <div className="resposta">
        <h2>Resposta do servidor:</h2>
        <div>
            {serverResponse.split('\n').map((linha, index) => (
              <p key={index}>{linha}</p>
            ))}
          </div>
      </div>
      {mostraPopup && <Popup />}
    </>
  );
}

export default App;