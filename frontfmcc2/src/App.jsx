import { useState } from "react";
import './App.css';
import Equation from './components/resultado/Equation';

function App() {
  const [ladoEsquerdo, setLadoEsquerdo] = useState(0);
  const [ladoDireito, setLadoDireito] = useState(0);
  const [modulo, setModulo] = useState(0);
  const [equations, setEquations] = useState([]);

  // Variáveis para controle da resposta e do estado de carregamento
  const [resposta, setResposta] = useState(null); // Começa como null (sem resposta)
  const [carregando, setCarregando] = useState(false); // Inicialmente, não está carregando

  const addEquation = () => {
    const newEquation = {
      ladoEsquerdo: ladoEsquerdo,
      ladoDireito: ladoDireito,
      modulo: modulo,
    };
    setEquations([...equations, newEquation]);
  };

  const resolveTeorema = async () => {

    const equacao = {
        ladosDireitos:
        }
    setCarregando(true); // Ativa o estado de carregamento quando a requisição começa

    try {
      // Envia os dados para o backend
      const res = await fetch("http://localhost:8080/test?ladoEsquerdo=" + ladosEsquerdos + "&ladoDireito=" + ladosDireitos + "&mod=" + mods);
      const texto = await res.text(); // Recebe a resposta como string
      setResposta(texto); // Armazena a resposta recebida
    } catch (erro) {
      console.error("Erro ao buscar a resposta:", erro);
      setResposta("Erro ao buscar"); // Em caso de erro, mostra uma mensagem de erro
    } finally {
      setCarregando(false); // Desativa o estado de carregamento após a requisição
    }
  };

  return (
    <>
      <h1 className="titulo">Sistema do Teorema Chinês do Resto</h1>
      <Equation />
      {equations.map((equation, index) => (
        <Equation
          key={index}
          ladoEsquerdo={equation.ladoEsquerdo}
          ladoDireito={equation.ladoDireito}
          modulo={equation.modulo}
        />
      ))}
      <button type="button" className='buttonEquation' onClick={addEquation}>
        Adicionar Equação
      </button>
      <button type="button" onClick={resolveTeorema}>Enviar</button>

      {/* Só mostra o estado de carregamento ou a resposta quando o botão "Enviar" for clicado */}
      <h2>Resposta do servidor:</h2>
      {carregando ? <p>Carregando o TCR...</p> : resposta && <p>{resposta}</p>}
    </>
  );
}

export default App;