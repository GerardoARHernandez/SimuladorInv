

const InvestmentResults = ({ results }) => {
  return (
    <>
      <div className="mt-0 max-w-5xl bg-white p-6 pt-0 rounded-lg shadow-md w-full overflow-x-auto"> 
        <table className="min-w-full bg-white border-collapse table-auto"> 
          <thead>
            <tr className="bg-blue-900 text-white"> 
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase rounded-tl-lg">Periodo</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Año</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Edad</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Capital Inicial</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Aportación</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Saldo Acumulado</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Interés Mensual</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Interés Anual</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Interés Recapitalizado</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase">Interés Entregado</th>
              <th className="px-4 py-3 text-sm font-semibold text-center uppercase rounded-tr-lg">Capital Total</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-[#EBF5FB]' : 'bg-white'}> 
                <td className="px-4 py-3 text-sm text-center rounded-l-lg">{result.periodo}</td>
                <td className="px-4 py-3 text-sm text-center">{result.año}</td>
                <td className="px-4 py-3 text-sm text-center">{result.edad}</td>
                <td className="px-4 py-3 text-sm text-center">{result.capitalInicial}</td>
                <td className="px-4 py-3 text-sm text-center">{result.capitalAdicional}</td>
                <td className="px-4 py-3 text-sm text-center">{result.saldoAcumulado}</td>
                <td className="px-4 py-3 text-sm text-center">{result.interesGenerado}</td>
                <td className="px-4 py-3 text-sm text-center">{result.interesGenerado * 12}</td>
                <td className="px-4 py-3 text-sm text-center">{result.interesRecapitalizado}</td>
                <td className="px-4 py-3 text-sm text-center">{result.interesEntregado}</td>
                <td className="px-4 py-3 text-sm text-center rounded-r-lg">{result.capitalTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="mt-4 p-4 bg-[#F8F9FA] rounded"> 
          <p className="font-bold">Capital Total Invertido: ${results[results.length - 1].aportacionesTotales}</p>
          <p className="font-bold">Intereses Generados Totales: ${results[results.length - 1].interesesGeneradosAcumulados}</p>
          <p className="font-bold">Capital Total + Intereses: ${ (parseFloat(results[results.length - 1].aportacionesTotales) + parseFloat(results[results.length - 1].interesesGeneradosAcumulados)).toFixed(2)}</p>
          <p className="font-bold">ROI Neto: {((parseFloat(results[results.length - 1].interesesGeneradosAcumulados) / parseFloat(results[results.length - 1].aportacionesTotales)) * 100).toFixed(2)}%</p>
        </div> */}
    </>
  );
};

export default InvestmentResults;