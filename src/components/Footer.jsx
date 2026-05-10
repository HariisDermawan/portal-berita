import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaArrowRight,
  FaNewspaper
} from 'react-icons/fa'

import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full mt-24 bg-gray-900">
      {/* Main Footer - Premium Style */}
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Top Section with Gradient Border */}
        <div className="relative py-16">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              
              {/* Brand Section */}
              <div className="space-y-5">
                <Link to="/" className="inline-block group">
                  <div className="flex items-baseline">
                    <h2 className="text-3xl font-black text-white tracking-tight">
                      Dev<span className="text-red-500 group-hover:text-red-400 transition-colors">News</span>
                    </h2>
                  </div>
                  <div className="text-xs text-gray-500 tracking-wide mt-1">
                    Trusted News Since 2026
                  </div>
                </Link>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  Portal berita modern yang menyajikan informasi terbaru seputar teknologi, nasional, hiburan, dan olahraga setiap hari.
                </p>

                {/* Social Media Icons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  >
                    <FaInstagram className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  >
                    <FaTwitter className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  >
                    <FaYoutube className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  >
                    <FaTiktok className="text-sm" />
                  </a>
                </div>
              </div>

              {/* Categories Section */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-500 rounded-full"></span>
                  Kategori
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to="/nasional" 
                      className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">Nasional</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/teknologi" 
                      className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">Teknologi</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/hiburan" 
                      className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">Hiburan</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/olahraga" 
                      className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">Olahraga</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links Section */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-500 rounded-full"></span>
                  Informasi
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2 group">
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">Tentang Kami</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2 group">
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">Karir</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2 group">
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">Kebijakan Privasi</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2 group">
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">Terms & Conditions</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter Section */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-500 rounded-full"></span>
                  Newsletter
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  Dapatkan update berita terbaru langsung ke email Anda.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="w-full px-5 py-3.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105">
                    Subscribe
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <FaEnvelope className="text-red-500" />
                  <span>No spam, unsubscribe anytime.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Like Navbar Style */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FaNewspaper className="text-red-500 text-sm" />
              <p className="text-gray-500 text-sm">
                © {currentYear} DevNews. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-red-500 transition-all duration-300">
                Privacy Policy
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-all duration-300">
                Terms of Service
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-all duration-300">
                Contact Us
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-all duration-300">
                Advertise
              </a>
            </div>

            {/* Back to Top Button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-500 hover:text-red-500 transition-all duration-300 text-sm flex items-center gap-1 group"
            >
              <span>Back to Top</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer