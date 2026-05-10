import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

import { Link } from 'react-router-dom'

function Footer() {

  return (
    <footer className="w-full px-4 lg:px-8 mt-24 pb-6">

      <div className="bg-slate-950 text-white rounded-[40px] overflow-hidden relative">

        {/* BLUR EFFECT */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-3xl rounded-full"></div>

        {/* CONTENT */}
        <div className="relative z-10 px-6 md:px-10 lg:px-14 py-16">

          {/* TOP */}
          <div className="grid lg:grid-cols-4 gap-12 border-b border-white/10 pb-14">

            {/* LOGO */}
            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center font-black text-xl">
                  D
                </div>

                <div>
                  <h2 className="text-3xl font-black">
                    DevNews
                  </h2>

                  <p className="text-sm text-gray-400">
                    Portal Berita Digital
                  </p>
                </div>

              </div>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Portal berita modern yang menyajikan informasi terbaru
                seputar teknologi, nasional, hiburan, dan olahraga setiap hari.
              </p>

              {/* SOCIAL */}
              <div className="flex items-center gap-4 mt-8">

                <a
                  href="#"
                  className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-red-500 transition flex items-center justify-center"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-red-500 transition flex items-center justify-center"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-red-500 transition flex items-center justify-center"
                >
                  <FaTwitter />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-red-500 transition flex items-center justify-center"
                >
                  <FaYoutube />
                </a>

              </div>

            </div>

            {/* MENU */}
            <div>

              <h3 className="text-xl font-bold mb-6">
                Kategori
              </h3>

              <ul className="space-y-4 text-gray-400">

                <li>
                  <Link
                    to="/nasional"
                    className="hover:text-red-400 transition"
                  >
                    Nasional
                  </Link>
                </li>

                <li>
                  <Link
                    to="/teknologi"
                    className="hover:text-red-400 transition"
                  >
                    Teknologi
                  </Link>
                </li>

                <li>
                  <Link
                    to="/hiburan"
                    className="hover:text-red-400 transition"
                  >
                    Hiburan
                  </Link>
                </li>

                <li>
                  <Link
                    to="/olahraga"
                    className="hover:text-red-400 transition"
                  >
                    Olahraga
                  </Link>
                </li>

              </ul>

            </div>

            {/* COMPANY */}
            <div>

              <h3 className="text-xl font-bold mb-6">
                Perusahaan
              </h3>

              <ul className="space-y-4 text-gray-400">

                <li>
                  <a href="#" className="hover:text-red-400 transition">
                    Tentang Kami
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-red-400 transition">
                    Karir
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-red-400 transition">
                    Kebijakan Privasi
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-red-400 transition">
                    Terms & Conditions
                  </a>
                </li>

              </ul>

            </div>

            {/* NEWSLETTER */}
            <div>

              <h3 className="text-xl font-bold mb-6">
                Newsletter
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                Dapatkan update berita terbaru langsung ke email Anda.
              </p>

              <div className="flex flex-col gap-4">

                <input
                  type="email"
                  placeholder="Masukkan email..."
                  className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-red-500 transition"
                />

                <button className="bg-red-500 hover:bg-red-600 py-4 rounded-2xl font-semibold transition shadow-lg">
                  Subscribe
                </button>

              </div>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8 text-gray-400 text-sm">

            <p>
              © 2026 DevNews. All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <a href="#" className="hover:text-red-400 transition">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-red-400 transition">
                Terms
              </a>

              <a href="#" className="hover:text-red-400 transition">
                Contact
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer