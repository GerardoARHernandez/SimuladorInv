import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const CapitalChart = ({ results }) => {
  const capitalData = results.map((result) => parseFloat(result.capitalTotal.replace('$', '').replace(',', '')));
  const periods = results.map((result) => result.periodo);

  const chartData = {
    labels: periods,
    datasets: [
      {
        label: 'Capital Total (MXN)',
        data: capitalData,
        backgroundColor: '#003BFF',
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
        }
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Capital Total (MXN)', // Texto del título
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
    <div className="mt-8 bg-white p-4 rounded-lg shadow-md w-3/4 mx-auto"> {/* Ancho ajustado y centrado */}
      <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Capital Real (MXN)</h2> {/* Centrado */}

      {/* Botones de Moneda */}
      <div className="mb-2 flex justify-center">
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-1 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"> {/* Tamaño ajustado */}
          Moneda Nacional
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"> {/* Tamaño ajustado */}
          Dólares
        </button>
      </div>

      {/* Gráfica de Capital Total */}
      <div className="mb-4">
        <Bar data={chartData} options={chartOptions} height={300} width={600} /> {/* Altura y ancho ajustados */}
      </div>

      {/* Botón de Imprimir Reporte */}
      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-[#0EA2CB] text-white rounded-md hover:bg-[##54c3e2] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"> {/* Tamaño ajustado */}
          Imprimir Reporte
        </button>
      </div>
    </div>
  );
};

export default CapitalChart;