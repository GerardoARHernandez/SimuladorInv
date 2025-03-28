import { useState } from 'react';

const ExecutiveModal = ({ formData, onClose, onSend }) => {
  const [executiveData, setExecutiveData] = useState({
    nombreEjecutivo: '',
    rendimientoMensual: '',
    notasAdicionales: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExecutiveData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combinar los datos del formulario principal con los del modal
    const dataToSend = {
      ...formData,
      ...executiveData
    };
    onSend(dataToSend);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-[#1C2B54] mb-4">Contactar Ejecutivo</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del ejecutivo que lo atendió:
            </label>
            <input
              type="text"
              name="nombreEjecutivo"
              value={executiveData.nombreEjecutivo}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cuál sería su objetivo de rendimiento mensual? (%)
            </label>
            <input
              type="number"
              name="rendimientoMensual"
              value={executiveData.rendimientoMensual}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.1"
              className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas adicionales (opcional)
            </label>
            <textarea
              name="notasAdicionales"
              value={executiveData.notasAdicionales}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0EA2CB] text-white rounded-lg hover:bg-[#278eaa]"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExecutiveModal;