import { motion } from 'framer-motion'
import NewsCard from '../components/NewsCard'

function Hiburan() {

  const hiburanNews = [
    {
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200',
      title:
        'Festival Musik Internasional 2026 Dipadati Ribuan Penonton',
      description:
        'Artis dari berbagai negara tampil memukau dalam festival musik terbesar tahun ini.',
      date: '10 Mei 2026',
      category: 'Musik',
    },

    {
      image:
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200',
      title:
        'Film Indonesia Berhasil Menembus Box Office Asia',
      description:
        'Industri perfilman Indonesia semakin mendapat perhatian dunia internasional.',
      date: '9 Mei 2026',
      category: 'Film',
    },

    {
      image:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200',
      title:
        'Konser Band Legendaris Berlangsung Meriah di Jakarta',
      description:
        'Puluhan ribu penggemar memadati stadion untuk menyaksikan konser spektakuler.',
      date: '8 Mei 2026',
      category: 'Konser',
    },

    {
      image:
        'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1200',
      title:
        'Fashion Show Modern Tampilkan Tren Terbaru Tahun 2026',
      description:
        'Desainer ternama memperkenalkan konsep fashion futuristik dan elegan.',
      date: '7 Mei 2026',
      category: 'Fashion',
    },

    {
      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200',
      title:
        'Creator Content Indonesia Mendunia Lewat Platform Digital',
      description:
        'Konten kreator lokal berhasil meraih jutaan penonton dari berbagai negara.',
      date: '6 Mei 2026',
      category: 'Creator',
    },

    {
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200',
      title:
        'Drama Series Terbaru Jadi Trending di Asia Tenggara',
      description:
        'Serial terbaru sukses menarik perhatian penonton dengan alur cerita unik.',
      date: '5 Mei 2026',
      category: 'Series',
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

        <span className="text-pink-500 uppercase tracking-[4px] text-sm font-semibold">
          Entertainment Update
        </span>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4">
          Berita Hiburan
        </h1>

        <p className="text-gray-500 text-lg mt-5 max-w-3xl leading-relaxed">
          Ikuti kabar terbaru dunia hiburan mulai dari musik,
          film, konser, fashion, hingga creator digital populer.
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
              src={hiburanNews[0].image}
              alt={hiburanNews[0].title}
              className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
            />

          </div>

          <div className="mt-6">

            <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Headline Hiburan
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mt-6 max-w-4xl">
              {hiburanNews[0].title}
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mt-5 max-w-3xl">
              {hiburanNews[0].description}
            </p>

            <div className="flex items-center gap-4 mt-7">

              <div className="w-12 h-12 rounded-full bg-slate-300"></div>

              <div>

                <h4 className="font-bold text-slate-900">
                  Entertainment Admin
                </h4>

                <p className="text-sm text-gray-500">
                  Dipublikasikan • {hiburanNews[0].date}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">

          {hiburanNews.slice(1, 4).map((news, index) => (

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

                <span className="text-pink-500 text-sm font-semibold">
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

        {hiburanNews.map((news, index) => (
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

export default Hiburan