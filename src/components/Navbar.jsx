// Navbar.jsx
import { useState } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'WORLD', path: '/world' },
    { name: 'BUSINESS', path: '/business' },
    { name: 'ECONOMY', path: '/economy' },
    { name: 'LIFESTYLE', path: '/lifestyle' },
    { name: 'ENTERTAINMENT', path: '/entertainment' },
    { name: 'TECH', path: '/tech' },
    { name: 'TRAVEL', path: '/travel' },
    { name: 'FASHION', path: '/fashion' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner AD - 728x90 */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="bg-gray-100 h-[90px] w-full max-w-[728px] mx-auto flex items-center justify-center relative rounded">
            <span className="text-xs text-gray-400 absolute top-1 left-2">ADVERTISEMENT</span>
            <span className="text-gray-400 text-sm">728x90</span>
            <button className="absolute right-2 bottom-1 text-xs text-blue-600 hover:text-blue-800 font-medium">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - JNews style */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                J<span className="text-red-600">News</span>
              </h1>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Search and Actions */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <button className="text-gray-600 hover:text-red-600 transition-colors">
                <FaSearch className="w-5 h-5" />
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                Subscribe
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-200 py-4"
              >
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={toggleMenu}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-3 border-t border-gray-200">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Featured Story Bar - Optional seperti di gambar */}
      <div className="bg-gray-50 border-b border-gray-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 text-xs md:text-sm overflow-x-auto whitespace-nowrap">
            <span className="font-bold text-red-600">BREAKING NEWS:</span>
            <span className="text-gray-700">President Obama Holds his Final Press Conference</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Jokowi Seeks Investors for Indonesia's Airports</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;