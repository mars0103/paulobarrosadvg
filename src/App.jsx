import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Escritorio from './pages/Escritorio'
import Areas from './pages/Areas'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contato from './pages/Contato'

export default function App() {
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('pb_splash') === '1'
  )

  const handleSplashDone = () => {
    sessionStorage.setItem('pb_splash', '1')
    setSplashDone(true)
  }
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashDone} />}
<div className="noise-overlay" />
      {splashDone && (
        <>
          <Navbar />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/escritorio" element={<Escritorio />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  )
}
