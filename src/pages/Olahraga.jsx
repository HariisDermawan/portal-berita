import { motion } from 'framer-motion'
import NewsCard from '../components/NewsCard'

function Olahraga() {

  const olahragaNews = [
    {
      image:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200',
      title:
        'Persija Jakarta Juara Liga Indonesia 2026 Setelah Final Dramatis',
      description:
        'Pertandingan berlangsung sengit hingga menit akhir dengan dukungan penuh ribuan suporter.',
      date: '10 Mei 2026',
      category: 'Sepak Bola',
    },

    {
      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200',
      title:
        'Persib Bandung Siapkan Skuad Baru untuk Musim Depan',
      description:
        'Pelatih Persib fokus memperkuat lini pertahanan dan serangan musim ini.',
      date: '9 Mei 2026',
      category: 'Liga 1',
    },

    {
      image:
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200',
      title:
        'Timnas Indonesia Lolos ke Final Piala Asia 2026',
      description:
        'Kemenangan dramatis membawa Indonesia selangkah menuju sejarah baru sepak bola Asia.',
      date: '8 Mei 2026',
      category: 'Timnas',
    },

    {
      image:
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200',
      title:
        'Atlet Indonesia Pecahkan Rekor Nasional di Kejuaraan Dunia',
      description:
        'Prestasi membanggakan kembali diraih atlet muda Indonesia di ajang internasional.',
      date: '7 Mei 2026',
      category: 'Atletik',
    },

    {
      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200',
      title:
        'Liga Champions 2026 Dipenuhi Talenta Muda Berbakat',
      description:
        'Klub-klub besar Eropa mulai memberikan kesempatan kepada pemain muda potensial.',
      date: '6 Mei 2026',
      category: 'Eropa',
    },

    {
      image:
        'https://images.unsplash.com/photo-1543357480-c60d40007a3f?q=80&w=1200',
      title:
        'Turnamen Basket Nasional Berlangsung Meriah di Jakarta',
      description:
        'Ribuan penonton memadati arena untuk menyaksikan pertandingan final nasional.',
      date: '5 Mei 2026',
      category: 'Basket',
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

        <span className="text-green-500 uppercase tracking-[4px] text-sm font-semibold">
          Sports Update
        </span>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4">
          Berita Olahraga
        </h1>

        <p className="text-gray-500 text-lg mt-5 max-w-3xl leading-relaxed">
          Ikuti perkembangan terbaru dunia olahraga mulai dari sepak bola,
          basket, atletik, hingga kompetisi internasional terbaru.
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
              src={olahragaNews[0].image}
              alt={olahragaNews[0].title}
              className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
            />

          </div>

          <div className="mt-6">

            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Headline Olahraga
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mt-6 max-w-4xl">
              {olahragaNews[0].title}
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mt-5 max-w-3xl">
              {olahragaNews[0].description}
            </p>

            <div className="flex items-center gap-4 mt-7">

              <div className="w-12 h-12 rounded-full bg-slate-300"></div>

              <div>

                <h4 className="font-bold text-slate-900">
                  Sports Admin
                </h4>

                <p className="text-sm text-gray-500">
                  Dipublikasikan • {olahragaNews[0].date}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">

          {olahragaNews.slice(1, 4).map((news, index) => (

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

                <span className="text-green-500 text-sm font-semibold">
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

        {olahragaNews.map((news, index) => (
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

export default Olahraga