import { useState } from 'react';

const ExecutiveModal = ({ formData, onClose, onSend }) => {
  const [executiveData, setExecutiveData] = useState({
    nombre: '',
    comentarios: '',
    objetivoRendimiento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExecutiveData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSend(executiveData); // Pasar todos los datos del ejecutivo
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Datos del Ejecutivo</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Nombre del Ejecutivo</label>
            <input
              type="text"
              name="nombre"
              value={executiveData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Objetivo de rendimiento mensual (%)</label>
            <input
              type="number"
              name="objetivoRendimiento"
              value={executiveData.objetivoRendimiento}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Comentarios adicionales</label>
            <textarea
              name="comentarios"
              value={executiveData.comentarios}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveModal;