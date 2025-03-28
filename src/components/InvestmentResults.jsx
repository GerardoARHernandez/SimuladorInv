const InvestmentResults = ({ results }) => {
  // Función para formatear números con comas
  const formatNumber = (value) => {
    // Primero convertimos a número por si viene como string
    const number = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
    // Luego formateamos con toLocaleString
    return isNaN(number) ? value : number.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

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
                  <td className="px-3 py-3 text-sm text-center">{formatNumber(result.capitalInicial)}</td>
                  <td className="px-3 py-3 text-sm text-center">{formatNumber(result.capitalAdicional)}</td>
                  <td className="px-3 py-3 text-sm text-center">{formatNumber(result.saldoAcumulado)}</td>
                  <td className="px-3 py-3 text-sm text-center">{formatNumber(result.interesGenerado)}</td>
                  <td className="px-3 py-3 text-sm text-center">{formatNumber(result.interesGenerado * 12)}</td>
                  <td className="px-3 py-3 text-sm text-center">{formatNumber(result.interesRecapitalizado)}</td>
                  <td className="px-3 py-3 text-sm text-center">{formatNumber(result.interesEntregado)}</td>
                  <td className="px-3 py-3 text-sm text-center rounded-r-lg">{formatNumber(result.capitalTotal)}</td>
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