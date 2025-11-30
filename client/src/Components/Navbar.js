import { useState } from "react";
import { FaHandHoldingMedical, FaMoon, FaSun } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaHandHoldingMedical className="text-blue-500 text-2xl" />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              MediMind
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              Home
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              About
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              Services
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              Contact
            </a>
          </div>

          {/* Dark mode & Mobile toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <svg
                  className="h-6 w-6 text-gray-700 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {isOpen && (
          <div className="md:hidden mt-2 text-center space-y-2 px-2 pb-4">
            <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-blue-500">Home</a>
            <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-blue-500">About</a>
            <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-blue-500">Services</a>
            <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-blue-500">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;