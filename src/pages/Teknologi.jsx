import { motion } from 'framer-motion'
import NewsCard from '../components/NewsCard'

function Teknologi() {

  const teknologiNews = [
    {
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
      title:
        'Artificial Intelligence Mulai Mengubah Industri Digital Global',
      description:
        'AI menjadi teknologi utama yang mendorong inovasi startup, bisnis digital, dan otomatisasi modern.',
      date: '10 Mei 2026',
      category: 'Teknologi',
    },

    {
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200',
      title:
        'Startup Indonesia Raih Pendanaan Fantastis dari Investor Global',
      description:
        'Perusahaan teknologi lokal mulai menarik perhatian investor internasional.',
      date: '9 Mei 2026',
      category: 'Startup',
    },

    {
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200',
      title:
        'Perkembangan Cloud Computing Semakin Mendominasi Dunia Bisnis',
      description:
        'Perusahaan besar mulai memigrasikan seluruh sistem mereka ke cloud.',
      date: '8 Mei 2026',
      category: 'Cloud',
    },

    {
      image:
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200',
      title:
        'Keamanan Siber Jadi Fokus Utama Perusahaan Teknologi Tahun Ini',
      description:
        'Serangan digital meningkat drastis seiring pertumbuhan teknologi modern.',
      date: '7 Mei 2026',
      category: 'Cyber',
    },

    {
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200',
      title:
        'Developer React dan AI Jadi Skill Paling Dicari Tahun 2026',
      description:
        'Permintaan tenaga kerja digital meningkat di sektor startup dan teknologi.',
      date: '6 Mei 2026',
      category: 'Programming',
    },

    {
      image:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200',
      title:
        'Robotika Modern Mulai Digunakan di Industri Manufaktur',
      description:
        'Automasi berbasis robot membantu efisiensi produksi perusahaan global.',
      date: '5 Mei 2026',
      category: 'Robotik',
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

        <span className="text-cyan-500 uppercase tracking-[4px] text-sm font-semibold">
          Technology Update
        </span>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4">
          Berita Teknologi
        </h1>

        <p className="text-gray-500 text-lg mt-5 max-w-3xl leading-relaxed">
          Ikuti perkembangan terbaru dunia teknologi, AI, startup,
          cybersecurity, cloud computing, dan inovasi digital modern.
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
              src={teknologiNews[0].image}
              alt={teknologiNews[0].title}
              className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
            />

          </div>

          <div className="mt-6">

            <span className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Headline Teknologi
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mt-6 max-w-4xl">
              {teknologiNews[0].title}
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mt-5 max-w-3xl">
              {teknologiNews[0].description}
            </p>

            <div className="flex items-center gap-4 mt-7">

              <div className="w-12 h-12 rounded-full bg-slate-300"></div>

              <div>

                <h4 className="font-bold text-slate-900">
                  Tech Admin
                </h4>

                <p className="text-sm text-gray-500">
                  Dipublikasikan • {teknologiNews[0].date}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">

          {teknologiNews.slice(1, 4).map((news, index) => (

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

                <span className="text-cyan-500 text-sm font-semibold">
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

        {teknologiNews.map((news, index) => (
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

export default Teknologi