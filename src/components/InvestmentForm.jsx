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
    periodoReinversion: "Anual",
    aportacionPeriodica: "0", // Valor por defecto 0
    deseaRecapitalizar: "NO",
    recapitalizacionAnual: "100%",
    tasaInteresAnual: "24", // Valor por defecto
  });

  const validateRequiredFields = () => {
    return (
      formData.nombre &&
      formData.correoElectronico &&
      formData.fechaNacimiento &&
      formData.capitalInicial &&
      formData.anosInvertir &&
      formData.entregaIntereses &&
      formData.periodoReinversion
      // Eliminamos la validación de aportacionPeriodica ya que siempre tendrá valor
    );
  };

  const [showInfo, setShowInfo] = useState({
    visible: false,
    position: { top: 0, left: 0 }
  });
  const [showExecutiveModal, setShowExecutiveModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Función para manejar el envío al ejecutivo
  const handleSendToExecutive = (executiveData) => {
    console.log('Datos enviados al ejecutivo:', {
      ...formData,
      ...executiveData
    });
    alert('Su información ha sido enviada al ejecutivo. Nos pondremos en contacto pronto.');
  };

  const toggleInfo = (e) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    setShowInfo({
      visible: true,
      position: {
        top: buttonRect.bottom + window.scrollY + 5,
        left: buttonRect.left + window.scrollX
      }
    });
    setTimeout(() => {
      setShowInfo(prev => ({...prev, visible: false}));
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "periodoReinversion" && value === "Ninguna") {
      setFormData({
        ...formData,
        [name]: value,
        aportacionPeriodica: "0" // Forzar 0 si no hay reinversión
      });
    } else if (name === "deseaRecapitalizar") {
      setFormData({
        ...formData,
        [name]: value,
        recapitalizacionAnual: value === "SI" ? "100%" : "0%"
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const percentage = parseInt(formData.recapitalizacionAnual, 10);

  // Generar opciones de tasas de interés del 8% al 24%
  const interestRateOptions = [];
  for (let i = 8; i <= 24; i++) {
    interestRateOptions.push(
      <option key={i} value={i}>{i}%</option>
    );
  }

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
      tasaInteresAnual
    } = formData;

    const capitalInicialNum = parseFloat(capitalInicial.replace(/,/g, ""));
    const anosInvertirNum = parseInt(anosInvertir);
    const aportacionPeriodicaNum = parseFloat(aportacionPeriodica.replace(/,/g, ""));
    const recapitalizacionAnualNum = deseaRecapitalizar === "SI" ? parseFloat(recapitalizacionAnual) / 100 : 0;
    const tasaMensual = (parseFloat(tasaInteresAnual) / 100) / 12;

    let periodosPorAno = 1;
    switch (entregaIntereses) {
      case "mensual": periodosPorAno = 12; break;
      case "trimestral": periodosPorAno = 4; break;
      case "semestral": periodosPorAno = 2; break;
    }

    let tasaPorPeriodo;
    switch (entregaIntereses) {
      case "mensual": tasaPorPeriodo = tasaMensual; break;
      case "trimestral": tasaPorPeriodo = tasaMensual * 3; break;
      case "semestral": tasaPorPeriodo = tasaMensual * 6; break;
      case "anual": tasaPorPeriodo = tasaMensual * 12; break;
    }
    
    let capitalTotal = capitalInicialNum;
    let capitalInicialAcumulado = capitalInicialNum;
    let totalInteresGenerado = 0;
    let interesRecapitalizadoAcumulado = 0;
    let anoAnt = 0;
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
        if (anoActual > 1 && anoActual > anoAnt) {
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
        edad: edadActual + anoActual - 1,
        capitalInicial: capitalInicialNum.toFixed(2),
        capitalAdicional: aportacion.toFixed(2),
        saldoAcumulado: capitalInicialAcumulado.toFixed(2),
        interesGenerado: interesGenerado.toFixed(2),
        interesRecapitalizado: interesRecapitalizado.toFixed(2),
        interesEntregado: interesEntregado.toFixed(2),
        capitalTotal: capitalTotal.toFixed(2),
      });
      anoAnt = anoActual;
    }

    onCalculate(resultsCalculados, formData);
  };

  const handleContainerClick = () => {
    document.getElementById('fechaNacimiento').focus();
  };

  return (
    <>
      <div className="p-8 bg-gray-50 rounded-xl shadow-xl max-w-5xl mx-0 text-gray-800 font-sans grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Formulario */}
        <div className="col-span-2">
          <div className="md:hidden rounded-t-3xl col-span-1 overflow-hidden relative mb-5 mt-0 h-36">
            <img
              src="/invers.png"
              alt="Simulador"
              className="object-cover w-lvw h-full rounded-lg shadow-md"
            />
          </div>
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

              {/* Tasa de Interés Anual */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual:</label>
                <select
                  name="tasaInteresAnual"
                  value={formData.tasaInteresAnual}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border bg-white rounded-2xl hover:border-blue-500 focus:ring-blue-400 focus:border-blue-400"
                  required
                >
                  {interestRateOptions}
                </select>
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
                  className="mt-1 block w-full p-2 border bg-white rounded-2xl hover:border-blue-500 focus:ring-blue-400 focus:border-blue-400"
                  disabled
                >
                  <option value="Anual">Anual</option>
                </select>
              </div>

              {/* Aportación Periódica */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Aportación Periódica (MXN) <span className="text-gray-500">(0 si no aplica)</span>:
                </label>
                <input
                  type="text"
                  name="aportacionPeriodica"
                  value={formData.aportacionPeriodica.toLocaleString()}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    handleChange({ target: { name: e.target.name, value } });
                  }}
                  className="mt-1 block w-full p-2 border rounded-2xl border-white hover:border-blue-500 focus:ring-blue-400 focus:border-blue-400"
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
            <div className="mt-6">
              {/* Contenedor para pantallas grandes */}
              <div className="hidden md:flex justify-center space-x-4">
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
                  onClick={() => validateRequiredFields() ? setShowExecutiveModal(true) : setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  Enviar a un Ejecutivo
                  {showTooltip && !validateRequiredFields() && (
                    <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg">
                      Complete todos los campos requeridos para habilitar esta opción
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleInfo}
                  className="px-3 py-2 m-2 text-[#0EA2CB] hover:text-[#1C2B54] focus:outline-none"
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="w-6 h-6" />
                </button>
              </div>

              {/* Contenedor para pantallas pequeñas */}
              <div className="md:hidden flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full py-2 m-1 bg-[#0EA2CB] text-white rounded-full hover:bg-[#0f87a8] focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
                >
                  Calcular Inversión
                </button>
                <div className="flex w-full justify-between mt-2">
                  <button
                    type="button"
                    className={`w-3/4 py-1 m-1 rounded-full focus:outline-none focus:ring-2 text-lg ${
                      validateRequiredFields() 
                        ? 'bg-[#1C2B54] text-white hover:bg-blue-950 focus:ring-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => validateRequiredFields() ? setShowExecutiveModal(true) : setShowTooltip(true)}
                  >
                    Enviar a Ejecutivo
                  </button>
                  <button
                    type="button"
                    onClick={toggleInfo}
                    className="w-1/4 py-2 m-1 text-[#0EA2CB] hover:text-[#1C2B54] focus:outline-none flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {showInfo.visible && (
              <div 
                className="z-10 absolute bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64"
                style={{
                  top: `${showInfo.position.top}px`,
                  left: `${showInfo.position.left}px`
                }}
              >
                <p className="text-sm text-gray-700">
                  Envíe su formulario y un ejecutivo se comunicará con usted.
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="text-center text-gray-600 text-sm">
              <p>Tasa anual de interés seleccionada: {formData.tasaInteresAnual}%</p>
              <p>Fecha de cálculo: {new Date().toLocaleDateString("es-mx", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}</p>
            </div>
          </form>
        </div>

        {/* Imagen */}
        <div className="hidden md:block md:col-span-1 md:overflow-hidden md:relative">
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