import React, { useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const CapitalChart = ({ results }) => {
  const [currency, setCurrency] = useState('MXN'); // Estado para manejar la moneda seleccionada

  // Función para calcular el capital en la moneda seleccionada
  const getCapitalData = () => {
    const baseData = results.map((result) =>
      parseFloat(result.capitalTotal.replace('$', '').replace(',', ''))
    );
    if (currency === 'USD') {
      return baseData.map((value) => value / 20); // Convertir a dólares (1 USD = 20 MXN)
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
    <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md w-3/4 mx-auto"> {/* Ancho ajustado y centrado */}
      <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Capital Real ({currency})</h2> {/* Centrado */}

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
        <button className="px-4 py-2 bg-[#0EA2CB] text-white rounded-md hover:bg-[#54c3e2] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
          Imprimir Reporte
        </button>
      </div>
    </div>
  );
};

export default CapitalChart;