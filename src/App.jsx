import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Nasional from "./pages/Nasional"
import Teknologi from "./pages/Teknologi"
import Hiburan from "./pages/Hiburan"
import Olahraga from "./pages/Olahraga"


function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nasional" element={<Nasional />} />
          <Route path="/teknologi" element={<Teknologi />} />
          <Route path="/hiburan" element={<Hiburan />} />
          <Route path="/olahraga" element={<Olahraga />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
