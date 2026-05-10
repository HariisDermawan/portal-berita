import { motion } from 'framer-motion'
import NewsCard from '../components/NewsCard'

function Nasional() {

  const nasionalNews = [
    {
      image:
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200',
      title:
        'Pemerintah Resmikan Program Digitalisasi Nasional untuk UMKM',
      description:
        'Program baru ini membantu pelaku usaha kecil beradaptasi dengan ekonomi digital modern.',
      date: '10 Mei 2026',
      category: 'Nasional',
    },

    {
      image:
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200',
      title:
        'Ekonomi Indonesia Diprediksi Tumbuh Signifikan Tahun 2026',
      description:
        'Pertumbuhan sektor digital dan investasi asing menjadi faktor utama peningkatan ekonomi.',
      date: '9 Mei 2026',
      category: 'Nasional',
    },

    {
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200',
      title:
        'Pembangunan Infrastruktur Baru Diresmikan di Jakarta',
      description:
        'Pemerintah mempercepat pembangunan transportasi modern untuk masyarakat.',
      date: '8 Mei 2026',
      category: 'Nasional',
    },

    {
      image:
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200',
      title:
        'Konferensi Nasional Bahas Masa Depan Teknologi Indonesia',
      description:
        'Para ahli dan pemimpin industri membahas transformasi digital nasional.',
      date: '7 Mei 2026',
      category: 'Nasional',
    },

    {
      image:
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200',
      title:
        'Pendidikan Digital Mulai Diterapkan di Berbagai Daerah',
      description:
        'Sekolah dan universitas mulai mengintegrasikan sistem pembelajaran digital.',
      date: '6 Mei 2026',
      category: 'Nasional',
    },

    {
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
      title:
        'Pusat Bisnis Baru Dibangun untuk Mendukung Startup Lokal',
      description:
        'Indonesia terus memperkuat ekosistem startup dan teknologi nasional.',
      date: '5 Mei 2026',
      category: 'Nasional',
    },
  ]

  return (
    <div className="w-full px-4 lg:px-8 py-14">

      {/* HEADER */}
      <motion.div
        className="mb-14"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >

        <span className="text-red-500 uppercase tracking-[4px] text-sm font-semibold">
          Indonesia Update
        </span>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4">
          Berita Nasional
        </h1>

        <p className="text-gray-500 text-lg mt-5 max-w-3xl leading-relaxed">
          Ikuti perkembangan terbaru seputar ekonomi, pemerintahan,
          pendidikan, dan pembangunan nasional Indonesia.
        </p>

      </motion.div>

      {/* TOP NEWS */}
      <motion.div
        className="grid lg:grid-cols-[1.7fr_420px] gap-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >

        {/* LEFT */}
        <div className="group cursor-pointer">

          <div className="overflow-hidden rounded-[35px]">

            <img
              src={nasionalNews[0].image}
              alt={nasionalNews[0].title}
              className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
            />

          </div>

          <div className="mt-6">

            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Headline Nasional
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mt-6 max-w-4xl">
              {nasionalNews[0].title}
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mt-5 max-w-3xl">
              {nasionalNews[0].description}
            </p>

            <div className="flex items-center gap-4 mt-7">

              <div className="w-12 h-12 rounded-full bg-slate-300"></div>

              <div>

                <h4 className="font-bold text-slate-900">
                  Admin News
                </h4>

                <p className="text-sm text-gray-500">
                  Dipublikasikan • {nasionalNews[0].date}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">

          {nasionalNews.slice(1, 4).map((news, index) => (

            <div
              key={index}
              className="bg-white rounded-[28px] p-4 flex gap-4 shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
            >

              <img
                src={news.image}
                alt={news.title}
                className="w-[130px] h-[120px] object-cover rounded-2xl"
              />

              <div>

                <span className="text-red-500 text-sm font-semibold">
                  {news.category}
                </span>

                <h3 className="text-lg font-bold text-slate-900 leading-snug mt-2 line-clamp-3">
                  {news.title}
                </h3>

                <p className="text-sm text-gray-400 mt-3">
                  {news.date}
                </p>

              </div>

            </div>

          ))}

        </div>

      </motion.div>

      {/* GRID NEWS */}
      <motion.div
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >

        {nasionalNews.map((news, index) => (
          <NewsCard
            key={index}
            image={news.image}
            title={news.title}
            description={news.description}
            date={news.date}
            category={news.category}
          />
        ))}

      </motion.div>

    </div>
  )
}

export default Nasional