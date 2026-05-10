// components/Navbar.jsx
import { useState } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'NASIONAL', path: '/nasional' },
    { name: 'TEKNOLOGI', path: '/teknologi' },
    { name: 'HIBURAN', path: '/hiburan' },
    { name: 'OLAHRAGA', path: '/olahraga' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Banner Iklan 728x90 - Seperti di gambar */}
      <div className="hidden md:block bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="relative bg-gray-100 h-[90px] w-full max-w-[728px] mx-auto flex items-center justify-center rounded-lg shadow-sm border border-gray-200">
            <span className="text-[10px] text-gray-400 absolute top-1 left-3 font-mono">ADVERTISEMENT</span>
            <span className="text-gray-400 text-sm font-medium">728x90</span>
            <button className="absolute right-3 bottom-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold tracking-wide">
              LEARN MORE →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation - JNews Style */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo ala JNews */}
            <Link to="/" className="flex-shrink-0 group cursor-pointer">
              <div className="flex items-baseline">
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                  Dev<span className="text-red-600 group-hover:text-red-700 transition-colors">News</span>
                </h1>
                <span className="hidden lg:inline-block ml-2 text-[10px] font-semibold text-gray-400 tracking-wider uppercase border-l border-gray-300 pl-2">
                  Portal Berita
                </span>
              </div>
              <div className="text-[10px] text-gray-400 tracking-wide hidden lg:block -mt-1">
                Trusted News Since 2026
              </div>
            </Link>

            {/* Desktop Navigation Links - Menu lengkap */}
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navLinks.map((link, index) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={index}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-bold tracking-wide transition-all duration-200 group
                      ${active 
                        ? 'text-red-600' 
                        : 'text-gray-700 hover:text-red-600'
                      }`}
                  >
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {!active && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions - Search & Subscribe */}
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              {/* Search Button dengan animasi */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-gray-600 hover:text-red-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
                
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                    >
                      <div className="p-3">
                        <input
                          type="text"
                          placeholder="Cari berita terbaru..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                          autoFocus
                        />
                        <button className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                          Search
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                TRENDING 🔥
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-600 hover:text-red-600 focus:outline-none p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="lg:hidden border-t border-gray-200 py-4 overflow-hidden"
              >
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={index}
                        to={link.path}
                        onClick={toggleMenu}
                        className={`px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200
                          ${active 
                            ? 'bg-red-50 text-red-600 border-l-4 border-red-600' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                          }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  
                  {/* Mobile Search Section */}
                  <div className="pt-4 mt-2 border-t border-gray-100">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cari berita..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-12"
                      />
                      <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  
                  <button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-lg text-sm font-bold transition-all shadow-md">
                    Trending News 🔥
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Breaking News Strip - Kaya di gambar JNews */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
                BREAKING
              </span>
              <span className="font-bold text-red-400">🔥 HOT:</span>
            </div>
            <div className="flex items-center gap-4 text-gray-200">
              <span>President Obama Holds Final Press Conference</span>
              <span className="text-gray-600">•</span>
              <span>Jokowi Seeks Investors for Indonesia's Airports</span>
              <span className="text-gray-600">•</span>
              <span>Benjamin Franklin & Method Of Habit Formation</span>
              <span className="text-gray-600">•</span>
              <span>Hurricane Season Hits Hilton Head Island</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;