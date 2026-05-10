import NewsCard from '../components/NewsCard'
import { motion } from 'framer-motion'
import {
    FaGlobeAsia,
    FaMicrochip,
    FaMusic,
    FaFutbol,
    FaFire
} from 'react-icons/fa'

function Home() {

    const latestNews = [
        {
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200',
            title: 'Revolusi AI di Industri Otomotif Global',
            description: 'Artificial intelligence mulai mengubah kendaraan modern.',
            date: '10 Mei 2026',
            category: 'Teknologi'
        },

        {
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200',
            title: 'Transformasi Digital Nasional Mulai Dipercepat',
            description: 'Pemerintah fokus pada pengembangan ekonomi digital.',
            date: '9 Mei 2026',
            category: 'Nasional'
        },

        {
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200',
            title: 'Festival Musik Asia 2026 Resmi Dibuka',
            description: 'Festival musik terbesar tahun ini dipenuhi ribuan penonton.',
            date: '8 Mei 2026',
            category: 'Hiburan'
        },

        {
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200',
            title: 'Persija vs Persib Jadi Sorotan Liga 1',
            description: 'Pertandingan panas diprediksi jadi laga terbesar musim ini.',
            date: '7 Mei 2026',
            category: 'Olahraga'
        },

        {
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200',
            title: 'Startup Indonesia Dilirik Investor Global',
            description: 'Ekosistem startup berkembang sangat cepat tahun ini.',
            date: '6 Mei 2026',
            category: 'Teknologi'
        },

        {
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200',
            title: 'Konferensi Dunia Bahas Ekonomi Digital',
            description: 'Pemimpin dunia fokus pada perkembangan teknologi modern.',
            date: '5 Mei 2026',
            category: 'Nasional'
        }
    ]

    return (
        <motion.main
            className="w-full px-4 lg:px-8 py-6 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >

            {/* HERO */}
            <section className="grid lg:grid-cols-[1.6fr_380px] gap-6">

                {/* LEFT */}
                <div className="relative h-[540px] rounded-[32px] overflow-hidden group">

                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1800"
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    <div className="absolute top-5 left-5 flex gap-3">

                        <span className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full">
                            Breaking News
                        </span>

                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-full">
                            Trending
                        </span>

                    </div>

                    <div className="absolute bottom-0 p-7 text-white">

                        <span className="uppercase tracking-[3px] text-red-400 text-xs font-semibold">
                            Technology • AI
                        </span>

                        <h1 className="text-3xl md:text-5xl font-black leading-tight mt-4 max-w-3xl">
                            AI Mengubah Industri Digital Dunia
                        </h1>

                        <p className="text-gray-300 mt-4 text-base max-w-2xl leading-relaxed">
                            Artificial intelligence membawa perubahan besar terhadap startup,
                            ekonomi digital, dan teknologi modern.
                        </p>

                        <div className="flex gap-4 mt-7">

                            <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-semibold transition">
                                Baca Sekarang
                            </button>

                            <button className="bg-white/10 border border-white/20 backdrop-blur-md px-6 py-3 rounded-2xl font-medium">
                                Explore
                            </button>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-6">

                    <div className="relative h-[255px] rounded-[28px] overflow-hidden group">

                        <img
                            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1400"
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                        <div className="absolute bottom-0 p-5 text-white">

                            <span className="bg-green-500 text-xs px-3 py-1 rounded-full font-semibold">
                                Olahraga
                            </span>

                            <h2 className="text-xl font-bold mt-4 leading-snug">
                                Persija vs Persib Jadi Laga Terpanas Musim Ini
                            </h2>

                        </div>

                    </div>

                    <div className="bg-slate-900 rounded-[28px] p-6 text-white flex-1 relative overflow-hidden">

                        <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-500/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">

                            <span className="uppercase tracking-[3px] text-red-400 text-xs font-semibold">
                                Startup News
                            </span>

                            <h2 className="text-2xl font-black leading-snug mt-4">
                                Startup Indonesia Raih Pendanaan Besar
                            </h2>

                            <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                                Investor global mulai melirik perkembangan startup digital Indonesia.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-6">

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <h3 className="text-3xl font-black text-red-400">
                                        50M+
                                    </h3>

                                    <p className="text-gray-400 mt-1 text-xs">
                                        Pendanaan
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <h3 className="text-3xl font-black text-cyan-400">
                                        120+
                                    </h3>

                                    <p className="text-gray-400 mt-1 text-xs">
                                        Startup Baru
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* BREAKING */}
            <section>

                <div className="bg-red-500 rounded-[28px] px-6 py-5 flex items-center justify-between flex-wrap gap-5">

                    <div className="flex items-center gap-5">

                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white text-xl">
                            <FaFire />
                        </div>

                        <div>

                            <span className="uppercase tracking-[3px] text-white/80 text-[11px] font-semibold">
                                Breaking News
                            </span>

                            <h2 className="text-xl md:text-3xl font-black text-white mt-1">
                                AI dan Teknologi Jadi Fokus Dunia 2026
                            </h2>

                        </div>

                    </div>

                    <button className="bg-white text-red-500 px-6 py-3 rounded-2xl font-semibold hover:bg-slate-100 transition">
                        Baca
                    </button>

                </div>

            </section>

            {/* CATEGORY */}
            <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-[26px] p-5 text-white hover:-translate-y-1 transition">

                    <FaGlobeAsia className="text-2xl mb-4" />

                    <h3 className="text-xl font-bold">
                        Nasional
                    </h3>

                    <p className="text-sm text-white/80 mt-2">
                        Berita politik dan ekonomi terbaru.
                    </p>

                </div>

                <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-[26px] p-5 text-white hover:-translate-y-1 transition">

                    <FaMicrochip className="text-2xl mb-4" />

                    <h3 className="text-xl font-bold">
                        Teknologi
                    </h3>

                    <p className="text-sm text-white/80 mt-2">
                        Update AI dan startup digital dunia.
                    </p>

                </div>

                <div className="bg-gradient-to-br from-pink-500 to-fuchsia-700 rounded-[26px] p-5 text-white hover:-translate-y-1 transition">

                    <FaMusic className="text-2xl mb-4" />

                    <h3 className="text-xl font-bold">
                        Hiburan
                    </h3>

                    <p className="text-sm text-white/80 mt-2">
                        Musik, film, dan event populer.
                    </p>

                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-[26px] p-5 text-white hover:-translate-y-1 transition">

                    <FaFutbol className="text-2xl mb-4" />

                    <h3 className="text-xl font-bold">
                        Olahraga
                    </h3>

                    <p className="text-sm text-white/80 mt-2">
                        Liga sepak bola dan sport dunia.
                    </p>

                </div>

            </section>

            {/* NEWS */}
            <section className="pt-6">

                <div className="flex items-center justify-between flex-wrap gap-5 mb-8">

                    <div>

                        <span className="uppercase tracking-[3px] text-red-500 text-xs font-semibold">
                            Latest News
                        </span>

                        <h2 className="text-3xl font-black text-slate-900 mt-2">
                            Berita Terbaru
                        </h2>

                    </div>

                    <button className="bg-slate-900 hover:bg-red-500 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition">
                        Explore News
                    </button>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

                    {latestNews.map((news, index) => (
                        <NewsCard
                            key={index}
                            image={news.image}
                            title={news.title}
                            description={news.description}
                            date={news.date}
                            category={news.category}
                        />
                    ))}

                </div>

            </section>

        </motion.main>
    )
}

export default Home