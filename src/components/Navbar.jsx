import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

const links = [
  { to: '/', label: 'Home' },
  { to: '/escritorio', label: 'O Escritório' },
  { to: '/areas', label: 'Áreas de Atuação' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    gsap.from(navRef.current, { opacity: 0, y: -20, duration: 0.8, delay: 0.2, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleMobileNav = (to) => {
    setMenuOpen(false)
    setTimeout(() => navigate(to), 300)
  }

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="navbar-logo" data-cursor>
          <img src="/logo/logo extensa.svg" alt="Paulo Barros Advogados" className="navbar-logo-full" />
          <img src="/logo/logoreduzida.svg" alt="Paulo Barros Advogados" className="navbar-logo-compact" />
        </Link>

        <div className="navbar-links">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              end={to === '/'}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <NavLink to="/contato" className="navbar-cta" data-cursor>
          Consulta
        </NavLink>

        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          data-cursor
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(({ to, label }) => (
          <a key={to} onClick={() => handleMobileNav(to)} style={{ cursor: 'pointer' }}>
            {label}
          </a>
        ))}
        <div className="mobile-menu-divider" />
        <a
          onClick={() => handleMobileNav('/contato')}
          style={{ cursor: 'pointer', fontSize: '14px', letterSpacing: '3px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', color: 'var(--gold)' }}
        >
          Consulta
        </a>
      </div>
    </>
  )
}
