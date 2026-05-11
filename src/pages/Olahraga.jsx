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
    FaFutbol,
    FaBasketballBall,
    FaVolleyballBall,
    FaTableTennis,
    FaMedal,
    FaTrophy,
    FaRunning,
    FaSwimmer,
    FaArrowRight,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaListOl,
    FaChartLine
} from 'react-icons/fa'

function Olahraga() {
    const [hoveredNews, setHoveredNews] = useState(null)
    const [bookmarked, setBookmarked] = useState([])
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
    const [selectedCategory, setSelectedCategory] = useState('semua')
    const [showCommentSection, setShowCommentSection] = useState(true)
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [activeStandings, setActiveStandings] = useState('liga1')
    const [showFullStandings, setShowFullStandings] = useState(false)
    
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
        const savedComments = localStorage.getItem('olahragaComments')
        if (savedComments) {
            setComments(JSON.parse(savedComments))
        } else {
            // Data komentar contoh
            const sampleComments = [
                {
                    id: 1,
                    name: 'Budi Santoso',
                    content: 'Timnas Indonesia semakin mantap! Terus berjuang! 🇮🇩',
                    date: '2026-05-10T08:30:00',
                    likes: 45,
                    replies: [
                        {
                            id: 101,
                            name: 'Admin',
                            content: 'Dukungan penuh untuk Garuda!',
                            date: '2026-05-10T09:15:00',
                            likes: 12
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Siti Rahayu',
                    content: 'Piala Dunia 2026 pasti seru banget! Persiapan matangkan yuk!',
                    date: '2026-05-10T10:20:00',
                    likes: 32,
                    replies: []
                },
                {
                    id: 3,
                    name: 'Andi Wijaya',
                    content: 'Premier League musim ini super sengit! Keren abis! ⚽',
                    date: '2026-05-10T14:45:00',
                    likes: 67,
                    replies: [
                        {
                            id: 102,
                            name: 'Rizki F',
                            content: 'City vs Arsenal seru!',
                            date: '2026-05-10T15:30:00',
                            likes: 23
                        }
                    ]
                }
            ]
            setComments(sampleComments)
            localStorage.setItem('olahragaComments', JSON.stringify(sampleComments))
        }
        
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Simpan komentar ke localStorage
    useEffect(() => {
        if (comments.length > 0) {
            localStorage.setItem('olahragaComments', JSON.stringify(comments))
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

    // Data Klasemen Liga 1
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

    // Data Klasemen Premier League
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

    // Data Klasemen Liga Champions
    const championsLeagueStandings = [
        { position: 1, team: 'Real Madrid', played: 8, won: 7, draw: 1, lost: 0, goalsFor: 22, goalsAgainst: 8, points: 22 },
        { position: 2, team: 'Bayern Munich', played: 8, won: 6, draw: 1, lost: 1, goalsFor: 19, goalsAgainst: 7, points: 19 },
        { position: 3, team: 'Manchester City', played: 8, won: 6, draw: 0, lost: 2, goalsFor: 24, goalsAgainst: 10, points: 18 },
        { position: 4, team: 'Paris SG', played: 8, won: 5, draw: 2, lost: 1, goalsFor: 18, goalsAgainst: 9, points: 17 },
        { position: 5, team: 'Barcelona', played: 8, won: 5, draw: 1, lost: 2, goalsFor: 17, goalsAgainst: 11, points: 16 },
        { position: 6, team: 'Arsenal', played: 8, won: 4, draw: 2, lost: 2, goalsFor: 15, goalsAgainst: 10, points: 14 },
        { position: 7, team: 'Inter Milan', played: 8, won: 4, draw: 1, lost: 3, goalsFor: 12, goalsAgainst: 10, points: 13 },
        { position: 8, team: 'Atletico Madrid', played: 8, won: 3, draw: 3, lost: 2, goalsFor: 11, goalsAgainst: 9, points: 12 }
    ]

    const olahragaNews = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c86?q=80&w=1200',
            title: 'Timnas Indonesia Lolos ke Piala Dunia 2026! Sejarah Baru Terukir',
            description: 'Untuk pertama kalinya dalam sejarah, Timnas Indonesia berhasil lolos ke Piala Dunia setelah mengalahkan lawan berat di babak final kualifikasi.',
            date: '10 Mei 2026',
            category: 'Sepak Bola',
            views: '125.3K',
            author: 'Sports Editor'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200',
            title: 'Persib vs Persija: Drama 5 Gol di Babak Final Liga 1',
            description: 'Pertandingan sengit antara Persib dan Persija berakhir dengan skor 3-2. Pertandingan berlangsung dramatis hingga menit akhir.',
            date: '9 Mei 2026',
            category: 'Liga 1',
            views: '98.7K',
            author: 'Football Analyst'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1200',
            title: 'Manchester City Raih Gelar Premier League ke-4 Beruntun',
            description: 'Pep Guardiola membawa Manchester City meraih trofi Premier League keempat secara beruntun, rekor baru di liga Inggris.',
            date: '8 Mei 2026',
            category: 'Liga Inggris',
            views: '87.2K',
            author: 'EPL Expert'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200',
            title: 'Indonesia Sabet Emas di Olimpiade Cabang Bulutangkis',
            description: 'Pasangan ganda putra Indonesia berhasil menyumbangkan medali emas setelah mengalahkan unggulan pertama dari China.',
            date: '7 Mei 2026',
            category: 'Olimpiade',
            views: '76.4K',
            author: 'Olympic Reporter'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200',
            title: 'Pelatih Anyar Timnas Indonesia Diumumkan Pekan Ini',
            description: 'PSSI akan mengumumkan pelatih anyar Timnas Indonesia pekan ini dengan target lolos Piala Dunia 2030.',
            date: '6 Mei 2026',
            category: 'Timnas',
            views: '82.3K',
            author: 'Football News'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200',
            title: 'Real Madrid Siap Rekrut Bintang Muda Brasil Senilai €150 Juta',
            description: 'Los Blancos dikabarkan akan mengamankan jasa wonderkid Brasil yang menjadi incaran banyak klub top Eropa.',
            date: '5 Mei 2026',
            category: 'Liga Spanyol',
            views: '94.1K',
            author: 'Transfer Expert'
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1200',
            title: 'NBA Finals 2026: Pertarungan Sengit Lakers vs Celtics',
            description: 'Dua tim paling bersejarah di NBA kembali bertemu di partai puncak. Pertandingan diprediksi berjalan sengit.',
            date: '4 Mei 2026',
            category: 'Basket',
            views: '71.8K',
            author: 'Basketball Analyst'
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200',
            title: 'Turnamen MotoGP Mandalika Sukses Digelar',
            description: 'Pertamina Mandalika International Circuit kembali sukses menggelar seri MotoGP dengan dihadiri 150.000 penonton.',
            date: '3 Mei 2026',
            category: 'Balap Motor',
            views: '68.5K',
            author: 'Motorsport Journalist'
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
            title: 'Indonesia Menjadi Tuan Rumah Piala Asia U-20 2026',
            description: 'FIFA dan AFC telah menunjuk Indonesia sebagai tuan rumah Piala Asia U-20 yang akan digelar akhir tahun ini.',
            date: '2 Mei 2026',
            category: 'Sepak Bola',
            views: '59.3K',
            author: 'Sports News'
        }
    ]

    const trendingSports = [
        {
            image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c86?q=80&w=400',
            title: 'Timnas Indonesia Cetak Sejarah Lolos Piala Dunia',
            category: 'Sepak Bola',
            views: '225.3K'
        },
        {
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400',
            title: 'Persib Juara Liga 1 Setelah Kalahkan Persija',
            category: 'Liga 1',
            views: '189.7K'
        },
        {
            image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=400',
            title: 'Manchester City Juara Premier League ke-4',
            category: 'Liga Inggris',
            views: '167.2K'
        }
    ]

    const popularSports = [
        'Jadwal Lengkap Piala Dunia 2026: Timnas Indonesia vs Tim-Tim Kuat',
        'Top Skor Sementara Liga 1 2026: Persaingan Ketat',
        'Transfer Terpanas: 10 Pemain Termahal Musim Ini',
        'Rekor Baru Messi di MLS: 50 Gol dalam Semusim',
        'Prediksi Pemenang Ballon d\'Or 2026'
    ]

    const upcomingMatches = [
        { home: 'Indonesia', away: 'Jepang', date: '15 Mei 2026', time: '19:00', venue: 'GBK Jakarta' },
        { home: 'Persib', away: 'Persija', date: '18 Mei 2026', time: '15:30', venue: 'Stadion GBLA' },
        { home: 'Manchester City', away: 'Arsenal', date: '20 Mei 2026', time: '22:00', venue: 'Etihad Stadium' }
    ]

    const categories = [
        { name: 'Semua', icon: FaMedal, count: 9 },
        { name: 'Sepak Bola', icon: FaFutbol, count: 2 },
        { name: 'Liga 1', icon: FaFutbol, count: 1 },
        { name: 'Liga Inggris', icon: FaFutbol, count: 1 },
        { name: 'Timnas', icon: FaFutbol, count: 1 },
        { name: 'Basket', icon: FaBasketballBall, count: 1 },
        { name: 'Balap Motor', icon: FaRunning, count: 1 },
        { name: 'Olimpiade', icon: FaSwimmer, count: 1 }
    ]

    const socialMedia = [
        { name: 'Instagram', icon: FaInstagram, color: 'hover:text-pink-600', url: '#' },
        { name: 'TikTok', icon: FaTiktok, color: 'hover:text-black', url: '#' },
        { name: 'YouTube', icon: FaYoutube, color: 'hover:text-red-600', url: '#' },
        { name: 'Twitter', icon: FaTwitter, color: 'hover:text-blue-400', url: '#' },
        { name: 'Facebook', icon: FaFacebook, color: 'hover:text-blue-600', url: '#' }
    ]

    const filteredNews = selectedCategory === 'semua' 
        ? olahragaNews 
        : olahragaNews.filter(news => news.category.toLowerCase() === selectedCategory.toLowerCase())

    const getStandingsData = () => {
        switch(activeStandings) {
            case 'liga1':
                return liga1Standings
            case 'premier':
                return premierLeagueStandings
            case 'champions':
                return championsLeagueStandings
            default:
                return liga1Standings
        }
    }

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
                        Sports Update
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-2 sm:mt-3 md:mt-4">
                    Berita <span className="text-red-500">Olahraga</span>
                </h1>

                <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 md:mt-5 max-w-3xl leading-relaxed">
                    Ikuti perkembangan terbaru dunia olahraga mulai dari sepak bola, basket, 
                    MotoGP, hingga prestasi atlet Indonesia di kancah internasional.
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

            {/* STANDINGS SECTION - NEW */}
            <motion.div
                className="mb-8 sm:mb-10 md:mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-1 h-5 sm:h-6 md:h-7 bg-red-500 rounded-full"></span>
                        <FaListOl className="text-red-500" />
                        Klasemen Liga
                    </h2>
                    <motion.button
                        onClick={() => setShowFullStandings(!showFullStandings)}
                        className="text-red-500 font-semibold text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:gap-2 sm:hover:gap-3 transition-all"
                        whileHover={{ x: 3 }}
                    >
                        {showFullStandings ? 'Sembunyikan' : 'Lihat Lengkap'}
                        <FaChevronRight className="text-[10px] sm:text-xs" />
                    </motion.button>
                </div>

                {/* Tab League Selector */}
                <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5 border-b border-gray-200 overflow-x-auto pb-1">
                    <button
                        onClick={() => setActiveStandings('liga1')}
                        className={`pb-2 sm:pb-3 px-3 sm:px-4 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${
                            activeStandings === 'liga1' ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Liga 1 Indonesia
                        {activeStandings === 'liga1' && (
                            <motion.div
                                layoutId="standingsTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveStandings('premier')}
                        className={`pb-2 sm:pb-3 px-3 sm:px-4 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${
                            activeStandings === 'premier' ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Premier League
                        {activeStandings === 'premier' && (
                            <motion.div
                                layoutId="standingsTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveStandings('champions')}
                        className={`pb-2 sm:pb-3 px-3 sm:px-4 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${
                            activeStandings === 'champions' ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Liga Champions
                        {activeStandings === 'champions' && (
                            <motion.div
                                layoutId="standingsTab"
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
                                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">#</th>
                                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Team</th>
                                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">P</th>
                                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">W</th>
                                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">D</th>
                                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">L</th>
                                    <th className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">GF</th>
                                    <th className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">GA</th>
                                    <th className="hidden lg:table-cell px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">GD</th>
                                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">Pts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getStandingsData().slice(0, showFullStandings ? getStandingsData().length : 8).map((team, idx) => {
                                    const gd = team.goalsFor - team.goalsAgainst
                                    const isChampionZone = idx < 4
                                    const isRelegationZone = activeStandings === 'liga1' ? idx >= 15 : activeStandings === 'premier' ? idx >= 17 : false
                                    
                                    return (
                                        <motion.tr
                                            key={idx}
                                            className={`border-b border-gray-100 hover:bg-red-50 transition cursor-pointer ${
                                                isChampionZone ? 'bg-white' : isRelegationZone ? 'bg-red-50/30' : 'bg-white'
                                            }`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.02 }}
                                            whileHover={{ scale: windowWidth > 768 ? 1.01 : 1 }}
                                        >
                                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold">
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
                                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">
                                                <span className="hover:text-red-500 transition line-clamp-1">{team.team}</span>
                                            </td>
                                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">{team.played}</td>
                                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-green-600 font-semibold">{team.won}</td>
                                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-500">{team.draw}</td>
                                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-red-500">{team.lost}</td>
                                            <td className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">{team.goalsFor}</td>
                                            <td className="hidden md:table-cell px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">{team.goalsAgainst}</td>
                                            <td className="hidden lg:table-cell px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">
                                                <span className={gd > 0 ? 'text-green-600' : gd < 0 ? 'text-red-500' : 'text-gray-500'}>
                                                    {gd > 0 ? '+' : ''}{gd}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-bold text-red-600">{team.points}</td>
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
                        {activeStandings !== 'champions' && (
                            <>
                                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-100 border border-green-300 rounded"></div>
                                <span>Zona Championship</span>
                                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-50/50 border border-red-200 rounded"></div>
                                <span>Zona Degradasi</span>
                            </>
                        )}
                    </div>
                </div>
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
                                Headline Olahraga
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
                                S
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                                    {filteredNews[0]?.author || 'Sports Admin'}
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
                    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white">
                        <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                            <FaFire className="text-white" />
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

            {/* UPCOMING MATCHES SECTION */}
            <motion.div
                className="mt-8 sm:mt-10 md:mt-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-1 h-5 sm:h-6 md:h-7 bg-red-500 rounded-full"></span>
                        <FaCalendarAlt className="text-red-500" />
                        Jadwal Pertandingan Mendatang
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {upcomingMatches.map((match, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedMatch(match)}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-center flex-1">
                                    <p className="font-bold text-sm sm:text-base">{match.home}</p>
                                </div>
                                <div className="text-red-500 font-black text-xl sm:text-2xl px-2 sm:px-3">VS</div>
                                <div className="text-center flex-1">
                                    <p className="font-bold text-sm sm:text-base">{match.away}</p>
                                </div>
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-1">
                                    <FaCalendarAlt className="text-[10px] sm:text-xs" />
                                    {match.date}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500">{match.time}</p>
                                <p className="text-[10px] sm:text-xs text-gray-400 flex items-center justify-center gap-1">
                                    <FaMapMarkerAlt className="text-[8px] sm:text-[10px]" />
                                    {match.venue}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
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
                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <FaComment className="text-red-500 text-lg sm:text-xl" />
                                    <h3 className="text-white font-bold text-base sm:text-lg">
                                        Diskusi Olahraga ({comments.length})
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
                                                placeholder={replyTo ? `Membalas ${replyTo.name}...` : "Tulis komentar Anda tentang olahraga..."}
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
                                Trending Olahraga
                            </h2>
                            <span className="text-[10px] sm:text-xs text-gray-400">🔥 Hot</span>
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            {trendingSports.map((item, index) => (
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
                            {popularSports.map((item, index) => (
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
                                                25.5K views
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
                            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Dapatkan update olahraga terbaru</p>
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
                        <h3 className="font-bold text-lg sm:text-xl mb-2">Sports Newsletter</h3>
                        <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
                            Dapatkan berita olahraga terbaru langsung ke email Anda
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

                    {/* MEDAL COUNTER */}
                    <motion.div
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg"
                        variants={itemVariants}
                    >
                        <h3 className="font-bold text-gray-900 mb-3 text-base sm:text-lg flex items-center gap-2">
                            <FaTrophy className="text-red-500" />
                            Perolehan Medali Indonesia
                        </h3>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="bg-yellow-50 rounded-lg p-2">
                                <div className="text-yellow-600 font-bold text-2xl">6</div>
                                <div className="text-xs text-gray-600">Emas</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2">
                                <div className="text-gray-600 font-bold text-2xl">8</div>
                                <div className="text-xs text-gray-600">Perak</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-2">
                                <div className="text-orange-600 font-bold text-2xl">10</div>
                                <div className="text-xs text-gray-600">Perunggu</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* QUICK STATS */}
                    <motion.div
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg"
                        variants={itemVariants}
                    >
                        <h3 className="font-bold text-gray-900 mb-3 text-base sm:text-lg flex items-center gap-2">
                            <FaChartLine className="text-red-500" />
                            Statistik Cepat
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-1 border-b border-gray-100">
                                <span className="text-gray-600">Top Skor Liga 1</span>
                                <span className="font-semibold text-red-500">David Da Silva (22 gol)</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-100">
                                <span className="text-gray-600">Top Skor EPL</span>
                                <span className="font-semibold text-red-500">Erling Haaland (27 gol)</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-100">
                                <span className="text-gray-600">Most Assist</span>
                                <span className="font-semibold text-red-500">Kevin De Bruyne (18 assist)</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-600">Clean Sheet Terbanyak</span>
                                <span className="font-semibold text-red-500">Ederson (16 cleansheet)</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.main>
    )
}

export default Olahraga