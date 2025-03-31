import { useState, useEffect} from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { fetchExchangeRate } from '../functions';

const CapitalChart = ({ results, formData }) => {
  const [currency, setCurrency] = useState('MXN');
  const [exchangeRate, setExchangeRate] = useState(20); // Valor por defecto

  useEffect(() => {
    const getExchangeRate = async () => {
      const rate = await fetchExchangeRate();
      setExchangeRate(rate);
    };
    
    getExchangeRate();
  }, []);


  const formatDate = (dateString) => {
    if (!dateString) return 'No proporcionada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para generar el contenido del reporte en HTML
  const generateReportContent = () => {
    if (!results || !formData) return '';
    
    // Calcular totales
    const capitalFinal = parseFloat(results[results.length - 1].capitalTotal.replace(/[^0-9.-]/g, ''));
    const capitalInicial = parseFloat(results[0].capitalInicial.replace(/[^0-9.-]/g, ''));
    const totalIntereses = capitalFinal - capitalInicial;
  
    // Convertir a dólares si es necesario
    const displayCapitalInicial = currency === 'USD' ? capitalInicial / exchangeRate : capitalInicial;
    const displayCapitalFinal = currency === 'USD' ? capitalFinal / exchangeRate : capitalFinal;
    const displayTotalIntereses = currency === 'USD' ? totalIntereses / exchangeRate : totalIntereses;
  

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reporte de Inversión</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #1C2B54; text-align: center; }
          .section { margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
          .section-title { color: #1C2B54; font-size: 18px; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #1C2B54; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          .summary { display: flex; justify-content: space-between; margin-top: 20px; }
          .summary-item { text-align: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; flex: 1; margin: 0 10px; }
        </style>
      </head>
      <body>
        <h1>Reporte de Inversión</h1>
        <p style="text-align: center; color: #666;">Generado el ${formatDate(new Date())}</p>
        
        <!-- Información del Cliente -->
        <div class="section">
          <div class="section-title">Información del Cliente</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <p><strong>Nombre:</strong> ${formData.nombre || 'No proporcionado'}</p>
              <p><strong>Correo:</strong> ${formData.correoElectronico || 'No proporcionado'}</p>
            </div>
            <div>
              <p><strong>Fecha Nacimiento:</strong> ${formatDate(formData.fechaNacimiento)}</p>
            </div>
          </div>
        </div>
        
        <!-- Detalles de la Inversión -->
        <div class="section">
          <div class="section-title">Detalles de la Inversión</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
            <div>
              <p><strong>Capital Inicial:</strong> $${displayCapitalInicial.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              <p><strong>Moneda:</strong> ${currency}</p>
              ${currency === 'USD' ? `<p><strong>Tipo de cambio:</strong> $${exchangeRate.toFixed(4)} MXN/USD</p>` : ''}
            </div>
            <div>
              <p><strong>Plazo:</strong> ${formData.anosInvertir} años</p>
              <p><strong>Tasa Anual:</strong> ${formData.tasaInteresAnual || '24'}%</p>
            </div>
            <div>
              <p><strong>Frecuencia:</strong> ${formData.entregaIntereses}</p>
              <p><strong>Recapitalización:</strong> ${formData.recapitalizacionAnual}</p>
            </div>
          </div>
        </div>
        
        <!-- Resumen -->
        <div class="summary">
          <div class="summary-item">
            <div style="font-size: 24px; font-weight: bold; color: #1C2B54;">$${capitalInicial.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div>Capital Inicial</div>
          </div>
          <div class="summary-item">
            <div style="font-size: 24px; font-weight: bold; color: #1C2B54;">$${capitalFinal.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div>Capital Final</div>
          </div>
          <div class="summary-item">
            <div style="font-size: 24px; font-weight: bold; color: #1C2B54;">$${totalIntereses.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div>Intereses Generados</div>
          </div>
        </div>
        
        <!-- Tabla de Resultados -->
        <div class="section">
          <div class="section-title">Proyección de Inversión</div>
          <table>
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Año</th>
                <th>Capital Acumulado</th>
                <th>Interés Generado</th>
                <th>Capital Total</th>
              </tr>
            </thead>
            <tbody>
              ${results.map((result, index) => `
                <tr>
                  <td>${result.periodo}</td>
                  <td>${result.año}</td>
                  <td>$${parseFloat(result.saldoAcumulado).toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td>$${parseFloat(result.interesGenerado).toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td>$${parseFloat(result.capitalTotal).toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <!-- Notas -->
        <div style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
          <p>Este reporte es una proyección basada en los datos proporcionados y no garantiza rendimientos futuros.</p>
          <p>Los resultados pueden variar dependiendo de las condiciones del mercado.</p>
        </div>
      </body>
      </html>
    `;
  };

  const handlePrint = () => {
    if (!results || !formData) {
      alert('No hay datos disponibles para generar el reporte');
      return;
    }

    const reportContent = generateReportContent();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(reportContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Esperar a que se cargue el contenido antes de imprimir
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // Función para calcular el capital en la moneda seleccionada
  const getCapitalData = () => {
    const baseData = results.map((result) =>
      parseFloat(result.capitalTotal.replace('$', '').replace(',', ''))
    );
    if (currency === 'USD') {
      return baseData.map((value) => value / exchangeRate); // Convertir a dólares usando el tipo de cambio actual
    }
    return baseData; // Mantener en MXN
  };

  const capitalData = getCapitalData(); // Obtener los datos convertidos
  const periods = results.map((result) => result.periodo);

  const chartData = {
    labels: periods,
    datasets: [
      {
        label: `Capital Total (${currency})`,
        data: capitalData,
        backgroundColor: '#1C2B54',
        borderRadius: 4,
        barThickness: 10, // Grosor de las barras (más delgado)
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Periodo', // Texto del título
          font: { // Estilos del título
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: `Capital Total (${currency})`, // Texto del título
          font: { // Estilos del título
            weight: 'bold',
          },
        },
        ticks: {
          beginAtZero: true, // Para que el eje Y comience en 0
          autoSkip: true, // Para que los ticks se ajusten automáticamente
          maxTicksLimit: 10, // Para limitar el número máximo de ticks (opcional)
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Capital Total: $${context.formattedValue}`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md w-3/4 mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Capital Real ({currency})</h2>
      
      {currency === 'USD' && (
        <p className="text-center text-sm text-gray-600 mb-2">
          Tipo de cambio: $1 USD = ${exchangeRate.toFixed(4)} MXN
        </p>
      )}

      {/* Botones de Moneda */}
      <div className="mb-2 flex justify-center">
        <button
          className={`px-6 py-2 rounded-lg m-1 ${
            currency === 'MXN' ? 'bg-[#0EA2CB] text-white' : 'bg-[#C7E4ED] text-gray-700'
          } hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm transition-colors duration-200`}
          onClick={() => setCurrency('MXN')}
        >
          Moneda Nacional
        </button>
        <button
          className={`px-6 py-2 rounded-lg m-1 ${
            currency === 'USD' ? 'bg-[#0EA2CB] text-white' : 'bg-[#C7E4ED] text-gray-700'
          } hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm transition-colors duration-200`}
          onClick={() => setCurrency('USD')}
        >
          Dólares
        </button>
      </div>

      {/* Gráfica de Capital Total */}
      <div className="mb-4">
        <Bar data={chartData} options={chartOptions} height={300} width={600} /> {/* Altura y ancho ajustados */}
      </div>

      {/* Botón de Imprimir Reporte */}
      <div className="mt-4 flex justify-end">
        <button 
          onClick={handlePrint}
          className="px-4 py-2 bg-[#0EA2CB] text-white rounded-md hover:bg-[#54c3e2] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        >
          Generar Reporte
        </button>
      </div>
    </div>
  );
};

export default CapitalChart;