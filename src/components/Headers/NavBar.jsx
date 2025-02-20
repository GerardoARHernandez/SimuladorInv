const Navbar = () => {
    return (
      <>
        <div className="shadow-2xl">
            <nav className="bg-white">
                <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center"> {/* Alineación vertical centrada */}
                    <div className="flex"> {/* Contenedor para el logo */}              
                    <a href="#" className="flex items-center py-4"> {/* Padding vertical ajustado */}
                        <span className="font-semibold text-blue-500 text-lg">FACTIBLEco. SIMULADOR DE INVERSIÓN</span>
                    </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-4"> {/* Contenedor para el menú */}
                    <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Inicio</a>
                    <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Ahorro</a>
                    <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Inversión</a>
                    <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Crédito</a> 
                    </div>
                </div>
                </div>
            </nav>
        </div>
      </>
    );
  };
  
  export default Navbar;