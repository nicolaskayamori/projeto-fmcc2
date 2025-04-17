import { useState } from 'react';
import Equation from './components/resultado/Equation';
import { FaExclamationTriangle } from 'react-icons/fa';

function App() {
  const [equations, setEquations] = useState([{ left: '', right: 0, mod: 0 }]); 
  const [resultado, setResultado] = useState(null);
  const [passos, setPassos] = useState('');
  const [mostraPopup, setMostraPopup] = useState(false);

  // Função para adicionar uma nova equação
  const addEquation = () => {
    setEquations([...equations, { left: '', right: 0, mod: 0 }]);
    
  };

  const removeEquation = () => {
    if (equations.length > 1) {
      setEquations(equations.slice(0, -1));
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

    const calcularM = (equacoes) => {
      return equacoes.reduce((acc, eq) => acc * eq.mod, 1);
    };
    
    const mdc = (a, b) => {
      let currentA = a;
      let currentB = b;
      while (currentB !== 0) {
        const tempA = currentB;
        const tempB = currentA % currentB;
        currentA = tempA;
        currentB = tempB;
      }
      return currentA;
    };
    
    const euclidesExtendido = (a, b) => {
      if (b === 0) return [a, 1, 0];
      const [mdc, x1, y1] = euclidesExtendido(b, a % b);
      return [mdc, y1, x1 - Math.floor(a / b) * y1];
    };
    
    const calcularInversoMultiplicativo = (a, mod) => {
      if (mod === 0 || mod ===1) throw new Error("Módulo deve ser diferente de zero ou um.");
      if (mdc(a, mod) !== 1) throw new Error("Inverso não existe, pois não são coprimos.");
      
      const [_, x] = euclidesExtendido(a, mod);
      return ((x % mod) + mod) % mod;
    };
    
    // Função principal adaptada para seu useState
    const calcularTCR = (equacoes) => {
      // Verifica se equacoes é um array, se não, converte
      const eqArray = Array.isArray(equacoes) ? equacoes : [equacoes];
      
      // Filtra equações válidas (com mod > 0 e right é número)
      const equacoesValidas = eqArray.filter(eq => 
        Number.isInteger(eq?.mod) &&  
        Number.isFinite(eq?.right)
      );
    
      if (equacoesValidas.length === 0) {
        return {
          resultado: null,
          passos: "Nenhuma equação válida para calcular",
          equacoesUsadas: 0,
          equacoesInvalidas: eqArray.length
        };
      }
      try{
    
      let passos = "Passo 1: Calcular M (produto dos módulos co-primos)\n";
      const M = calcularM(equacoesValidas);
      passos += `M = ${M}\n\n`;
    
      passos += "Passo 2: Calcular para cada equação:\n";
      const calculos = equacoesValidas.map((eq, i) => {
        const m_i = M / eq.mod;
        const inv = calcularInversoMultiplicativo(m_i, eq.mod);
        
        passos += `- Equação ${i+1}: ${eq.left || 'x'} ≡ ${eq.right} mod ${eq.mod}\n`;
        passos += `  m_${i+1} = ${M}/${eq.mod} = ${m_i}\n`;
        passos += `  Inverso de ${m_i} mod ${eq.mod} = ${inv || 'não existe'}\n\n`;
    
        return inv ? inv * eq.right * m_i : 0;
      });
    
      passos += "Passo 3: Somar todos os termos e aplicar mod M\n";
      const soma = calculos.reduce((acc, val) => acc + val, 0);
      const resultado = ((soma % M) + M) % M;
    
      passos += `Soma: ${calculos.join(' + ')} = ${soma}\n`;
      passos += `Resultado final: x ≡ ${resultado} mod ${M}`;
    
      return {
        resultado,
        passos,
        equacoesUsadas: equacoesValidas.length,
        equacoesInvalidas: eqArray.length - equacoesValidas.length
      };
    }catch (error) {
      return {
        resultado: null,
        passos: `Erro: ${error.message}`,
        equacoesUsadas: 0,
        equacoesInvalidas: eqArray.length
      };
    // biome-ignore lint/correctness/noUnreachable: <explanation>
    };
    }


  const handleCalculate = () => {
    const { resultado, passos } = calcularTCR(equations);
    setResultado(resultado);
    setPassos(passos);
    
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
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
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
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          index={index}  // Passa o índice
          data={equation}  // Passa os dados da equação
          updateEquation={updateEquation}  // Passa a função de atualização
        />
      ))}
      
      <div className="botoes">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className="buttonEquation" onClick={addEquation}>
          Adicionar Equação
        </button>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className='buttonSubmit' onClick={handleCalculate}>Enviar</button>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className='buttonRemove' onClick={removeEquation}>Remover Equação</button>
      </div>

      <div className="resposta">
        <h2>Resposta:</h2>
        <div>
        <h3>{resultado}</h3>
        <pre className='passos'>{passos}</pre>
        </div>
      </div>
      {mostraPopup && <Popup />}
    </>
  );
}

export default App;