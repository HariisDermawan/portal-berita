import { motion } from 'framer-motion'
import {
    FaFire,
    FaChevronRight,
    FaClock,
    FaBookmark,
    FaRegBookmark,
    FaEye,
    FaUserCircle,
    FaArrowRight,
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaTwitter,
    FaFacebook,
    FaFutbol,
    FaTrophy,
    FaMedal,
    FaBars,
    FaTimes,
    FaComment,
    FaThumbsUp,
    FaReply,
    FaTrash,
    FaUser,
    FaPaperPlane
} from 'react-icons/fa'
import { useState, useEffect } from 'react'

function Home() {
    const [hoveredNews, setHoveredNews] = useState(null)
    const [bookmarked, setBookmarked] = useState([])
    const [activeLeague, setActiveLeague] = useState('liga1')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
    
    // State untuk komentar
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [userName, setUserName] = useState('')
    const [replyTo, setReplyTo] = useState(null)
    const [likedComments, setLikedComments] = useState([])
    const [showCommentSection, setShowCommentSection] = useState(true)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        
        // Load comments dari localStorage
        const savedComments = localStorage.getItem('newsComments')
        if (savedComments) {
            setComments(JSON.parse(savedComments))
        } else {
            // Data komentar contoh
            const sampleComments = [
                {
                    id: 1,
                    name: 'Budi Santoso',
                    content: 'Berita yang sangat informatif! Terima kasih atas informasinya.',
                    date: '2026-05-10T08:30:00',
                    likes: 12,
                    replies: [
                        {
                            id: 101,
                            name: 'Admin',
                            content: 'Terima kasih atas apresiasinya!',
                            date: '2026-05-10T09:15:00',
                            likes: 5
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Siti Rahayu',
                    content: 'Menarik sekali perkembangan AI di tahun 2026 ini. Semoga Indonesia bisa mengikutinya.',
                    date: '2026-05-10T10:20:00',
                    likes: 8,
                    replies: []
                },
                {
                    id: 3,
                    name: 'Andi Wijaya',
                    content: 'Liga 1 Indonesia makin kompetitif! Persib juara! 🔥',
                    date: '2026-05-10T14:45:00',
                    likes: 23,
                    replies: [
                        {
                            id: 102,
                            name: 'Rizki F',
                            content: 'Bobotoh setuju! 💙',
                            date: '2026-05-10T15:30:00',
                            likes: 10
                        }
                    ]
                }
            ]
            setComments(sampleComments)
            localStorage.setItem('newsComments', JSON.stringify(sampleComments))
        }
        
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Simpan komentar ke localStorage
    useEffect(() => {
        if (comments.length > 0) {
            localStorage.setItem('newsComments', JSON.stringify(comments))
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
            // Unlike
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
            // Like
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

    const sideNews = [
        {
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200',
            title: 'Every Product Used to Create Modern Fashion Looks',
            category: 'Fashion',
            views: '2.5K'
        },
        {
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200',
            title: 'Persija dan Persib Siap Bertemu di Final Liga 1',
            category: 'Sports',
            views: '3.8K'
        },
        {
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200',
            title: 'Festival Musik Asia Jadi Sorotan Dunia Tahun Ini',
            category: 'Music',
            views: '1.9K'
        }
    ]

    const featuredStories = [
        {
            image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200',
            title: 'Startup Indonesia Mulai Kuasai Pasar Digital Asia Tenggara',
        },
        {
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200',
            title: 'Pemerintah Fokus Pada Percepatan Ekonomi Digital Nasional',
        },
        {
            image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200',
            title: 'Artificial Intelligence Jadi Teknologi Paling Berkembang 2026',
        }
    ]

    const popularNews = [
        'Enhance Your Brand Potential With Great Advertising',
        'Google Ads Menjadi Strategi Marketing Paling Efektif',
        'Freedom Design Modern Mulai Digunakan Startup Besar',
        'Simple Ways To Save Money While Buying New Computer'
    ]

    const newsCards = [
        {
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800',
            title: 'Teknologi AI Semakin Canggih di Tahun 2026',
            category: 'Technology',
            date: '10 MAY 2026',
            views: '3.2K'
        },
        {
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800',
            title: 'Pertumbuhan Ekonomi Digital Tembus 200%',
            category: 'Economy',
            date: '09 MAY 2026',
            views: '2.8K'
        },
        {
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
            title: 'Startup Lokal Tembus Pasar Global',
            category: 'Business',
            date: '08 MAY 2026',
            views: '4.1K'
        },
        {
            image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=800',
            title: 'Inovasi Terbaru Dunia Pendidikan Digital',
            category: 'Education',
            date: '07 MAY 2026',
            views: '1.9K'
        }
    ]

    const liga1Standings = [
        { position: 1, team: 'Persib Bandung', played: 34, won: 22, draw: 8, lost: 4, goalsFor: 68, goalsAgainst: 28, points: 74 },
        { position: 2, team: 'Borneo FC Samarinda', played: 34, won: 21, draw: 7, lost: 6, goalsFor: 62, goalsAgainst: 31, points: 70 },
        { position: 3, team: 'PSM Makassar', played: 34, won: 19, draw: 9, lost: 6, goalsFor: 58, goalsAgainst: 32, points: 66 },
        { position: 4, team: 'Persija Jakarta', played: 34, won: 18, draw: 10, lost: 6, goalsFor: 55, goalsAgainst: 33, points: 64 },
        { position: 5, team: 'Bali United', played: 34, won: 17, draw: 8, lost: 9, goalsFor: 52, goalsAgainst: 38, points: 59 },
        { position: 6, team: 'Madura United', played: 34, won: 15, draw: 9, lost: 10, goalsFor: 48, goalsAgainst: 42, points: 54 },
        { position: 7, team: 'Dewa United', played: 34, won: 14, draw: 10, lost: 10, goalsFor: 46, goalsAgainst: 41, points: 52 },
        { position: 8, team: 'PSIS Semarang', played: 34, won: 13, draw: 11, lost: 10, goalsFor: 44, goalsAgainst: 40, points: 50 },
        { position: 9, team: 'Persis Solo', played: 34, won: 12, draw: 12, lost: 10, goalsFor: 45, goalsAgainst: 43, points: 48 },
        { position: 10, team: 'Barito Putera', played: 34, won: 11, draw: 11, lost: 12, goalsFor: 42, goalsAgainst: 46, points: 44 },
        { position: 11, team: 'Persik Kediri', played: 34, won: 10, draw: 12, lost: 12, goalsFor: 40, goalsAgainst: 44, points: 42 },
        { position: 12, team: 'Arema FC', played: 34, won: 10, draw: 10, lost: 14, goalsFor: 38, goalsAgainst: 45, points: 40 },
        { position: 13, team: 'PSS Sleman', played: 34, won: 9, draw: 11, lost: 14, goalsFor: 36, goalsAgainst: 47, points: 38 },
        { position: 14, team: 'Persebaya Surabaya', played: 34, won: 8, draw: 12, lost: 14, goalsFor: 35, goalsAgainst: 44, points: 36 },
        { position: 15, team: 'RANS Nusantara', played: 34, won: 8, draw: 10, lost: 16, goalsFor: 34, goalsAgainst: 52, points: 34 },
        { position: 16, team: 'Bhayangkara FC', played: 34, won: 7, draw: 9, lost: 18, goalsFor: 32, goalsAgainst: 55, points: 30 },
        { position: 17, team: 'Persita Tangerang', played: 34, won: 6, draw: 8, lost: 20, goalsFor: 30, goalsAgainst: 60, points: 26 },
        { position: 18, team: 'Persikabo 1973', played: 34, won: 4, draw: 7, lost: 23, goalsFor: 25, goalsAgainst: 71, points: 19 }
    ]

    const premierLeagueStandings = [
        { position: 1, team: 'Manchester City', played: 38, won: 28, draw: 7, lost: 3, goalsFor: 96, goalsAgainst: 34, points: 91 },
        { position: 2, team: 'Arsenal', played: 38, won: 27, draw: 6, lost: 5, goalsFor: 91, goalsAgainst: 29, points: 87 },
        { position: 3, team: 'Liverpool', played: 38, won: 24, draw: 10, lost: 4, goalsFor: 86, goalsAgainst: 41, points: 82 },
        { position: 4, team: 'Aston Villa', played: 38, won: 20, draw: 8, lost: 10, goalsFor: 76, goalsAgainst: 61, points: 68 },
        { position: 5, team: 'Tottenham Hotspur', played: 38, won: 19, draw: 7, lost: 12, goalsFor: 74, goalsAgainst: 61, points: 64 },
        { position: 6, team: 'Chelsea', played: 38, won: 18, draw: 9, lost: 11, goalsFor: 77, goalsAgainst: 63, points: 63 },
        { position: 7, team: 'Newcastle United', played: 38, won: 17, draw: 8, lost: 13, goalsFor: 85, goalsAgainst: 62, points: 59 },
        { position: 8, team: 'Manchester United', played: 38, won: 16, draw: 10, lost: 12, goalsFor: 57, goalsAgainst: 58, points: 58 },
        { position: 9, team: 'West Ham United', played: 38, won: 14, draw: 10, lost: 14, goalsFor: 60, goalsAgainst: 74, points: 52 },
        { position: 10, team: 'Crystal Palace', played: 38, won: 13, draw: 10, lost: 15, goalsFor: 57, goalsAgainst: 58, points: 49 },
        { position: 11, team: 'Brighton', played: 38, won: 12, draw: 12, lost: 14, goalsFor: 55, goalsAgainst: 62, points: 48 },
        { position: 12, team: 'Bournemouth', played: 38, won: 13, draw: 9, lost: 16, goalsFor: 54, goalsAgainst: 67, points: 48 },
        { position: 13, team: 'Fulham', played: 38, won: 13, draw: 8, lost: 17, goalsFor: 55, goalsAgainst: 61, points: 47 },
        { position: 14, team: 'Wolves', played: 38, won: 13, draw: 7, lost: 18, goalsFor: 50, goalsAgainst: 65, points: 46 },
        { position: 15, team: 'Everton', played: 38, won: 13, draw: 9, lost: 16, goalsFor: 40, goalsAgainst: 51, points: 48 },
        { position: 16, team: 'Brentford', played: 38, won: 10, draw: 9, lost: 19, goalsFor: 56, goalsAgainst: 65, points: 39 },
        { position: 17, team: 'Nottingham Forest', played: 38, won: 9, draw: 9, lost: 20, goalsFor: 49, goalsAgainst: 67, points: 36 },
        { position: 18, team: 'Luton Town', played: 38, won: 6, draw: 8, lost: 24, goalsFor: 52, goalsAgainst: 85, points: 26 },
        { position: 19, team: 'Burnley', played: 38, won: 5, draw: 9, lost: 24, goalsFor: 41, goalsAgainst: 78, points: 24 },
        { position: 20, team: 'Sheffield United', played: 38, won: 3, draw: 7, lost: 28, goalsFor: 35, goalsAgainst: 104, points: 16 }
    ]

    const footballNews = [
        {
            image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c86?q=80&w=800',
            title: 'Persib vs Persija: Drama 5 Gol di Babak Final',
            category: 'Liga 1',
            date: '10 MAY 2026',
            views: '15.2K'
        },
        {
            image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800',
            title: 'Manchester City Raih Gelar Premier League ke-4 Beruntun',
            category: 'Liga Inggris',
            date: '09 MAY 2026',
            views: '22.5K'
        },
        {
            image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800',
            title: 'Pelatih Anyar Timnas Indonesia Diumumkan Pekan Ini',
            category: 'Timnas',
            date: '08 MAY 2026',
            views: '18.7K'
        },
        {
            image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
            title: 'Real Madrid Siap Rekrut Bintang Muda Brasil',
            category: 'Liga Spanyol',
            date: '07 MAY 2026',
            views: '12.3K'
        }
    ]

    const socialMedia = [
        { name: 'Instagram', icon: FaInstagram, color: 'hover:text-pink-600', url: '#' },
        { name: 'TikTok', icon: FaTiktok, color: 'hover:text-black', url: '#' },
        { name: 'YouTube', icon: FaYoutube, color: 'hover:text-red-600', url: '#' },
        { name: 'Twitter', icon: FaTwitter, color: 'hover:text-blue-400', url: '#' },
        { name: 'Facebook', icon: FaFacebook, color: 'hover:text-blue-600', url: '#' }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    const topBarCategories = ['Trending', 'General', 'Latest']

    return (
        <motion.main
            className="w-full min-h-screen px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 bg-gradient-to-br from-gray-50 to-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* TOP BAR */}
            <motion.div
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg px-3 sm:px-4 md:px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 border border-gray-100"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <motion.span
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full shadow-md whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        animate={{
                            scale: [1, 1.05, 1],
                            transition: { repeat: Infinity, duration: 2, repeatDelay: 3 }
                        }}
                    >
                        🔴 BREAKING NEWS
                    </motion.span>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium hover:text-red-500 transition cursor-pointer truncate flex-1">
                        Why Millions Need to Save Face as Much as Recovery Did
                    </p>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
                    {topBarCategories.map((item, idx) => (
                        <motion.span
                            key={idx}
                            className={`cursor-pointer transition-all ${idx === 0 ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                            whileHover={{ y: -2 }}
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-gray-600 hover:text-red-500 transition p-2 absolute top-4 right-4 sm:right-6"
                >
                    {isMobileMenuOpen ? <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaBars className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
            </motion.div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden mb-4 p-3 sm:p-4 bg-white rounded-xl shadow-lg"
                >
                    <div className="flex flex-col gap-2">
                        {topBarCategories.map((item, idx) => (
                            <span
                                key={idx}
                                className={`cursor-pointer py-2 px-3 rounded-lg transition text-sm ${idx === 0 ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* HERO SECTION */}
            <section className="flex flex-col lg:grid lg:grid-cols-[1.7fr_360px] gap-5 sm:gap-6">
                {/* LEFT COLUMN */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6 sm:space-y-8"
                >
                    {/* MAIN HERO */}
                    <motion.div
                        className="relative h-[250px] xs:h-[300px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-[520px] rounded-xl sm:rounded-2xl overflow-hidden group shadow-xl"
                        variants={itemVariants}
                        whileHover={{ scale: windowWidth > 768 ? 1.02 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1800"
                            alt="President Obama"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                        <div className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5 z-10">
                            <motion.span
                                className="bg-red-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-bold shadow-lg"
                                whileHover={{ scale: 1.05 }}
                            >
                                POLITICS
                            </motion.span>
                        </div>

                        <div className="absolute bottom-0 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 text-white z-10 w-full">
                            <motion.h1
                                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold leading-tight max-w-3xl"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                President Obama Holds His Final Press Conference
                            </motion.h1>
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mt-1.5 sm:mt-2 md:mt-3 lg:mt-4 text-[10px] sm:text-xs md:text-sm text-gray-300">
                                <span className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                                    <FaUserCircle className="text-xs sm:text-sm md:text-lg" />
                                    BY ADMIN
                                </span>
                                <span>•</span>
                                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                                    <FaClock className="text-[8px] sm:text-[10px] md:text-xs" />
                                    <span>10 MAY 2026</span>
                                </div>
                                <span>•</span>
                                <span className="flex items-center gap-0.5 sm:gap-1">
                                    <FaEye className="text-[8px] sm:text-[10px] md:text-xs" />
                                    5.2K views
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* THUMBNAILS */}
                    <motion.div
                        className="grid grid-cols-4 xs:grid-cols-5 gap-2 sm:gap-3"
                        variants={itemVariants}
                    >
                        {featuredStories.map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative rounded-lg sm:rounded-xl overflow-hidden aspect-square cursor-pointer group shadow-md"
                                whileHover={{ y: -3, scale: 1.03 }}
                                onHoverStart={() => setHoveredNews(index)}
                                onHoverEnd={() => setHoveredNews(null)}
                            >
                                <img
                                    src={item.image}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                                {hoveredNews === index && windowWidth > 640 && (
                                    <motion.div
                                        className="absolute inset-0 bg-black/50 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <FaArrowRight className="text-white text-sm sm:text-lg md:text-xl" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                        <motion.div
                            className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-gray-700 text-xs sm:text-sm shadow-md cursor-pointer hover:shadow-lg transition aspect-square"
                            whileHover={{ scale: 1.03 }}
                        >
                            +12
                        </motion.div>
                    </motion.div>

                    {/* FEATURED STORIES SECTION */}
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1 h-5 sm:h-6 bg-red-500 rounded-full"></span>
                                Featured Stories
                            </h2>
                            <motion.button
                                className="text-red-500 font-semibold text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:gap-2 sm:hover:gap-3 transition-all"
                                whileHover={{ x: 3 }}
                            >
                                View All
                                <FaChevronRight className="text-[10px] sm:text-xs" />
                            </motion.button>
                        </div>

                        {/* Featured Card */}
                        <motion.div
                            className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group flex flex-col md:flex-row mb-6 sm:mb-8"
                            whileHover={{ y: windowWidth > 768 ? -5 : 0 }}
                        >
                            <div className="relative md:w-5/12 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400"
                                    alt="Hurricane Season"
                                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                                    <span className="bg-red-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold shadow-lg">
                                        LIFESTYLE
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6 md:w-7/12 flex flex-col justify-center">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug hover:text-red-500 transition cursor-pointer mb-2 sm:mb-3">
                                    It's Hurricane Season But We Are Visiting Hilton Head Island
                                </h3>
                                <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                                    Hurricane season creates unique travel moments across coastal cities and modern destinations. Discover amazing experiences even during storm season.
                                </p>
                                <motion.button
                                    className="text-red-500 font-semibold text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2 hover:gap-2 sm:hover:gap-3 transition-all"
                                    whileHover={{ x: 3 }}
                                >
                                    Read More
                                    <FaChevronRight className="text-[10px] sm:text-xs md:text-sm" />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* 4 CARD BERITA */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-5 md:mt-6">
                            {newsCards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
                                    whileHover={{ y: -4 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="relative overflow-hidden h-36 xs:h-40 sm:h-44 md:h-48">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2">
                                            <span className="bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
                                                {card.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-2.5 sm:p-3 md:p-4">
                                        <h4 className="font-bold text-gray-900 leading-snug group-hover:text-red-500 transition line-clamp-2 mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">
                                            {card.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <FaClock className="text-[8px] sm:text-[10px] md:text-xs" />
                                                <span>{card.date}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5 sm:gap-1">
                                                <FaEye className="text-[8px] sm:text-[10px] md:text-xs" />
                                                <span>{card.views} views</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* SPORTS & STANDINGS SECTION */}
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1 h-5 sm:h-6 bg-red-500 rounded-full"></span>
                                <FaFutbol className="text-red-500 text-lg sm:text-xl md:text-2xl" />
                                Sports & Standings
                            </h2>
                            <motion.button
                                className="text-red-500 font-semibold text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:gap-2 sm:hover:gap-3 transition-all"
                                whileHover={{ x: 3 }}
                            >
                                More Sports
                                <FaChevronRight className="text-[10px] sm:text-xs" />
                            </motion.button>
                        </div>

                        {/* Tab League Selector */}
                        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6 border-b border-gray-200 overflow-x-auto pb-1">
                            <button
                                onClick={() => setActiveLeague('liga1')}
                                className={`pb-2 sm:pb-3 px-2 sm:px-3 md:px-4 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${activeLeague === 'liga1' ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Liga 1 Indonesia
                                {activeLeague === 'liga1' && (
                                    <motion.div
                                        layoutId="leagueTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveLeague('premier')}
                                className={`pb-2 sm:pb-3 px-2 sm:px-3 md:px-4 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${activeLeague === 'premier' ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Premier League
                                {activeLeague === 'premier' && (
                                    <motion.div
                                        layoutId="leagueTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Standings Table */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[500px] sm:min-w-[600px] md:min-w-full">
                                    <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                                        <tr>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">#</th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Team</th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">P</th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">W</th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">D</th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">L</th>
                                            <th className="hidden md:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">GF</th>
                                            <th className="hidden md:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">GA</th>
                                            <th className="hidden lg:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">GD</th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">Pts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(activeLeague === 'liga1' ? liga1Standings : premierLeagueStandings).map((team, idx) => {
                                            const gd = team.goalsFor - team.goalsAgainst
                                            const isRelegationZone = activeLeague === 'liga1' ? idx >= 15 : idx >= 17
                                            return (
                                                <motion.tr
                                                    key={idx}
                                                    className={`border-b border-gray-100 hover:bg-red-50 transition cursor-pointer ${idx < 4 ? 'bg-white' : isRelegationZone ? 'bg-red-50/30' : 'bg-white'}`}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.02 }}
                                                    whileHover={{ scale: windowWidth > 768 ? 1.01 : 1 }}
                                                >
                                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold">
                                                        {team.position <= 3 ? (
                                                            <div className="flex items-center gap-0.5 sm:gap-1">
                                                                {team.position === 1 && <FaTrophy className="text-yellow-500 text-xs sm:text-sm" />}
                                                                {team.position === 2 && <FaMedal className="text-gray-400 text-xs sm:text-sm" />}
                                                                {team.position === 3 && <FaMedal className="text-amber-600 text-xs sm:text-sm" />}
                                                                <span className={team.position === 1 ? 'text-yellow-600 font-bold' : team.position === 2 ? 'text-gray-500 font-bold' : team.position === 3 ? 'text-amber-600 font-bold' : ''}>
                                                                    {team.position}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className={isRelegationZone ? 'text-red-500 font-semibold' : ''}>
                                                                {team.position}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">
                                                        <span className="hover:text-red-500 transition line-clamp-1">{team.team}</span>
                                                    </td>
                                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">{team.played}</td>
                                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-green-600 font-semibold">{team.won}</td>
                                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-500">{team.draw}</td>
                                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-red-500">{team.lost}</td>
                                                    <td className="hidden md:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">{team.goalsFor}</td>
                                                    <td className="hidden md:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">{team.goalsAgainst}</td>
                                                    <td className="hidden lg:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">
                                                        <span className={gd > 0 ? 'text-green-600' : gd < 0 ? 'text-red-500' : 'text-gray-500'}>
                                                            {gd > 0 ? '+' : ''}{gd}
                                                        </span>
                                                    </td>
                                                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-bold text-red-600">{team.points}</td>
                                                </motion.tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Legend */}
                            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200 text-[10px] sm:text-xs text-gray-500 flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <FaTrophy className="text-yellow-500 text-xs sm:text-sm" />
                                    <span>Juara</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <FaMedal className="text-gray-400 text-xs sm:text-sm" />
                                    <span>Runner-up</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <FaMedal className="text-amber-600 text-xs sm:text-sm" />
                                    <span>Peringkat 3</span>
                                </div>
                                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-50/50 border border-red-200 rounded"></div>
                                <span>Zona Degradasi</span>
                            </div>
                        </div>

                        {/* Football News Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-7 md:mt-8">
                            {footballNews.map((news, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
                                    whileHover={{ y: -4 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="relative overflow-hidden h-36 xs:h-40 sm:h-44 md:h-48">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2">
                                            <span className="bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
                                                {news.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-2.5 sm:p-3 md:p-4">
                                        <h4 className="font-bold text-gray-900 leading-snug group-hover:text-red-500 transition line-clamp-2 mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">
                                            {news.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <FaClock className="text-[8px] sm:text-[10px] md:text-xs" />
                                                <span>{news.date}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5 sm:gap-1">
                                                <FaEye className="text-[8px] sm:text-[10px] md:text-xs" />
                                                <span>{news.views} views</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* COMMENT SECTION - Added */}
                    <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                            {/* Comment Header */}
                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <FaComment className="text-red-500 text-lg sm:text-xl" />
                                    <h3 className="text-white font-bold text-base sm:text-lg">
                                        Diskusi ({comments.length})
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
                                                placeholder={replyTo ? `Membalas ${replyTo.name}...` : "Tulis komentar Anda..."}
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
                                                    {/* Komentar Utama */}
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
                                                            
                                                            {/* Reply Komentar */}
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

                {/* RIGHT COLUMN - STICKY */}
                <motion.div
                    className="space-y-5 sm:space-y-6 lg:sticky lg:top-24 lg:self-start"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* SOCIAL MEDIA SECTION */}
                    <motion.div
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition"
                        variants={itemVariants}
                    >
                        <div className="text-center mb-3 sm:mb-4">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Follow Us</h2>
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Stay connected on social media</p>
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

                    {/* TRENDING */}
                    <motion.div
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FaFire className="text-red-500 text-base sm:text-lg" />
                                Trending
                            </h2>
                            <span className="text-[10px] sm:text-xs text-gray-400">🔥 Hot topics</span>
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            {sideNews.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex gap-3 sm:gap-4 group cursor-pointer"
                                    whileHover={{ x: 3 }}
                                >
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg sm:rounded-xl object-cover group-hover:scale-105 transition shadow-md"
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
                                        <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">
                                            <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-0.5 sm:gap-1">
                                                <FaClock className="text-[8px] sm:text-[10px]" />
                                                10 MAY 2026
                                            </p>
                                            <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-0.5 sm:gap-1">
                                                <FaEye className="text-[8px] sm:text-[10px]" />
                                                {item.views} views
                                            </p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => toggleBookmark(`trending-${index}`)}
                                        className="text-gray-300 hover:text-red-500 transition flex-shrink-0"
                                    >
                                        {bookmarked.includes(`trending-${index}`) ? <FaBookmark className="text-xs sm:text-sm" /> : <FaRegBookmark className="text-xs sm:text-sm" />}
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* POPULAR */}
                    <motion.div
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                Popular Stories
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
                                    whileHover={{ x: 3 }}
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
                                                12.5K views
                                            </span>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => toggleBookmark(`popular-${index}`)}
                                        className="text-gray-300 hover:text-red-500 transition mt-0.5 sm:mt-1 flex-shrink-0"
                                    >
                                        {bookmarked.includes(`popular-${index}`) ? <FaBookmark className="text-red-500 text-xs sm:text-sm" /> : <FaRegBookmark className="text-xs sm:text-sm" />}
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </motion.main>
    )
}

export default Home