import React, { useState } from 'react';
import InvestmentForm from './components/InvestmentForm';
import InvestmentResults from './components/InvestmentResults';
import CapitalChart from './components/CapitalChart';
import Resultado from './components/Headers/Resultado';
import Navbar from './components/Headers/NavBar';

function App() {
  const [results, setResults] = useState(null); // Inicializar como null

  const handleCalculate = (resultsCalculados) => {
    setResults(resultsCalculados);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6">      
        <div className="max-w-5xl mx-auto p-2 rounded-3x ">
          <InvestmentForm onCalculate={handleCalculate} setResults={setResults} /> {/* Pasar setResults */}
        </div>
        <Resultado />
        {results && <div className='max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg'> 
          {results && <InvestmentResults results={results} />} {/* Renderizar condicionalmente */}
          {results && <CapitalChart results={results} />}
        </div>}
      </div>
    </>
  );
}

export default App;