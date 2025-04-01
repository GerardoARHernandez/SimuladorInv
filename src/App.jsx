import React, { useState } from 'react';
import InvestmentForm from './components/InvestmentForm';
import InvestmentResults from './components/InvestmentResults';
import CapitalChart from './components/CapitalChart';
import Resultado from './components/Headers/Resultado';
import Navbar from './components/Headers/NavBar';

// App.js
function App() {
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleCalculate = (resultsCalculados, formData) => {
    setResults(resultsCalculados);
    setFormData(formData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6">      
        <div className="max-w-5xl mx-auto p-2 rounded-3x ">
          <InvestmentForm onCalculate={handleCalculate} />
        </div>
        {results && <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg'> 
        <Resultado />
          {results && <InvestmentResults results={results} formData={formData} />}
          {results && formData && <CapitalChart results={results} formData={formData} />}
        </div>}
      </div>
    </>
  );
}

export default App;