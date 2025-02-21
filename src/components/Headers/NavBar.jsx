import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="shadow-xl">
        <nav className="bg-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex">
                <a href="#" className="flex items-center py-4">
                  <span className="font-semibold text-[#0EA2CB] text-lg">
                    FACTIBLEco. SIMULADOR DE INVERSIÓN
                  </span>
                </a>
              </div>

              {/* Menú Hamburguesa (solo en móviles) */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-[#0EA2CB] focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Menú de navegación (oculto en móviles, visible en desktop) */}
              <div className="hidden md:flex items-center space-x-4">
                <a
                  href="#"
                  className="py-4 px-2 text-gray-600 font-semibold hover:text-[#0EA2CB] transition duration-300"
                >
                  Inicio
                </a>
                <a
                  href="#"
                  className="py-4 px-2 text-gray-600 font-semibold hover:text-[#0EA2CB] transition duration-300"
                >
                  Ahorro
                </a>
                <a
                  href="#"
                  className="py-4 px-2 text-gray-600 font-semibold hover:text-[#0EA2CB] transition duration-300"
                >
                  Inversión
                </a>
                <a
                  href="#"
                  className="py-4 px-2 text-gray-600 font-semibold hover:text-[#0EA2CB] transition duration-300"
                >
                  Crédito
                </a>
              </div>
            </div>

            {/* Menú desplegable (solo en móviles) */}
            <div
              className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
            >
              <a
                href="#"
                className="block py-2 px-4 text-gray-600 font-semibold hover:text-[#0EA2CB] transition duration-300"
              >
                Inicio
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-gray-600 font-semibold hover:text-[#0EA2CB] transition duration-300"
              >
                Ahorro
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-gray-600 font-semibold hover:text-[#0EA2CB] transition duration-300"
              >
                Inversión
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-gray-600 font-semibold hover:text-[#0EA2CB] transition duration-300"
              >
                Crédito
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;