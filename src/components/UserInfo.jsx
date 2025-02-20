
function UserInfo() {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nombre:</label>
        <input type="text" placeholder="Nombre Completo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
        <input type="email" placeholder="Correo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
        <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
    </div>
  );
}

export default UserInfo;