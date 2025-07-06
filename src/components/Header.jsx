import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import { FiMenu, FiX, FiHome, FiBookmark } from "react-icons/fi";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 shadow-sm dark:text-gray-100 sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group" aria-label="Home">
              <span className="text-2xl font-bold transition-opacity flex items-center">
                <span className="mr-2 text-amber-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  🍲
                </span>
                <span className="text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  TastyBook
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-6">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400 transition-all flex items-center group"
              >
                <FiHome className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 dark:after:bg-amber-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  Home
                </span>
              </Link>
              <Link
                to="/favorites"
                className="px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400 transition-all flex items-center group"
              >
                <FiBookmark className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-rose-500 dark:after:bg-rose-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  Favorites
                </span>
              </Link>
            </div>
          </nav>

          {/* Dark mode toggle */}
          <div className="flex items-center space-x-3">
            <DarkModeToggle mobile={true} />

            {/* Mobile menu button*/}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:outline-none text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="px-4 pt-3 pb-5 space-y-3">
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors flex items-center group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiHome className="h-5 w-5 mr-3 text-amber-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
              <span>Home</span>
            </Link>
            <Link
              to="/favorites"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors flex items-center group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiBookmark className="h-5 w-5 mr-3 text-rose-500 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors" />
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
