import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
    FaFire,
    FaChevronRight,
    FaClock,
    FaBookmark,
    FaRegBookmark,
    FaEye,
    FaUserCircle,
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaTwitter,
    FaFacebook,
    FaComment,
    FaThumbsUp,
    FaReply,
    FaTrash,
    FaUser,
    FaPaperPlane,
    FaNewspaper,
    FaMapMarkerAlt,
    FaChartLine,
    FaGraduationCap,
    FaBuilding,
    FaLandmark,
    FaArrowRight
} from 'react-icons/fa'

function Nasional() {
    const [hoveredNews, setHoveredNews] = useState(null)
    const [bookmarked, setBookmarked] = useState([])
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
    const [selectedCategory, setSelectedCategory] = useState('semua')
    const [showCommentSection, setShowCommentSection] = useState(true)
    
    // State untuk komentar
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [userName, setUserName] = useState('')
    const [replyTo, setReplyTo] = useState(null)
    const [likedComments, setLikedComments] = useState([])

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        
        // Load comments dari localStorage
        const savedComments = localStorage.getItem('nasionalComments')
        if (savedComments) {
            setComments(JSON.parse(savedComments))
        } else {
            // Data komentar contoh
            const sampleComments = [
                {
                    id: 1,
                    name: 'Budi Santoso',
                    content: 'Program digitalisasi UMKM sangat membantu usaha kecil. Semoga berjalan lancar!',
                    date: '2026-05-10T08:30:00',
                    likes: 15,
                    replies: [
                        {
                            id: 101,
                            name: 'Admin',
                            content: 'Terima kasih atas dukungannya!',
                            date: '2026-05-10T09:15:00',
                            likes: 5
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Siti Rahayu',
                    content: 'Pertumbuhan ekonomi yang signifikan ini kabar baik untuk kita semua.',
                    date: '2026-05-10T10:20:00',
                    likes: 8,
                    replies: []
                },
                {
                    id: 3,
                    name: 'Andi Wijaya',
                    content: 'Pembangunan infrastruktur di Jakarta semakin maju. Kudos untuk pemerintah! 🎉',
                    date: '2026-05-10T14:45:00',
                    likes: 23,
                    replies: [
                        {
                            id: 102,
                            name: 'Rizki F',
                            content: 'Setuju! Transportasi makin baik',
                            date: '2026-05-10T15:30:00',
                            likes: 10
                        }
                    ]
                }
            ]
            setComments(sampleComments)
            localStorage.setItem('nasionalComments', JSON.stringify(sampleComments))
        }
        
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Simpan komentar ke localStorage
    useEffect(() => {
        if (comments.length > 0) {
            localStorage.setItem('nasionalComments', JSON.stringify(comments))
        }
    }, [comments])

    const toggleBookmark = (id) => {
        if (bookmarked.includes(id)) {
            setBookmarked(bookmarked.filter(item => item !== id))
        } else {
            setBookmarked([...bookmarked, id])
        }
    }

    // Fungsi untuk menambah komentar
    const addComment = () => {
        if (!newComment.trim()) return
        if (!userName.trim()) {
            alert('Silakan masukkan nama Anda')
            return
        }

        const comment = {
            id: Date.now(),
            name: userName,
            content: newComment,
            date: new Date().toISOString(),
            likes: 0,
            replies: []
        }

        if (replyTo) {
            // Reply ke komentar
            setComments(comments.map(comment => {
                if (comment.id === replyTo.commentId) {
                    const newReply = {
                        id: Date.now(),
                        name: userName,
                        content: newComment,
                        date: new Date().toISOString(),
                        likes: 0
                    }
                    return {
                        ...comment,
                        replies: [...comment.replies, newReply]
                    }
                }
                return comment
            }))
            setReplyTo(null)
        } else {
            // Komentar baru
            setComments([comment, ...comments])
        }
        
        setNewComment('')
    }

    // Fungsi like komentar
    const likeComment = (commentId, isReply = false, parentId = null) => {
        const likeKey = `${commentId}-${isReply ? 'reply' : 'comment'}`
        
        if (likedComments.includes(likeKey)) {
            setLikedComments(likedComments.filter(id => id !== likeKey))
            if (isReply && parentId) {
                setComments(comments.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply => 
                                reply.id === commentId 
                                    ? {...reply, likes: reply.likes - 1}
                                    : reply
                            )
                        }
                    }
                    return comment
                }))
            } else {
                setComments(comments.map(comment => 
                    comment.id === commentId 
                        ? {...comment, likes: comment.likes - 1}
                        : comment
                ))
            }
        } else {
            setLikedComments([...likedComments, likeKey])
            if (isReply && parentId) {
                setComments(comments.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply => 
                                reply.id === commentId 
                                    ? {...reply, likes: reply.likes + 1}
                                    : reply
                            )
                        }
                    }
                    return comment
                }))
            } else {
                setComments(comments.map(comment => 
                    comment.id === commentId 
                        ? {...comment, likes: comment.likes + 1}
                        : comment
                ))
            }
        }
    }

    // Fungsi hapus komentar
    const deleteComment = (commentId, isReply = false, parentId = null) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
            if (isReply && parentId) {
                setComments(comments.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: comment.replies.filter(reply => reply.id !== commentId)
                        }
                    }
                    return comment
                }))
            } else {
                setComments(comments.filter(comment => comment.id !== commentId))
            }
        }
    }

    // Format tanggal
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays === 1) return 'Kemarin'
        if (diffDays < 7) return `${diffDays} hari yang lalu`
        
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const nasionalNews = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200',
            title: 'Pemerintah Resmikan Program Digitalisasi Nasional untuk UMKM',
            description: 'Program baru ini membantu pelaku usaha kecil beradaptasi dengan ekonomi digital modern. Pemerintah menyediakan pelatihan dan pendampingan gratis.',
            date: '10 Mei 2026',
            category: 'Ekonomi',
            views: '15.2K',
            author: 'Biro Ekonomi'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200',
            title: 'Ekonomi Indonesia Diprediksi Tumbuh Signifikan Tahun 2026',
            description: 'Pertumbuhan sektor digital dan investasi asing menjadi faktor utama peningkatan ekonomi nasional. Target pertumbuhan 5.5% diprediksi tercapai.',
            date: '9 Mei 2026',
            category: 'Ekonomi',
            views: '12.8K',
            author: 'Biro Keuangan'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200',
            title: 'Pembangunan Infrastruktur Baru Diresmikan di Jakarta',
            description: 'Pemerintah mempercepat pembangunan transportasi modern untuk masyarakat. LRT dan MRT diperluas jangkauannya.',
            date: '8 Mei 2026',
            category: 'Infrastruktur',
            views: '9.5K',
            author: 'Biro Infrastruktur'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200',
            title: 'Konferensi Nasional Bahas Masa Depan Teknologi Indonesia',
            description: 'Para ahli dan pemimpin industri membahas transformasi digital nasional menuju Indonesia 4.0.',
            date: '7 Mei 2026',
            category: 'Teknologi',
            views: '11.3K',
            author: 'Biro Teknologi'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200',
            title: 'Pendidikan Digital Mulai Diterapkan di Berbagai Daerah',
            description: 'Sekolah dan universitas mulai mengintegrasikan sistem pembelajaran digital berbasis AI.',
            date: '6 Mei 2026',
            category: 'Pendidikan',
            views: '8.7K',
            author: 'Biro Pendidikan'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
            title: 'Pusat Bisnis Baru Dibangun untuk Mendukung Startup Lokal',
            description: 'Indonesia terus memperkuat ekosistem startup dan teknologi nasional dengan pusat inovasi baru.',
            date: '5 Mei 2026',
            category: 'Bisnis',
            views: '10.2K',
            author: 'Biro Bisnis'
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200',
            title: 'Reformasi Birokrasi Digital Diluncurkan Pemerintah',
            description: 'Pelayanan publik berbasis digital semakin mudah dan transparan dengan sistem terintegrasi.',
            date: '4 Mei 2026',
            category: 'Pemerintahan',
            views: '14.1K',
            author: 'Biro Pemerintahan'
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200',
            title: 'Investasi Asing Meningkat Drastis di Semester Pertama',
            description: 'Iklim investasi yang kondusif menarik banyak investor asing ke Indonesia.',
            date: '3 Mei 2026',
            category: 'Ekonomi',
            views: '13.5K',
            author: 'Biro Ekonomi'
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200',
            title: 'Program Makan Bergizi Gratis Diluncurkan untuk Pelajar',
            description: 'Program pemerintah untuk meningkatkan gizi anak sekolah di seluruh Indonesia.',
            date: '2 Mei 2026',
            category: 'Sosial',
            views: '16.8K',
            author: 'Biro Sosial'
        }
    ]

    const trendingNews = [
        {
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400',
            title: 'Program Digitalisasi UMKM Sukses Libatkan 1 Juta Pelaku Usaha',
            category: 'Ekonomi',
            views: '25.2K'
        },
        {
            image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=400',
            title: 'Target Pertumbuhan Ekonomi 2026 Meningkat',
            category: 'Ekonomi',
            views: '18.7K'
        },
        {
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400',
            title: 'Pembangunan Infrastruktur Tersebar di 10 Kota',
            category: 'Infrastruktur',
            views: '14.3K'
        }
    ]

    const popularNews = [
        'Revolusi Digital Mengubah Wajah Pendidikan Indonesia',
        '10 Kota dengan Pertumbuhan Ekonomi Tercepat 2026',
        'Startup Lokal Tembus Pasar Global, Ini Kisah Suksesnya',
        'Transformasi Birokrasi Digital: Lebih Cepat dan Transparan',
        'Program BEASISWA untuk 10.000 Mahasiswa Diluncurkan'
    ]

    const categories = [
        { name: 'Semua', icon: FaNewspaper, count: 9 },
        { name: 'Ekonomi', icon: FaChartLine, count: 3 },
        { name: 'Pendidikan', icon: FaGraduationCap, count: 1 },
        { name: 'Infrastruktur', icon: FaBuilding, count: 1 },
        { name: 'Pemerintahan', icon: FaLandmark, count: 1 },
        { name: 'Sosial', icon: FaUser, count: 1 }
    ]

    const socialMedia = [
        { name: 'Instagram', icon: FaInstagram, color: 'hover:text-pink-600', url: '#' },
        { name: 'TikTok', icon: FaTiktok, color: 'hover:text-black', url: '#' },
        { name: 'YouTube', icon: FaYoutube, color: 'hover:text-red-600', url: '#' },
        { name: 'Twitter', icon: FaTwitter, color: 'hover:text-blue-400', url: '#' },
        { name: 'Facebook', icon: FaFacebook, color: 'hover:text-blue-600', url: '#' }
    ]

    const filteredNews = selectedCategory === 'semua' 
        ? nasionalNews 
        : nasionalNews.filter(news => news.category.toLowerCase() === selectedCategory.toLowerCase())

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    }

    return (
        <motion.main
            className="w-full min-h-screen px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 bg-gradient-to-br from-gray-50 to-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* HEADER SECTION */}
            <motion.div
                className="mb-8 sm:mb-10 md:mb-12 lg:mb-14"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-1 h-6 sm:h-8 bg-red-500 rounded-full"></div>
                    <span className="text-red-500 uppercase tracking-[2px] sm:tracking-[4px] text-[10px] sm:text-xs md:text-sm font-semibold">
                        Indonesia Update
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-2 sm:mt-3 md:mt-4">
                    Berita <span className="text-red-500">Nasional</span>
                </h1>

                <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 md:mt-5 max-w-3xl leading-relaxed">
                    Ikuti perkembangan terbaru seputar ekonomi, pemerintahan, pendidikan, 
                    dan pembangunan nasional Indonesia.
                </p>
            </motion.div>

            {/* CATEGORY FILTER */}
            <motion.div
                className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {categories.map((category, idx) => (
                    <motion.button
                        key={idx}
                        onClick={() => setSelectedCategory(category.name.toLowerCase())}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                            selectedCategory === category.name.toLowerCase()
                                ? 'bg-red-500 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <category.icon className="text-xs sm:text-sm" />
                        {category.name}
                        <span className={`ml-1 text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full ${
                            selectedCategory === category.name.toLowerCase()
                                ? 'bg-white text-red-500'
                                : 'bg-gray-200 text-gray-600'
                        }`}>
                            {category.count}
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            {/* TOP NEWS SECTION */}
            <motion.div
                className="flex flex-col lg:grid lg:grid-cols-[1.7fr_420px] gap-5 sm:gap-6 md:gap-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                {/* LEFT COLUMN - HEADLINE */}
                <motion.div className="group cursor-pointer" variants={itemVariants}>
                    <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
                        <img
                            src={filteredNews[0]?.image}
                            alt={filteredNews[0]?.title}
                            className="w-full h-[250px] xs:h-[300px] sm:h-[380px] md:h-[450px] lg:h-[500px] object-cover group-hover:scale-105 transition duration-700"
                        />
                    </div>

                    <div className="mt-4 sm:mt-5 md:mt-6">
                        <div className="flex items-center gap-2 flex-wrap mb-3 sm:mb-4">
                            <span className="bg-red-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold">
                                Headline Nasional
                            </span>
                            <span className="text-gray-400 text-[10px] sm:text-xs flex items-center gap-1">
                                <FaEye className="text-[8px] sm:text-[10px]" />
                                {filteredNews[0]?.views} views
                            </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 leading-tight mt-2 sm:mt-3">
                            {filteredNews[0]?.title}
                        </h2>

                        <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 md:mt-5">
                            {filteredNews[0]?.description}
                        </p>

                        <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold">
                                N
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                                    {filteredNews[0]?.author || 'Redaksi News'}
                                </h4>
                                <p className="text-[10px] sm:text-xs text-gray-500">
                                    Dipublikasikan • {filteredNews[0]?.date}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN - SIDE NEWS */}
                <motion.div className="space-y-4 sm:space-y-5" variants={itemVariants}>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white">
                        <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                            <FaFire className="text-red-500" />
                            Berita Populer Hari Ini
                        </h3>
                    </div>

                    {filteredNews.slice(1, 4).map((news, index) => (
                        <motion.div
                            key={news.id}
                            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                            whileHover={{ x: 5 }}
                        >
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-xl"
                            />
                            <div className="flex-1 min-w-0">
                                <span className="text-red-500 text-[10px] sm:text-xs font-semibold">
                                    {news.category}
                                </span>
                                <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 leading-snug mt-1 line-clamp-2 group-hover:text-red-500 transition">
                                    {news.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <FaClock className="text-gray-400 text-[8px] sm:text-[10px]" />
                                    <p className="text-[10px] sm:text-xs text-gray-400">
                                        {news.date}
                                    </p>
                                    <FaEye className="text-gray-400 text-[8px] sm:text-[10px] ml-1" />
                                    <p className="text-[10px] sm:text-xs text-gray-400">
                                        {news.views}
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => toggleBookmark(news.id)}
                                className="text-gray-300 hover:text-red-500 transition flex-shrink-0"
                            >
                                {bookmarked.includes(news.id) ? <FaBookmark className="text-red-500 text-xs sm:text-sm" /> : <FaRegBookmark className="text-xs sm:text-sm" />}
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* MAIN CONTENT WITH GRID AND SIDEBAR */}
            <div className="flex flex-col lg:grid lg:grid-cols-[1.7fr_360px] gap-5 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
                {/* LEFT COLUMN - GRID NEWS */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 sm:space-y-10"
                >
                    <div>
                        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1 h-5 sm:h-6 md:h-7 bg-red-500 rounded-full"></span>
                                Berita Terkini
                            </h2>
                            <span className="text-gray-400 text-xs sm:text-sm">
                                {filteredNews.length} Artikel
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                            {filteredNews.map((news, index) => (
                                <motion.div
                                    key={news.id}
                                    className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="relative overflow-hidden h-48 sm:h-52 md:h-56">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                                            <span className="bg-red-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-semibold">
                                                {news.category}
                                            </span>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            onClick={() => toggleBookmark(news.id)}
                                            className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 p-1.5 sm:p-2 rounded-full hover:bg-red-500 hover:text-white transition"
                                        >
                                            {bookmarked.includes(news.id) ? <FaBookmark className="text-red-500 text-xs sm:text-sm" /> : <FaRegBookmark className="text-gray-600 text-xs sm:text-sm" />}
                                        </motion.button>
                                    </div>
                                    <div className="p-3 sm:p-4 md:p-5">
                                        <h3 className="font-bold text-gray-900 leading-snug group-hover:text-red-500 transition line-clamp-2 mb-2 text-sm sm:text-base md:text-lg">
                                            {news.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-3">
                                            {news.description}
                                        </p>
                                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <FaClock className="text-[8px] sm:text-[10px]" />
                                                <span>{news.date}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5 sm:gap-1">
                                                <FaEye className="text-[8px] sm:text-[10px]" />
                                                <span>{news.views} views</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* COMMENT SECTION */}
                    <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                            {/* Comment Header */}
                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <FaComment className="text-red-500 text-lg sm:text-xl" />
                                    <h3 className="text-white font-bold text-base sm:text-lg">
                                        Diskusi Nasional ({comments.length})
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setShowCommentSection(!showCommentSection)}
                                    className="text-gray-300 hover:text-white transition text-xs sm:text-sm"
                                >
                                    {showCommentSection ? 'Sembunyikan' : 'Tampilkan'}
                                </button>
                            </div>

                            {showCommentSection && (
                                <div className="p-4 sm:p-6">
                                    {/* Form Komentar */}
                                    <div className="mb-6 sm:mb-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FaUser className="text-gray-400" />
                                            <h4 className="font-semibold text-gray-700 text-sm sm:text-base">
                                                Tinggalkan Komentar
                                            </h4>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Nama Anda *"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                                            />
                                            
                                            <textarea
                                                placeholder={replyTo ? `Membalas ${replyTo.name}...` : "Tulis komentar Anda tentang berita nasional..."}
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                rows="3"
                                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm sm:text-base"
                                            />
                                            
                                            {replyTo && (
                                                <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg">
                                                    <span className="text-xs sm:text-sm text-gray-600">
                                                        Membalas: <span className="font-semibold">{replyTo.name}</span>
                                                    </span>
                                                    <button
                                                        onClick={() => setReplyTo(null)}
                                                        className="text-red-500 hover:text-red-600 text-xs sm:text-sm"
                                                    >
                                                        Batal
                                                    </button>
                                                </div>
                                            )}
                                            
                                            <div className="flex justify-end">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={addComment}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition flex items-center gap-2 text-sm sm:text-base"
                                                >
                                                    <FaPaperPlane className="text-xs sm:text-sm" />
                                                    Kirim Komentar
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Daftar Komentar */}
                                    <div className="space-y-5 sm:space-y-6">
                                        {comments.length === 0 ? (
                                            <div className="text-center py-8 sm:py-12">
                                                <FaComment className="text-gray-300 text-3xl sm:text-4xl mx-auto mb-3" />
                                                <p className="text-gray-500 text-sm sm:text-base">Belum ada komentar. Jadilah yang pertama!</p>
                                            </div>
                                        ) : (
                                            comments.map((comment) => (
                                                <div key={comment.id} className="border-b border-gray-100 pb-4 sm:pb-5 last:border-0">
                                                    <div className="flex gap-3 sm:gap-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                                                                {comment.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                                                                    {comment.name}
                                                                </span>
                                                                <span className="text-[10px] sm:text-xs text-gray-400">
                                                                    {formatDate(comment.date)}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-700 text-sm sm:text-base mb-2 sm:mb-3">
                                                                {comment.content}
                                                            </p>
                                                            <div className="flex items-center gap-3 sm:gap-4">
                                                                <button
                                                                    onClick={() => likeComment(comment.id, false)}
                                                                    className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition text-xs sm:text-sm"
                                                                >
                                                                    <FaThumbsUp className="text-[10px] sm:text-xs" />
                                                                    <span>{comment.likes}</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => setReplyTo({ commentId: comment.id, name: comment.name })}
                                                                    className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition text-xs sm:text-sm"
                                                                >
                                                                    <FaReply className="text-[10px] sm:text-xs" />
                                                                    <span>Balas</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteComment(comment.id)}
                                                                    className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition text-xs sm:text-sm"
                                                                >
                                                                    <FaTrash className="text-[10px] sm:text-xs" />
                                                                    <span>Hapus</span>
                                                                </button>
                                                            </div>
                                                            
                                                            {comment.replies && comment.replies.length > 0 && (
                                                                <div className="mt-3 sm:mt-4 pl-3 sm:pl-6 border-l-2 border-gray-200 space-y-3 sm:space-y-4">
                                                                    {comment.replies.map((reply) => (
                                                                        <div key={reply.id} className="flex gap-3">
                                                                            <div className="flex-shrink-0">
                                                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">
                                                                                    {reply.name.charAt(0).toUpperCase()}
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                                                    <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                                                                                        {reply.name}
                                                                                    </span>
                                                                                    <span className="text-[10px] sm:text-xs text-gray-400">
                                                                                        {formatDate(reply.date)}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="text-gray-700 text-xs sm:text-sm mb-2">
                                                                                    {reply.content}
                                                                                </p>
                                                                                <div className="flex items-center gap-3">
                                                                                    <button
                                                                                        onClick={() => likeComment(reply.id, true, comment.id)}
                                                                                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition text-[10px] sm:text-xs"
                                                                                    >
                                                                                        <FaThumbsUp className="text-[8px] sm:text-[10px]" />
                                                                                        <span>{reply.likes}</span>
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => deleteComment(reply.id, true, comment.id)}
                                                                                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition text-[10px] sm:text-xs"
                                                                                    >
                                                                                        <FaTrash className="text-[8px] sm:text-[10px]" />
                                                                                        <span>Hapus</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <motion.div
                    className="space-y-5 sm:space-y-6 lg:sticky lg:top-24 lg:self-start"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* TRENDING SECTION */}
                    <motion.div
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FaFire className="text-red-500" />
                                Trending Nasional
                            </h2>
                            <span className="text-[10px] sm:text-xs text-gray-400">🔥 Hot</span>
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            {trendingNews.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex gap-3 sm:gap-4 group cursor-pointer"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl object-cover group-hover:scale-105 transition shadow-md"
                                        />
                                        <div className="absolute -top-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-red-500 text-[10px] sm:text-xs font-semibold uppercase">
                                            {item.category}
                                        </span>
                                        <h3 className="font-semibold text-gray-800 leading-snug mt-0.5 sm:mt-1 group-hover:text-red-500 transition text-xs sm:text-sm line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                                            <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-0.5 sm:gap-1">
                                                <FaEye className="text-[8px] sm:text-[10px]" />
                                                {item.views} views
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* POPULAR STORIES */}
                    <motion.div
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                Populer Minggu Ini
                            </h2>
                            <motion.span
                                className="bg-red-50 text-red-500 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold"
                                whileHover={{ scale: 1.05 }}
                            >
                                Most Read
                            </motion.span>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            {popularNews.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex gap-3 sm:gap-4 group cursor-pointer items-start"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-200 group-hover:text-red-500 transition flex-shrink-0">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-800 font-medium leading-snug group-hover:text-red-500 transition text-xs sm:text-sm line-clamp-2">
                                            {item}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                                            <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-0.5 sm:gap-1">
                                                <FaEye className="text-[8px] sm:text-[10px]" />
                                                8.5K views
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* SOCIAL MEDIA */}
                    <motion.div
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition"
                        variants={itemVariants}
                    >
                        <div className="text-center mb-3 sm:mb-4">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Ikuti Kami</h2>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Dapatkan update berita terbaru</p>
                        </div>
                        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                            {socialMedia.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    className={`text-gray-500 ${social.color} transition-all duration-300`}
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <social.icon className="text-2xl sm:text-3xl" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* NEWSLETTER */}
                    <motion.div
                        className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-white shadow-lg"
                        variants={itemVariants}
                    >
                        <h3 className="font-bold text-lg sm:text-xl mb-2">Newsletter</h3>
                        <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
                            Dapatkan berita nasional terbaru langsung ke email Anda
                        </p>
                        <input
                            type="email"
                            placeholder="Email Anda"
                            className="w-full px-3 sm:px-4 py-2 rounded-lg text-gray-800 text-sm sm:text-base mb-2"
                        />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white text-red-600 font-semibold py-2 rounded-lg text-sm sm:text-base hover:bg-gray-100 transition"
                        >
                            Berlangganan
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.main>
    )
}

export default Nasional