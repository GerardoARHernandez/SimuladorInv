
const InvestmentResults = ({ results }) => {
  return (
    <>
      <div className="mt-0 max-w-5xl bg-white p-6 pt-0 rounded-xl shadow-md w-full overflow-x-auto">
        <table className="min-w-full bg-white border-collapse table-auto">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase rounded-tl-lg">Periodo</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Año</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Edad</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Capital Inicial</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Aportación</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Saldo Acumulado</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Interés Mensual</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Interés Anual</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Interés Recapitalizado</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase">Interés Entregado</th>
              <th className="px-3 py-3 text-sm font-semibold text-center uppercase rounded-tr-lg">Capital Total</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              const rowClass = index % 2 === 0 ? 'bg-[#dbebf6]' : 'bg-[#bcd5e6]';
              return (
                <tr key={index} className={rowClass}>
                  <td className="px-3 py-3 text-sm text-center rounded-l-lg">{result.periodo}</td>
                  <td className="px-3 py-3 text-sm text-center">{result.año}</td>
                  <td className="px-3 py-3 text-sm text-center">{result.edad}</td>
                  <td className="px-3 py-3 text-sm text-center">{result.capitalInicial}</td>
                  <td className="px-3 py-3 text-sm text-center">{result.capitalAdicional}</td>
                  <td className="px-3 py-3 text-sm text-center">{result.saldoAcumulado}</td>
                  <td className="px-3 py-3 text-sm text-center">{result.interesGenerado}</td>
                  <td className="px-3 py-3 text-sm text-center">{(result.interesGenerado * 12).toFixed(2)}</td>
                  <td className="px-3 py-3 text-sm text-center">{result.interesRecapitalizado}</td>
                  <td className="px-3 py-3 text-sm text-center">{result.interesEntregado}</td>
                  <td className="px-3 py-3 text-sm text-center rounded-r-lg">{result.capitalTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvestmentResults;