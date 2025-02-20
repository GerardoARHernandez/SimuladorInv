import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const InvestmentForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    correoElectronico: "",
    fechaNacimiento: "",
    capitalInicial: "",
    anosInvertir: "",
    entregaIntereses: "",
    periodoReinversion: "",
    aportacionPeriodica: "",
    recapitalizacionAnual: "0%",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const percentage = parseInt(formData.recapitalizacionAnual, 10);

  const calcularInteresAnual = (interesMensual, periodo, recapitalizacion) => {
    switch (periodo) {
      case "Anual":
        return interesMensual * 12 * (1 - recapitalizacion);
      case "Semestral":
        return interesMensual * 6 * (1 - recapitalizacion);
      case "Mensual":
        return interesMensual * (1 - recapitalizacion);
      case "Trimestral":
        return interesMensual * 3 * (1 - recapitalizacion);
      default:
        return 0;
    }
  };

  const calcularEntregaIntereses = (interesAnual, periodo) => {
    switch (periodo) {
      case "Anual":
        return interesAnual;
      case "Semestral":
        return interesAnual / 2;
      case "Mensual":
        return interesAnual / 12;
      case "Trimestral":
        return interesAnual / 4;
      default:
        return 0;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      capitalInicial,
      anosInvertir,
      entregaIntereses,
      periodoReinversion,
      aportacionPeriodica,
      recapitalizacionAnual,
    } = formData;

    const capitalInicialNum = parseFloat(capitalInicial);
    const anosInvertirNum = parseInt(anosInvertir);
    const aportacionPeriodicaNum = parseFloat(aportacionPeriodica);
    const recapitalizacionAnualNum = parseInt(recapitalizacionAnual) / 100; // Convertir a decimal
    const tasaAnual = 0.24;

    const resultsCalculados = [];
    let saldoAcumulado = capitalInicialNum;
    let interesesGenerados = 0;
    let interesesGeneradosAcumulados = 0;
    let aportacionesTotales = capitalInicialNum;

    for (let i = 0; i <= anosInvertirNum; i++) {
      const capitalAdicional = i > 0 ? aportacionPeriodicaNum : 0;
      saldoAcumulado += capitalAdicional;
      aportacionesTotales += capitalAdicional;

      const interesMensual = saldoAcumulado * (tasaAnual / 12);
      interesesGenerados += interesMensual;
      interesesGeneradosAcumulados += interesMensual;

      const interesAnual = calcularInteresAnual(interesMensual, entregaIntereses, recapitalizacionAnualNum);
      const interesEntregado = calcularEntregaIntereses(interesAnual, entregaIntereses);

      resultsCalculados.push({
        periodo: `P${i + 1}`,
        año: i,
        edad: 28 + i,
        capitalInicial: capitalInicialNum,
        capitalAdicional: capitalAdicional,
        saldoAcumulado: saldoAcumulado.toFixed(2),
        interesGenerado: interesMensual.toFixed(2),
        interesRecapitalizado: (interesAnual - interesEntregado).toFixed(2),
        interesEntregado: interesEntregado.toFixed(2),
        capitalTotal: saldoAcumulado.toFixed(2),
        interesesGeneradosAcumulados: interesesGeneradosAcumulados.toFixed(2),
        aportacionesTotales: aportacionesTotales.toFixed(2),
      });
    }

    onCalculate(resultsCalculados);
  };

  return (
    <>
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-5xl mx-0 text-gray-800 font-sans grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Formulario */}
      <div className="col-span-2"> {/* Toma 2/3 del ancho */}
        <h1 className="text-2xl font-bold text-blue-900 mb-6 uppercase text-center">
          Simulador de inversión
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Correo Electrónico */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
              <input
                type="email"
                name="correoElectronico"
                value={formData.correoElectronico}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
              <div className="relative">
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10 appearance-none -webkit-appearance-none -moz-appearance-none" 
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-blue-500" />
                </div>
              </div>
            </div>

            {/* Capital Inicial */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Capital Inicial (MXN):</label>
              <input
                type="number"
                min={0}
                name="capitalInicial"
                value={formData.capitalInicial}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Años a Invertir */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Años a Invertir:</label>
              <input
                type="number"
                min={1}
                name="anosInvertir"
                value={formData.anosInvertir}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Entrega de Intereses */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Entrega de Intereses:</label>
              <select
                name="entregaIntereses"
                value={formData.entregaIntereses}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Selecciona una opción --</option>
                <option value="mensual">Mensual</option>
                <option value="trimestral">Trimestral</option>
                <option value="semestral">Semestral</option>
                <option value="anual">Anual</option>
                
              </select>
            </div>

            {/* Periodo de Reinversión */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Periodo de Reinversión:</label>
              <select
                name="periodoReinversion"
                value={formData.periodoReinversion}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Selecciona una opción --</option>
                <option value="mensual">Mensual</option>
                <option value="trimestral">Trimestral</option>
                <option value="semestral">Semestral</option>
                <option value="anual">Anual</option>
              </select>
            </div>

            {/* Aportación Periódica */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Aportación Periódica (MXN):</label>
              <input
                type="number"
                min={0}
                name="aportacionPeriodica"
                value={formData.aportacionPeriodica}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Recapitalización Anual */}
          <div>
            <label className="block text-sm font-medium">Recapitalización anual (%):</label>
            <input
              type="range"
              name="recapitalizacionAnual"
              value={formData.recapitalizacionAnual}
              min="0"
              max="100"
              step="10"
              onChange={handleChange}
              className="w-full h-2 bg-blue-300 rounded-lg appearance-auto cursor-pointer hover:bg-blue-400"
            />
            <div className="flex justify-between text-sm text-gray-700 mt-2">
              <span>0%</span>
              <span>20%</span>
              <span>40%</span>
              <span>60%</span>
              <span>80%</span>
              <span>100%</span>
            </div>
            <div className="mt-2 text-gray-700 text-center">Valor: {percentage}%</div>
          </div>

          {/* Información adicional */}
          <div className="text-center text-gray-600 text-sm">
            <p>Tasa anual de interés del 24%</p>
            <p>Fecha de cálculo: 10 de Junio de 2024</p>
          </div>

          {/* Botones */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
            >
              Calcular Inversión
            </button>
            <button
              type="button"
              className="px-8 py-4 bg-blue-900 text-white rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-700 text-lg"
            >
              Enviar a un Ejecutivo
            </button>
          </div>
        </form>
      </div>

      {/* Imagen */}
      <div className="col-span-1 overflow-hidden relative">
        <img
          src="public/invers.jpg"
          alt="Simulador"
          className="object-cover w-lvw h-full rounded-lg shadow-md"
        />
      </div>
    </div>    
    </>
  );
};

export default InvestmentForm;