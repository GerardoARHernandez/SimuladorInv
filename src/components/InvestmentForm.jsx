import { useState } from "react";
import ExecutiveModal from "./ExecutiveModal";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    deseaRecapitalizar: "NO", // Nuevo campo con valor por defecto "NO"
    recapitalizacionAnual: "100%", // Cambiado a 100% por defecto cuando es SI
    tasaInteresAnual: "24",
  });

  const validateRequiredFields = () => {
    return (
      formData.nombre &&
      formData.correoElectronico &&
      formData.fechaNacimiento &&
      formData.capitalInicial &&
      formData.anosInvertir &&
      formData.entregaIntereses &&
      formData.periodoReinversion &&
      (formData.periodoReinversion === "Ninguna" || formData.aportacionPeriodica)
    );
  };

  const [showInfo, setShowInfo] = useState(false);
  const [showExecutiveModal, setShowExecutiveModal] = useState(false);

  // Función para manejar el envío al ejecutivo
  const handleSendToExecutive = (executiveData) => {
    // Aquí puedes implementar el envío real (API, email, etc.)
    console.log('Datos enviados al ejecutivo:', {
      ...formData,
      ...executiveData
    });
    
    // Mostrar confirmación al usuario
    alert('Su información ha sido enviada al ejecutivo. Nos pondremos en contacto pronto.');
  };

  const toggleInfo = () => {
    setShowInfo(true);
    setTimeout(() => {
      setShowInfo(false);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el campo cambiado es "periodoReinversion" y el valor es "Ninguna", setear "aportacionPeriodica" a "0"
    if (name === "periodoReinversion" && value === "Ninguna") {
      setFormData({
        ...formData,
        [name]: value,
        aportacionPeriodica: "0",
      });
    } 
    // Si el campo cambiado es "deseaRecapitalizar"
    else if (name === "deseaRecapitalizar") {
      setFormData({
        ...formData,
        [name]: value,
        recapitalizacionAnual: value === "SI" ? "100%" : "0%"
      });
    }
    // En cualquier otro caso, actualizar el estado normalmente
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const percentage = parseInt(formData.recapitalizacionAnual, 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calcular edad actual basada en fecha de nacimiento
    const birthDate = new Date(formData.fechaNacimiento);
    const today = new Date();
    let edadActual = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      edadActual--;
    }

    const {
      capitalInicial,
      anosInvertir,
      entregaIntereses,
      aportacionPeriodica,
      recapitalizacionAnual,
      deseaRecapitalizar,
    } = formData;

    const capitalInicialNum = parseFloat(capitalInicial.replace(/,/g, ""));
    const anosInvertirNum = parseInt(anosInvertir);
    const aportacionPeriodicaNum = parseFloat(aportacionPeriodica.replace(/,/g, ""));
    // Si no desea recapitalizar, forzar 0%
    const recapitalizacionAnualNum = deseaRecapitalizar === "SI" ? parseFloat(recapitalizacionAnual) / 100 : 0;
    const tasaMensual = (parseFloat(formData.tasaInteresAnual) / 100) / 12;

    let periodosPorAno = 1;
    switch (entregaIntereses) {
      case "mensual":
        periodosPorAno = 12;
        break;
      case "trimestral":
        periodosPorAno = 4;
        break;
      case "semestral":
        periodosPorAno = 2;
        break;
    }

    let tasaPorPeriodo;
    switch (entregaIntereses) {
    case "mensual":
      tasaPorPeriodo = tasaMensual;
      break;
    case "trimestral":
      tasaPorPeriodo = tasaMensual * 3;
      break;
    case "semestral":
      tasaPorPeriodo = tasaMensual * 6;
      break;
    case "anual":
      tasaPorPeriodo = tasaMensual * 12;
      break;
    }
    

    let capitalTotal = capitalInicialNum;
    let capitalInicialAcumulado = capitalInicialNum;
    let totalInteresGenerado = 0;
    let interesRecapitalizadoAcumulado = 0;
    const resultsCalculados = [];

    for (let i = 1; i <= anosInvertirNum * periodosPorAno; i++) {
      const anoActual = Math.ceil(i / periodosPorAno);

      const aportacion = i > 1 ? aportacionPeriodicaNum : 0;
      capitalInicialAcumulado += aportacion;

      let interesGenerado, interesRecapitalizado, interesEntregado;

      if (periodosPorAno === 1) {
        capitalInicialAcumulado += interesRecapitalizadoAcumulado;
        interesGenerado = capitalInicialAcumulado * tasaPorPeriodo;
        interesRecapitalizado = interesGenerado * recapitalizacionAnualNum;
        interesEntregado = interesGenerado - interesRecapitalizado;
        interesRecapitalizadoAcumulado = 0;
      } else {
        if (anoActual > 1 && anoActual > (i - 1) / periodosPorAno) {
          capitalInicialAcumulado += interesRecapitalizadoAcumulado;
          interesRecapitalizadoAcumulado = 0;
        }
        interesGenerado = capitalInicialAcumulado * tasaPorPeriodo;
        interesRecapitalizado = interesGenerado * recapitalizacionAnualNum;
        interesEntregado = interesGenerado - interesRecapitalizado;
      }

      interesRecapitalizadoAcumulado += interesRecapitalizado;
      totalInteresGenerado += interesGenerado;
      capitalTotal = capitalInicialAcumulado + totalInteresGenerado;

      resultsCalculados.push({
        periodo: `P${i}`,
        año: anoActual,
        edad: edadActual + anoActual - 1, // Edad actual + años transcurridos
        capitalInicial: capitalInicialNum.toFixed(2),
        capitalAdicional: aportacion.toFixed(2),
        saldoAcumulado: capitalInicialAcumulado.toFixed(2),
        interesGenerado: interesGenerado.toFixed(2),
        interesRecapitalizado: interesRecapitalizado.toFixed(2),
        interesEntregado: interesEntregado.toFixed(2),
        capitalTotal: capitalTotal.toFixed(2),
      });
    }

    onCalculate(resultsCalculados, formData); // Enviar ambos: resultados y datos del formulario
  };

  const handleContainerClick = () => {
    // Enfocar el input de fecha cuando se hace clic en el contenedor
    document.getElementById('fechaNacimiento').focus();
  };

  return (
    <>
      <div className="p-8 bg-gray-50 rounded-xl shadow-xl max-w-5xl mx-0 text-gray-800 font-sans grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Formulario */}
        <div className="col-span-2">
          <h1 className="text-2xl font-bold text-[#1C2B54] mb-6 uppercase text-center">
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
                  className="mt-1 hover:border-blue-500 block w-full p-2 border rounded-2xl bg-white focus:ring-blue-400 focus:border-blue-400"
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
                  className="mt-1 block w-full p-2 border bg-white rounded-2xl hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div>
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento:</label>
                <div className="relative cursor-pointer" onClick={handleContainerClick}>
                  <input
                    id="fechaNacimiento"
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border bg-white rounded-2xl focus:ring-blue-400 focus:border-blue-400 pr-10 appearance-none hover:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Capital Inicial */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Capital Inicial (MXN):</label>
                <input
                  type="text"
                  name="capitalInicial"
                  value={formData.capitalInicial.toLocaleString()}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    handleChange({ target: { name: e.target.name, value } });
                  }}
                  className="mt-1 block w-full p-2 border bg-white rounded-2xl hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
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
                  className="mt-1 block w-full p-2 border bg-white rounded-2xl hover:border-blue-600 focus:ring-blue-400 focus:border-blue-400"
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
                  className="mt-1 block w-full p-2 border bg-white rounded-2xl hover:border-blue-500 focus:ring-blue-400 focus:border-blue-400"
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
                  className="mt-1 block w-full p-2 border rounded-2xl bg-white hover:border-blue-500 focus:ring-blue-400 focus:border-blue-400"
                  required
                >
                  <option value="">-- Selecciona una opción --</option>
                  <option value="Ninguna">Ninguna</option>
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
                  type="text"
                  name="aportacionPeriodica"
                  value={formData.aportacionPeriodica.toLocaleString()}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    handleChange({ target: { name: e.target.name, value } });
                  }}
                  className="mt-1 block w-full p-2 border rounded-2xl border-white hover:border-blue-500 focus:ring-blue-400 focus:border-blue-400"
                  disabled={formData.periodoReinversion === "Ninguna"}
                  required={formData.periodoReinversion !== "Ninguna"}
                />
              </div>
            </div>

            {/* Pregunta sobre recapitalización */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Desea recapitalizar su inversión anualmente?
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="deseaRecapitalizar"
                    value="SI"
                    checked={formData.deseaRecapitalizar === "SI"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Sí</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="deseaRecapitalizar"
                    value="NO"
                    checked={formData.deseaRecapitalizar === "NO"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            {/* Control de recapitalización (solo visible si eligió SI) */}
            {formData.deseaRecapitalizar === "SI" && (
              <div>
                <label className="block text-sm font-medium">Recapitalización anual (%):</label>
                <input
                  type="range"
                  name="recapitalizacionAnual"
                  value={formData.recapitalizacionAnual.replace('%', '')}
                  min="0"
                  max="100"
                  step="10"
                  onChange={handleChange}
                  className="w-full h-2 bg-[#1B2A53] rounded-lg hover:border-blue-600 appearance-auto cursor-pointer hover:bg-[#121c38]"
                />
                <div className="flex justify-between text-sm text-gray-700 mt-2">
                  <span>0%</span>
                  <span>20%</span>
                  <span>40%</span>
                  <span>60%</span>
                  <span>80%</span>
                  <span>100%</span>
                </div>
                <div className="mt-2 text-gray-700 text-center">
                  <input 
                    type="text" 
                    className="rounded-xl text-center w-16 py-1 px-0" 
                    readOnly 
                    value={`${percentage}%`} 
                  />
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                type="submit"
                className="px-8 py-2 m-2 bg-[#0EA2CB] text-white rounded-full hover:bg-[#278eaa] focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              >
                Calcular Inversión
              </button>
              <button
                type="button"
                className={`px-8 py-2 m-2 rounded-full focus:outline-none focus:ring-2 text-lg ${
                  validateRequiredFields() 
                    ? 'bg-[#1C2B54] text-white hover:bg-blue-950 focus:ring-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={() => setShowExecutiveModal(true)}
                disabled={!validateRequiredFields()}
              >
                Enviar a un Ejecutivo
              </button>
            </div>

            <button
              type="button"
              onClick={toggleInfo}
              className="px-3 py-2 m-2 text-[#0EA2CB] hover:text-[#1C2B54] focus:outline-none"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="w-6 h-6" />
            </button>

            {showInfo && (
              <div className="z-10 absolute top-16 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64">
                <p className="text-sm text-gray-700">
                  Envíe su formulario y un ejecutivo se comunicará con usted.
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="text-center text-gray-600 text-sm">
              <p>Tasa anual de interés del 24%</p>
              <p>Fecha de cálculo: {new Date().toLocaleDateString("es-mx", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </form>
        </div>

        {/* Imagen */}
        <div className="col-span-1 overflow-hidden relative">
          <img
            src="/invers.png"
            alt="Simulador"
            className="object-cover w-lvw h-full rounded-lg shadow-md"
          />
        </div>
      </div>

      {showExecutiveModal && (
        <ExecutiveModal
          formData={formData}
          onClose={() => setShowExecutiveModal(false)}
          onSend={handleSendToExecutive}
        />
      )}
    </>
  );
};

export default InvestmentForm;